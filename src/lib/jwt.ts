import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(JWT_SECRET);

export const generateAccessToken = (userId: string) => {
  if (JWT_SECRET) {
    const tokenPayload = {
      userId,
      createdAt: Date.now(),
    };

    return new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
  }
};

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}