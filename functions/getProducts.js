const puppeteer = require('puppeteer');

module.exports = async function getProducts(url) {
  try {
  const browser = await puppeteer.launch({timeout: 0, args: ['--no-sandbox']});
  const page = await browser.newPage();

  await page.goto(url);

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
  } catch (error) {
    console.log(error);
    return ({
      error: true,
      message: 'Hubo un error al traer los datos'
    })
  }
}