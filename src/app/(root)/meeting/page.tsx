"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mic, MicOff, Video, VideoOff, LogOut } from "lucide-react";
import { toast } from "sonner";

const URL_SOCKET_IO = "http://localhost:4000";

let localStream: MediaStream;
let localPeerConnection: RTCPeerConnection;

interface MessageBody {
  channelName: string | null;
  userName: string | null;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

export default function Meeting() {
  const socket = useRef<Socket | null>(null);
  const searchParams = useSearchParams();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants, setParticipants] = useState<string[]>([]);
  const router = useRouter();

  const isOnlyMe = useMemo(() => {
    return participants.length === 1 && participants[0] === searchParams.get("userName");
  }, [participants])

  useEffect(() => {
    const socketClient: Socket = io(URL_SOCKET_IO);
    socket.current = socketClient;

    socketClient.on("connect", () => {
      console.log("Socket.IO connected");
      setupDevice();
    });

    socketClient.on("disconnect", () => {
      console.log("socketClient", socketClient);
      console.log("Socket.IO disconnected");
    });

    socketClient.on("joined", (userNames: string[]) => {
      console.log("Users in this channel", userNames);
      setParticipants(userNames);
    });

    socketClient.on("user_joined", ({ userName, userNames }: { userName: string; userNames: string[] }) => {
      console.log(`${userName} joined the call`);
      console.log('userName', userName)
      setParticipants(userNames);
    });

    socketClient.on("user_left", ({ userName, userNames }: { userName: string; userNames: string[] }) => {
      toast.info(`${userName} left the call`);
      setParticipants(userNames);
      const remotePlayer = document.getElementById("peerPlayer") as HTMLVideoElement | null;
      if (remotePlayer && userNames.length === 1) {
        // Якщо залишився тільки я
        remotePlayer.srcObject = null;
      }
    });

    socketClient.on("offer_sdp_received", (sdp: RTCSessionDescriptionInit) => {
      onAnswer(sdp);
    });

    socketClient.on("answer_sdp_received", (sdp: RTCSessionDescriptionInit) => {
      gotRemoteDescription(sdp);
    });

    socketClient.on("ice_candidate_received", (candidate: RTCIceCandidateInit) => {
      if (candidate && localPeerConnection) {
        localPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
          console.error("Error adding ICE candidate:", error);
        });
      }
    });

