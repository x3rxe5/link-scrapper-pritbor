const puppeteer = require('puppeteer');
const cheerio = require("cheerio");


const scrap = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://reddit.com');
  const data = await page.content();  
  
  await scrapHTML(data);

  await page.screenshot({ path: 'example.png' });

  await browser.close();
};

const scrapHTML = async (data) => {
    const $ = cheerio.load(data);
    console.log(`h2 length => `,$('h3').length);
    await $('h3').each(function() {
        // console.log($(this).text());
        return $(this).text();
    });
}

module.exports = scrap;