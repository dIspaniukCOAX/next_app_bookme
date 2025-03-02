import { server } from "@/graphql/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req, res: NextResponse.next() }), // Pass req and res to context
});

export async function POST(request: Request) {
  return handler(request);
}

export async function GET(request: Request) {
  return handler(request);
}

export async function PUT(request: Request) {
  return handler(request);
}

export async function DELETE(request: Request) {
  return handler(request);
}

export async function PATCH(request: Request) {
  return handler(request);
}