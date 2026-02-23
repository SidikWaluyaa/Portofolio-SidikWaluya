const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const apiPath = path.join(rootDir, 'src/app/api');
const tmpApiPath = path.join(rootDir, 'src/app/_api_tmp');

console.log('--- 🛠️  Smart Export Started ---');

let apiHidden = false;

try {
  // 1. Hide API routes from Next.js builder
  if (fs.existsSync(apiPath)) {
    console.log('📦 Isolating API routes to prevent export conflicts...');
    try {
      fs.renameSync(apiPath, tmpApiPath);
    } catch (err) {
      if (err.code === 'EPERM') {
        console.error('\n❌ ERROR: Akses ditolak saat mengisolasi API.');
        console.error('💡 TIP: Pastikan "npm run dev" sudah dimatikan sebelum menjalankan export.');
        process.exit(1);
      }
      throw err; // Re-throw other errors to be caught by the outer try-catch
    }
    apiHidden = true;
  } else {
    console.log('ℹ️  No API directory found at src/app/api, skipping isolation.');
  }

  // 2. Set environment and run build
  console.log('🏗️  Building static export for GitHub Pages...');
  const env = { ...process.env, NEXT_PUBLIC_EXPORT: 'true' };
  
  // Use a cross-platform way to run next build
  execSync('npx next build', { 
    stdio: 'inherit', 
    shell: true,
    env: env
  });

  console.log('✅ Export successful!');
} catch (error) {
  console.error('❌ Build failed during export process.');
  console.error(error);
  process.exit(1);
} finally {
  // 3. ALWAYS restore the API routes for local development
  if (apiHidden && fs.existsSync(tmpApiPath)) {
    console.log('📂 Restoring API routes for local development...');
    fs.renameSync(tmpApiPath, apiPath);
  }
}

console.log('--- ✨ Export Process Finished ---');
