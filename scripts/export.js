const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Go up to project root from /scripts
const rootDir = path.join(__dirname, '..');
const apiPath = path.join(rootDir, 'src/app/api');
const hiddenApiPath = path.join(rootDir, 'src/app/_api');

try {
  console.log('🚀 Starting Stealth Build process...');
  
  // 1. Hide API folder (Next.js treats folders starting with _ as private)
  if (fs.existsSync(apiPath)) {
    console.log('📦 Hiding API folder from Next.js builder...');
    fs.renameSync(apiPath, hiddenApiPath);
  }
  
  // 2. Run the actual build
  console.log('🏗️  Building static export...');
  process.env.NEXT_PUBLIC_EXPORT = 'true';
  execSync('next build', { stdio: 'inherit', shell: true });
  
  console.log('✅ Export successful!');
} catch (error) {
  console.error('❌ Build process failed.');
  process.exit(1);
} finally {
  // 3. Always restore the API folder so Local Dev keeps working
  if (fs.existsSync(hiddenApiPath)) {
    console.log('📂 Restoring API folder for Local Development...');
    fs.renameSync(hiddenApiPath, apiPath);
  }
}
