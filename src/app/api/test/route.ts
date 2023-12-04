import prisma from "$/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findFirst();
  return NextResponse.json(users);
}
