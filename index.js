// Main lighthouse runner / fn
import lighthouse from 'lighthouse';

// Required for launching chrome instance
import chromeLauncher from 'chrome-launcher';

// So we can save output
import { writeFile } from 'fs/promises';

const URLS = ['https://mfdot.com/','https://mfdot.com/food-app/index.html'];
const descriptors = ['MainSite','FoodApp'];

async function doAnal(URL,descriptor)
{
  // Launch instance of Chrome
  const chrome = await chromeLauncher.launch();

  // Gather results and report from Lighthouse
  const results = await lighthouse(URL, {
    port: chrome.port,
    output: 'html'
  }, {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance']
    }
  });

  // Save report to file
  await writeFile(`./reports/${descriptor}.html`, results.report);

  // Kill Chrome
  await chrome.kill();
}

async function Callme(){
  for (let i = 0; i < URLS.length;i++){
    await doAnal(URLS[i],descriptors[i]);
  }
}

Callme();
