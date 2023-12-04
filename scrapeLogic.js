const puppeteer = require('puppeteer');
require('dotenv').config();

const scrapeLogic = async (res) => {

    try {

        const browser = await puppeteer.launch({
            executablePath:
                process.env.NODE_ENV === 'production'
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
            headless: 'new',

            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                "--disable-setuid-sandbox",
                '--no-sandbox',
                "--single-process",
                "--no-zygote",

            ],

        });
        const page = await browser.newPage();

        await page.goto('https://example.com');
        const h1Content = await page.evaluate(() => {
            // Obtener el texto dentro del elemento h1
            const h1Element = document.querySelector('h1');
            return h1Element.textContent;
        });

        res.send(h1Content);
        await browser.close();
    } catch (error) {
        console.error(error)
        res.send(`Algo salio mal ${error}`);
    }
}

module.exports = {
    scrapeLogic
}