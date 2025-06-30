import { NextRequest, NextResponse } from 'next/server';
import { VALID_TOKEN } from '@/lib/auth';

const DUMMY_USER = { username: 'admin', password: 'password123' };

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', VALID_TOKEN, { httpOnly: true, path: '/' });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
