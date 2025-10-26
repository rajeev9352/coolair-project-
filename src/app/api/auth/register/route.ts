import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';

const BACKEND_URL = env.BACKEND_URL || 'http://localhost:5000';
const MOCK_MODE = Boolean(env.NEXT_PUBLIC_MOCK_API);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Optional mock mode for local development without backend
    if (MOCK_MODE) {
      const { email, password, name } = body || {};
      if (email && password) {
        return NextResponse.json(
          {
            message: 'Mock register success',
            token: 'mock-token-123',
            user: { email, name: name || 'Mock User' },
          },
          { status: 200 }
        );
      }
      return NextResponse.json({ message: 'Invalid mock payload' }, { status: 400 });
    }

    const url = `${BACKEND_URL}/api/auth/register`;

    const controller = new AbortController();
    const timeoutMs = 8000;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
        signal: controller.signal,
      });
    } catch (fetchErr: any) {
      clearTimeout(timer);
      const code = fetchErr?.code || fetchErr?.cause?.code || '';
      const isAbort = fetchErr?.name === 'AbortError';
      const isConnRefused = code === 'ECONNREFUSED';
      const status = isAbort || isConnRefused ? 503 : 502;
      const reason = isAbort
        ? `Upstream timeout after ${timeoutMs}ms contacting ${url}`
        : isConnRefused
        ? `Upstream ${url} connection refused; is the backend running?`
        : `Upstream fetch error to ${url}`;
      console.error('Register proxy network error', { code, isAbort, message: fetchErr?.message, reason });
      return NextResponse.json({ message: reason }, { status });
    }

    clearTimeout(timer);

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      try {
        if (contentType.includes('application/json')) {
          const errJson = await res.json();
          console.error('Upstream /api/auth/register error', { status: res.status, errJson });
          return NextResponse.json(errJson, { status: res.status });
        }
        const errText = await res.text();
        console.error('Upstream /api/auth/register error (non-JSON)', { status: res.status, errText });
        return NextResponse.json({ message: errText }, { status: res.status });
      } catch (parseErr: any) {
        console.error('Error parsing upstream error response (register)', {
          status: res.status,
          parseErr: parseErr?.message || String(parseErr),
        });
        return NextResponse.json({ message: 'Upstream error', status: res.status }, { status: res.status });
      }
    }

    if (contentType.includes('application/json')) {
      const json = await res.json();
      return NextResponse.json(json, { status: res.status });
    }

    const text = await res.text();
    return NextResponse.json({ message: text }, { status: res.status });
  } catch (err: any) {
    console.error('Register proxy exception', err);
    const code = err?.code || err?.cause?.code || '';
    const status = code === 'ECONNREFUSED' ? 503 : 500;
    return NextResponse.json(
      { message: 'Proxy error', error: err?.message || String(err) },
      { status }
    );
  }
}
