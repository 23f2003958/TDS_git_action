const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;
  const seeds = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  for (const seed of seeds) {
    // Note: Replace the URL below with the actual base URL provided in your assignment
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}.html`; 
    
    try {
      await page.goto(url);
      // Extracts all text from table cells and converts to numbers
      const values = await page.$$eval('td', cells => 
        cells.map(cell => cell.innerText.trim())
      );

      values.forEach(val => {
        const num = parseFloat(val.replace(/,/g, '')); // Handles commas in numbers
        if (!isNaN(num)) totalSum += num;
      });
    } catch (err) {
      console.error(`Could not load seed ${seed}`);
    }
  }

  console.log(`FINAL_TOTAL_SUM: ${totalSum}`);
  await browser.close();
})();
