import { server } from "@/graphql/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const handler = startServerAndCreateNextHandler(server);

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