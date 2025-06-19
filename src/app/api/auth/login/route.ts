
// This API route is no longer used as authentication functionality has been removed from the application.
// This file can be safely deleted.
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Authentication API routes are deprecated and no longer functional.' }, { status: 404 });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Authentication API routes are deprecated and no longer functional.' }, { status: 404 });
}
