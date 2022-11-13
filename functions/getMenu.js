const puppeteer = require('puppeteer');

module.exports = async function getMenu() {
  try {
  const url = 'https://www.soriana.com'
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36 Edg/107.0.1418.35');
  await page.goto(url, {
    waitUntil: 'domcontentloaded'
  });

  const menuObject = {
    department: 'Despensa',
    url: 'https://www.soriana.com/supermercado.html',
    categories: []
  }

  const list = await page.$('#cat-despensa');

  const categories = await list.$$('#cat-despensa > .nav__spaceY.position-relative');
  await Promise.all(categories.map(async(category) => {
    const anchor = await category.$('.d-flex.align-items-center.justify-content-between.flex-wrap > a');
    if(!anchor) {
      const singleItem = await category.$('a');
      const name = await singleItem.evaluate(el => el.textContent.trim());
      const singleItemURL = url + await singleItem.evaluate(el => el.getAttribute('href'))
      menuObject.categories.push({
        name: name,
        url: singleItemURL
      });
    } else {
      const subCategories = await Promise.all((await category.$$('ul > li > a')).map(async item => {
        const name = await item.evaluate(el => el.textContent.trim())
        const newURL = url + await item.evaluate(el => el.getAttribute('href'));
        
        return ({
          name,
          url: newURL
        })
      }));

      menuObject.categories.push({
        name: await anchor.evaluate(el => el.textContent.trim()),
        url: url + await anchor.evaluate(el => el.getAttribute('href')),
        subCategories
      })
    }
  }));

  await browser.close();

  return ({
    error: false,
    data: menuObject
  });
  } catch (error) {
    console.log(error);
    return ({
      error: true,
      message: 'Hubo un error al traer la información'
    })
  }
}