import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PROJECTS_PATH = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
  if (process.env.NEXT_PUBLIC_EXPORT) {
    return new Response(null, { status: 404 });
  }
  try {
    const data = await fs.readFile(PROJECTS_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newData = await request.json();
    await fs.writeFile(PROJECTS_PATH, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: 'Projects updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update projects data' }, { status: 500 });
  }
}
