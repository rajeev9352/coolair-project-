import { NextResponse } from 'next/server';
import { env } from '@/config/env';

const BACKEND_URL = env.BACKEND_URL || 'http://localhost:5000';

export async function GET() {
  const url = `${BACKEND_URL}/health`;
  const controller = new AbortController();
  const timeoutMs = 5000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timer);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await res.json();
      return NextResponse.json(json, { status: res.status });
    }
    const text = await res.text();
    return NextResponse.json({ message: text }, { status: res.status });
  } catch (err: any) {
    clearTimeout(timer);
    const code = err?.code || err?.cause?.code || '';
    const isAbort = err?.name === 'AbortError';
    const status = isAbort || code === 'ECONNREFUSED' ? 503 : 500;
    const reason = isAbort
      ? `Upstream timeout after ${timeoutMs}ms contacting ${url}`
      : code === 'ECONNREFUSED'
      ? `Upstream ${url} connection refused; is the backend running?`
      : err?.message || 'Proxy error';
    return NextResponse.json({ message: reason }, { status });
  }
}
