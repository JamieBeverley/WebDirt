import puppeteer from 'puppeteer';

const devPort = 8000;

const wait = (dur) => new Promise(res => {
    setTimeout(res, dur)
});

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(`http://localhost:${devPort}`);

    const buttonSelector = "#init";
    // Wait until the button is not disabled
    await page.waitForFunction(
        (selector) => !document.querySelector(selector).disabled,
        {},
        buttonSelector
    );
    await page.click(buttonSelector);

    const wdAwait = await page.evaluate(async () => {
        const start = new Date();
        const timeout = 5000;
        while (window.wd === undefined && (new Date() - start) < timeout) {
            console.log('not found, waiting...')
            await wait(500);
        }
        if (window.wd !== undefined) return wd;
        throw Error("WebDirt not defined... check console logs")
    });

    const playSample = async (args) => {
        await page.evaluate(x => wd.playSample(x), args)
    };

    const performTrace = async (traceName, params) => {
        await page.tracing.start({ path: `trace-${traceName}.json` });
        for (let i = 0; i < 10; i++) {
            await playSample(params)
        }
        // Some delay for the audio nodes to play (and then clean up)
        await wait(1000);
        await page.tracing.stop();
    }

    const s = 'bd';
    playSample({ s, coarse: 4 })
    await wait(2000);
    await performTrace('no-worklet', { s });
    await performTrace('with-worklet', { s, coarse: 4 });

    await browser.close();
})();