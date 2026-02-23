import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


export async function POST(request) {
  // Stealth Build Check
  if (process.env.NEXT_PUBLIC_EXPORT) {
    return new Response(null, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Filter filename to be safe
    const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const fileName = `${Date.now()}-${safeName}`;
    
    // Path to public/projects
    const publicPath = path.join(process.cwd(), 'public/projects');
    
    // Ensure directory exists
    await fs.mkdir(publicPath, { recursive: true });
    
    const filePath = path.join(publicPath, fileName);
    await fs.writeFile(filePath, buffer);

    // Return the URL for the frontend
    const url = `/Portofolio-SidikWaluya/projects/${fileName}`;
    
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: url
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
