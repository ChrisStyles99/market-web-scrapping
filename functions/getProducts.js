const puppeteer = require('puppeteer');

module.exports = async function getProducts(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  await page.waitForSelector('h1.vtex-search-result-3-x-galleryTitle--layout.t-heading-1', {
    visible: true
  });

  await new Promise(resolve => setTimeout(resolve, 5000));

  const items = await page.$$('article.vtex-product-summary-2-x-element.pointer.pt3.pb4.flex.flex-column.h-100');
  const products = await Promise.all(items.map(async item => {
    const name = await item.$('span.vtex-product-summary-2-x-productBrand.vtex-product-summary-2-x-brandName.t-body');
    const price = await item.$('.tiendasjumboqaio-jumbo-minicart-2-x-price');

    return ({
      name: await name.evaluate(el => el.textContent), price: await price.evaluate(el => el.textContent)
    })
  }));

  await browser.close();

  return products;
}