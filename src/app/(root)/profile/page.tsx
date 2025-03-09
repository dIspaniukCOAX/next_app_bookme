"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { disable2FA, enable2FA, verify2FA } from "@/lib/api";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { toast } from "sonner";

const ProfileContainer = () => {
  const session = useSession();
  const [qrcodeImage, setQrcodeImage] = useState<string>("");
  const [twoFactorCode, setTwoFactorCode] = useState<string>("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [disable2FaModal, setDisable2FaModal] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [verifyError, setVerifyError] = useState<string>("");
  const user: any = session.data?.user;

  React.useEffect(() => {
    if (user) {
      setTwoFactorEnabled(!!user.twoFactorEnabled);
    }
  }, [user]);

  const onEnable2FA = () => {
    if (!twoFactorEnabled) {
      enable2FA()
        .then((data) => {
          setQrcodeImage(data?.qrCodeDataURL || "");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const onVerify2FA = () => {
    if (!twoFactorEnabled) {
      console.log('twoFactorCode', twoFactorCode)
      verify2FA(twoFactorCode)
        .then((data) => {
          setTwoFactorEnabled(true);
          setQrcodeImage("");
          setSnackbarMessage("2FA enabled");
        })
        .catch((error) => {
          setVerifyError(error?.message || "Error enabling 2FA");
          console.error(error);
        });
    }
  };

  const onDisable2FA = () => {
    disable2FA()
      .then((data) => {
        setSnackbarMessage("2FA disabled");
        setTwoFactorEnabled(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (snackbarMessage) {
      toast.success(snackbarMessage);
    }
  }, [snackbarMessage]);

  return (
    <>
      <ConfirmationDialog
        title="Disable 2FA"
        description="Are you sure you want to disable 2FA?"
        open={disable2FaModal}
        primaryActionText="Yes"
        secondaryActionText="No"
        onClose={() => {
          setDisable2FaModal(false);
        }}
        onConfirm={onDisable2FA}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-6 shadow-xl w-96 min-h-[50vh] flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <Label htmlFor="email">Email</Label>
          <Input value={user?.email || " "} disabled className="mb-4" />
          {qrcodeImage?.length === 0 && !twoFactorEnabled && (
            <Button onClick={onEnable2FA} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Enable 2FA
            </Button>
          )}
          {twoFactorEnabled && (
            <Button
              onClick={() => setDisable2FaModal(true)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Disable 2FA
            </Button>
          )}
          {qrcodeImage?.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg">Scan the QR code using the Authenticator application</h3>
              <Image src={qrcodeImage} alt="QR Code" width={300} height={300} />
            </div>
          )}
          {qrcodeImage?.length > 0 && (
            <>
              <h3 className="text-lg">Enter the verification code from the Authenticator application below.</h3>
              <Label htmlFor="twoFactorCode">2FA Code</Label>
              <Input
                id="twoFactorCode"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="mb-4"
              />
              {verifyError && <p className="text-red-500 text-xs mt-1">{verifyError}</p>}
              <Button
                disabled={twoFactorCode.length === 0}
                onClick={onVerify2FA}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Verify 2FA
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;
