import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user: any = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      }
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Generate a 2FA secret
    const secret = speakeasy.generateSecret({
      name: `${process.env.APP_NAME}`,
    });
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        temp_two_factor_secret: secret.base32,
      },
    });

    const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url || "");
    return NextResponse.json({ qrCodeDataURL }, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const session: any = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const user: any = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      }
    });
    if (!user || !user.temp_two_factor_secret) {
      return NextResponse.json(
        { message: "2FA setup not initiated" },
        { status: 400 }
      );
    }
    const isVerified = speakeasy.totp.verify({
      secret: user.temp_two_factor_secret,
      encoding: "base32",
      token,
    });
    if (isVerified) {
      await db.user.update({
        where: {
          id: user.id, // Adjust the field name if your primary key is not 'id'
        },
        data: {
          two_factor_secret: user.temp_two_factor_secret,
          two_factor_enabled: true,
          temp_two_factor_secret: undefined, // Unset the temp_two_factor_secret by setting it to null
        },
      });

      return NextResponse.json(
        { message: "2FA enabled successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to enable 2FA" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await db.user.update(
      {
        where: {
          id: session.user.id,
        },
        data: {
          two_factor_secret: undefined,
          two_factor_enabled: false,
        }
      },
    );
    return NextResponse.json(
      { message: "2FA disabled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to disable 2FA" },
      { status: 500 }
    );
  }
}
