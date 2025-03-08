'use client';

import { useState } from 'react';
import HomeCard from '../HomeCard';
import { DialogMeeting } from '../DialogMeeting/DialogMeeting';
import { IMeeting } from '@/types/meeting/meeting.type';
import { useRouter } from 'next/navigation';

const MeetingTypeList = () => {
  const [ openMeetingDialog, setOpenMeetingDialog ] = useState(false);
  const router = useRouter();

  const handleMeetingDialog = (meeting: IMeeting) => {
    const query = new URLSearchParams({
      channelName: meeting.channelName,
      userName: meeting.username
    }).toString()
    router.push('/meeting?' + query)
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setOpenMeetingDialog(true)}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
      />
      <DialogMeeting
        open={openMeetingDialog}
        onClose={() => setOpenMeetingDialog(false)}
        onSetMeeting={handleMeetingDialog}
      />
    </section>
  );
};

export default MeetingTypeList;
