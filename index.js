const webdriver = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

// Chrome Serive
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);


(() => {
    // Chrome Driver
    const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(new chrome.Options().headless()).build()
    const By = webdriver.By;

    driver.get('https://trends.google.com.br/trends/?geo=BR');
    console.log('Trends ON');

    const lastTrend = driver.findElement(By.css('editorial-item.editorial-not-main-card .editorial-item-text.title'));

    lastTrend.getText().then(text => {
        console.log('Assunto mais falado no Brasil:', text);
        lastTrend.click();
    });

})();