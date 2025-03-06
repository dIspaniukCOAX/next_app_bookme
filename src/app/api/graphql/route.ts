import { server } from "@/graphql/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req, res: NextResponse.next() }) // Pass req and res to context
});

export async function POST(request: NextRequest) {
  return handler(request);
}

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function PUT(request: NextRequest) {
  return handler(request);
}

export async function DELETE(request: NextRequest) {
  return handler(request);
}

export async function PATCH(request: NextRequest) {
  return handler(request);
}