    return () => {
      cleanup();
      socketClient.disconnect();
    };
  }, []);

  const gotRemoteDescription = (answer: RTCSessionDescriptionInit): void => {
    localPeerConnection.setRemoteDescription(new RTCSessionDescription(answer)).catch((error) => {
      console.error("Error setting remote description:", error);
    });
    localPeerConnection.ontrack = gotRemoteStream;
  };

  const onAnswer = (offer: RTCSessionDescriptionInit): void => {
    localPeerConnection = new RTCPeerConnection(pcConstraints);
    localPeerConnection.onicecandidate = gotLocalIceCandidateAnswer;
    localPeerConnection.ontrack = gotRemoteStream;
    localStream.getTracks().forEach((track) => localPeerConnection.addTrack(track, localStream));
    localPeerConnection.setRemoteDescription(new RTCSessionDescription(offer)).catch((error) => {
      toast.error("Error setting remote description");
    });
    localPeerConnection
      .createAnswer()
      .then(gotAnswerDescription)
      .catch((error) => {
        toast.error("Error creating answer");
      });
  };

  const gotAnswerDescription = (answer: RTCSessionDescriptionInit): void => {
    localPeerConnection.setLocalDescription(answer).catch((error) => {
      console.error("Error setting local description:", error);
    });
    sendSocketMessage("send_answer", {
      channelName: searchParams.get("channelName"),
      userName: searchParams.get("userName"),
      sdp: answer
    });
  };

  const gotLocalIceCandidateAnswer = (event: RTCPeerConnectionIceEvent): void => {
    if (event.candidate) {
      sendSocketMessage("send_ice_candidate", {
        channelName: searchParams.get("channelName"),
        userName: searchParams.get("userName"),
        candidate: event.candidate.toJSON()
      });
    }
  };

  const sendSocketMessage = (type: string, body: MessageBody): void => {
    socket.current?.emit(type, body);
  };

  const pcConstraints: RTCConfiguration = {
    iceServers: []
  };

  const setupPeerConnection = (): void => {
    localPeerConnection = new RTCPeerConnection(pcConstraints);
    localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
    localPeerConnection.ontrack = gotRemoteStream;
    localStream.getTracks().forEach((track) => localPeerConnection.addTrack(track, localStream));
    localPeerConnection
      .createOffer()
      .then(gotLocalDescription)
      .catch((error) => {
        console.error("Error creating offer:", error);
      });
  };

  const gotLocalDescription = (offer: RTCSessionDescriptionInit): void => {
    localPeerConnection.setLocalDescription(offer).catch((error) => {
      console.error("Error setting local description:", error);
    });
    sendSocketMessage("send_offer", {
      channelName: searchParams.get("channelName"),
      userName: searchParams.get("userName"),
      sdp: offer
    });
  };

  const gotRemoteStream = (event: RTCTrackEvent): void => {
    const remotePlayer = document.getElementById("peerPlayer") as HTMLVideoElement | null;
    if (remotePlayer) {
      remotePlayer.srcObject = event.streams[0];
    }
  };

  const gotLocalIceCandidateOffer = (event: RTCPeerConnectionIceEvent): void => {
    if (event.candidate) {
      sendSocketMessage("send_ice_candidate", {
        channelName: searchParams.get("channelName"),
        userName: searchParams.get("userName"),
        candidate: event.candidate.toJSON()
      });
    }
  };

  const setupDevice = (): void => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream: MediaStream) => {
        const localPlayer = document.getElementById("localPlayer") as HTMLVideoElement | null;
        if (localPlayer) {
          localPlayer.srcObject = stream;
        }
        localStream = stream;
        sendSocketMessage("join", {
          channelName: searchParams.get("channelName"),
          userName: searchParams.get("userName")
        });
        setupPeerConnection();
      })
      .catch((err: Error) => {
        toast.error(err.message);
      });
  };

  const toggleMic = (): void => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = (): void => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const leaveCall = (): void => {
    sendSocketMessage("quit", {
      channelName: searchParams.get("channelName"),
      userName: searchParams.get("userName")
    });
    cleanup();
    router.push("/");
  };

  const cleanup = (): void => {
    if (localPeerConnection) {
      localPeerConnection.close();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    const localPlayer = document.getElementById("localPlayer") as HTMLVideoElement | null;
    const remotePlayer = document.getElementById("peerPlayer") as HTMLVideoElement | null;
    if (localPlayer) localPlayer.srcObject = null;
    if (remotePlayer) remotePlayer.srcObject = null;
  };

  useEffect(() => {
    console.log('isOnlyMe', isOnlyMe)
  }, [participants])
  console.log('participants', participants)

  return (
    <div className="flex flex-col w-full justify-center items-center m-auto p-8 h-screen gap-4">
      <div className="flex flex-row gap-4">
        <div className="relative">
          <video id="localPlayer" autoPlay muted className="w-[640px] h-[480px] bg-black rounded-lg" />
          <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded">
            {searchParams.get("userName")}
          </span>
        </div>
        <div className={isOnlyMe ? "hidden" : "relative"}>
          <video id="peerPlayer" autoPlay className="w-[640px] h-[480px] bg-black rounded-lg" />
          {participants.length > 1 && (
            <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded">
              {participants.find((p) => p !== searchParams.get("userName"))}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="mic-switch"
            checked={isMicOn}
            onCheckedChange={toggleMic}
            className="data-[state=checked]:bg-green-500"
          />
          {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6 text-red-500" />}
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="video-switch"
            checked={isVideoOn}
            onCheckedChange={toggleVideo}
            className="data-[state=checked]:bg-green-500"
          />
          {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6 text-red-500" />}
        </div>
        <Button variant="destructive" onClick={leaveCall} className="flex gap-2">
          <LogOut className="w-4 h-4" />
          Leave Call
        </Button>
      </div>
      <div className="text-gray-500">Participants: {participants.join(", ") || "Only you"}</div>
    </div>
  );
}
