const puppeteer = require('puppeteer-core');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Default Edge path on Windows
    headless: 'new'
  });
  const page = await browser.newPage();
  
  // Set desktop resolution
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to http://localhost:3000...');
  // Wait until network is idle
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 });
  
  console.log('Waiting for 3D elements/animations to load...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const outputPath = '..\\Portfolio_Preview.pdf';
  console.log(`Saving PDF to ${outputPath}...`);
  
  await page.pdf({ 
    path: outputPath, 
    format: 'A4', 
    printBackground: true,
    scale: 0.8 // Scale down slightly to fit the layout on A4
  });
  
  await browser.close();
  console.log('Done!');
})();
