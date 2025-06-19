// This API route is a remnant of a previous NextAuth setup and is no longer used.
// Authentication is handled by Firebase.
// This file can be safely deleted.
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'This authentication API route is deprecated and no longer functional.' }, { status: 404 });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'This authentication API route is deprecated and no longer functional.' }, { status: 404 });
}
