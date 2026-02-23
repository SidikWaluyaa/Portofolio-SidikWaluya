import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SERVICES_PATH = path.join(process.cwd(), 'src/data/services.json');

export async function GET() {
  if (process.env.NEXT_PUBLIC_EXPORT) {
    return new Response(null, { status: 404 });
  }
  try {
    const data = await fs.readFile(SERVICES_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read services data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newData = await request.json();
    await fs.writeFile(SERVICES_PATH, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: 'Services updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update services data' }, { status: 500 });
  }
}
