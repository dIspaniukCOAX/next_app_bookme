"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const URL_WEB_SOCKET = "ws://localhost:8090/ws";

let localStream: MediaStream;
let localPeerConnection: RTCPeerConnection;

export default function Meeting() {
  const ws = useRef<WebSocket | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      console.log("ws opened");
      ws.current = wsClient;
      setupDevice();
    };
    wsClient.onclose = () => console.log("Ws closed");
    wsClient.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      const { type, body } = parsedMessage;

      switch (type) {
        case "joined":
          console.log("Users in this channel", body);
          break;
        case "offer_sdp_received":
          onAnswer(body);
          break;
        case "answer_sdp_received":
          gotRemoteDescription(body);
          break;
        case "ice_candidate_received":
          break;
      }
    };
  });

  const gotRemoteDescription = (answer: RTCSessionDescriptionInit) => {
    localPeerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    localPeerConnection.ontrack = gotRemoteStream;
  };

  const onAnswer = (offer: RTCSessionDescriptionInit) => {
    console.log("onAnswer invoked");
    localPeerConnection = new RTCPeerConnection(pcConstraints);
    localPeerConnection.onicecandidate = gotLocalIceCandidateAnswer;
    localPeerConnection.ontrack = gotRemoteStream;
    localStream.getTracks().forEach((track) => localPeerConnection.addTrack(track, localStream));
    localPeerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    localPeerConnection.createAnswer().then(gotAnswerDescription);
  };

  const gotAnswerDescription = (answer: RTCSessionDescriptionInit) => {
    localPeerConnection.setLocalDescription(answer);
  };

  const gotLocalIceCandidateAnswer = (event: RTCPeerConnectionIceEvent) => {
    if (!event.candidate) {
      const answer = localPeerConnection.localDescription;
      sendWsMessage("send_answer", {
        channelName: searchParams.get("channelName"),
        userName: searchParams.get("userName"),
        sdp: answer
      });
    }
  };

  const sendWsMessage = (type: string, body: any) => {
    ws.current?.send(JSON.stringify({ type, body }));
  };

  const pcConstraints: RTCConfiguration = {
    iceServers: []
  };

  const setupPeerConnection = () => {
    localPeerConnection = new RTCPeerConnection(pcConstraints);
    localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
    localPeerConnection.ontrack = gotRemoteStream;
    localStream.getTracks().forEach((track) => localPeerConnection.addTrack(track, localStream));
    localPeerConnection.createOffer().then(gotLocalDescription);
  };

  const gotLocalDescription = (offer: RTCSessionDescriptionInit) => {
    localPeerConnection.setLocalDescription(offer);
  };

  const gotRemoteStream = (event: RTCTrackEvent) => {
    const remotePlayer = document.getElementById("peerPlayer") as HTMLVideoElement;
    if (remotePlayer) remotePlayer.srcObject = event.streams[0];
  };

  const gotLocalIceCandidateOffer = (event: RTCPeerConnectionIceEvent) => {
    if (!event.candidate) {
      const offer = localPeerConnection.localDescription;
      sendWsMessage("send_offer", {
        channelName: searchParams.get("channelName"),
        userName: searchParams.get("userName"),
        sdp: offer
      });
    }
  };

  const setupDevice = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const localPlayer = document.getElementById("localPlayer") as HTMLVideoElement;
        if (localPlayer) localPlayer.srcObject = stream;
        localStream = stream;
        sendWsMessage("join", {
          channelName: searchParams.get("channelName"),
          userName: searchParams.get("userName")
        });
        setupPeerConnection();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <div className="flex flex-row w-full justify-center items-center m-auto p-8 h-screen">
      <div className="flex flex-row">
        <video id="localPlayer" autoPlay style={{ width: 640, height: 480 }} />
      </div>
      <div className="flex flex-row">
        <video id="peerPlayer" autoPlay style={{ width: 640, height: 480 }} />
      </div>
    </div>
  );
}
