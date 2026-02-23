import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_PATH = path.join(process.cwd(), 'src/data/articles.json');

export async function GET() {
  if (process.env.NEXT_PUBLIC_EXPORT) {
    return new Response(null, { status: 404 });
  }
  try {
    const data = await fs.readFile(ARTICLES_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read articles data' }, { status: 500 });
  }
}

export async function POST(request) {
  // Stealth Build Check
  if (process.env.NEXT_PUBLIC_EXPORT) {
    return new Response(null, { status: 404 });
  }
  
  try {
    const newData = await request.json();
    await fs.writeFile(ARTICLES_PATH, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: 'Articles updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update articles data' }, { status: 500 });
  }
}
