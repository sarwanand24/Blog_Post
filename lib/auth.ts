// lib/auth.ts
import type { NextRequest } from 'next/server';

export const VALID_TOKEN = 'secure_blog_token';

export function isAuthenticatedRequest(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  return token === VALID_TOKEN;
}
