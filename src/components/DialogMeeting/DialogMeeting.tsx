import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMeeting } from "@/types/meeting/meeting.type";
import { useForm } from "react-hook-form";

interface IDialogMeetingProps {
  open: boolean;
  onClose: () => void;
  onSetMeeting: (meeting: IMeeting) => void;
}

export function DialogMeeting({ open, onClose, onSetMeeting }: IDialogMeetingProps) {
  const { register, handleSubmit } = useForm<IMeeting>();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Meetings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4 py-4">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="name" className="text-right">
              Enter your channel name
            </Label>
            <Input {...register("channelName")} id="name" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start w-full gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input {...register("username")} id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(onSetMeeting)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
