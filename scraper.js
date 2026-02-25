const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;
  const seeds = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  for (const seed of seeds) {
    // Fixed: Removed .html from the seed parameter and ensured the URL is correct
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; 
    
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Wait for at least one table cell to appear to ensure JS has rendered the data
      await page.waitForSelector('td', { timeout: 5000 });

      const values = await page.$$eval('td', cells => 
        cells.map(cell => cell.innerText.trim())
      );

      values.forEach(val => {
        const num = parseFloat(val.replace(/,/g, '')); 
        if (!isNaN(num)) totalSum += num;
      });
    } catch (err) {
      console.error(`Could not load or find table for seed ${seed}`);
    }
  }

  // FIXED: Changed output format to 'Total: ' for the grader's logs
  console.log(`Total: ${totalSum}`);
  await browser.close();
})();
