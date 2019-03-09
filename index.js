const webdriver = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const chalk = require('chalk');


(async () => {
    // Chrome Serive
    const service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

    // Chrome Driver
    const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build(); // .setChromeOptions(new chrome.Options().headless())
    const By = webdriver.By;
    const until = webdriver.until;

    try {

        driver.get('https://trends.google.com.br/trends/?geo=BR');
        console.log(`Getting ${chalk.blue('Google Trends')}.\n`);

        const subject = {};

        // Subject Title
        const trend = driver.findElement(By.css('.editorials-content-container editorial-item .editorial-item-container .editorial-item .editorial-item-text.main-card-title'));
        await trend.getText().then(trendTitle => {
            console.log(`=> Trending Topic in Brazil:`, chalk.black.bgYellow(trendTitle));
            subject.title = trendTitle;
        });

        // Goto Subject's Page
        await trend.click();

        // Subject About
        const aboutTrend = driver.findElement(By.tagName('pre'));
        await driver.wait(until.elementIsVisible(aboutTrend), 5000);
        await aboutTrend.getText().then(trendAbout => {
            console.log(`=> About ${subject.title}:`, chalk.black.bgYellow(trendAbout));
            subject.about = trendAbout;
        });

    } catch (err) {
        console.log(chalk.red('Error:'), err.name);
        console.log(err);        
        
        console.log(chalk.cyan('Closing Google Chrome...'));
        driver.close();
    }
})();