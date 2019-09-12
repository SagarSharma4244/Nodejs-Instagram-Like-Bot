const puppeteer = require("puppeteer");

const BASE_URL = `https://instagram.com/`;
const TAG_URL = tag => `https://www.instagram.com/explore/tags/${tag}/`;
const SAVED_URL = `https://www.instagram.com/sagarsharma4244/saved/`;

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false
    });
    instagram.page = await instagram.browser.newPage();
  },
  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    let loginButton = await instagram.page.$x(
      "//a[contains(text(), 'Log in')]"
    );

    // Click on the login Button
    await loginButton[0].click();

    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

    await instagram.page.waitFor(1000);

    // Writing the username and password
    await instagram.page.type("input[name='username']", username, {
      delay: 50
    });

    await instagram.page.type("input[name='password']", password, {
      delay: 50
    });

    loginButton = await instagram.page.$x("//div[contains(text() , 'Log In')]");

    // Click on the login Button
    await loginButton[0].click();

    await instagram.page.waitFor(10000);
    await instagram.page.waitFor("a > span[aria-label='Profile']");
  },

  likeTagsProcess: async (tags = []) => {
    for (let tag of tags) {
      // Go to tag Page
      await instagram.page.goto(TAG_URL(tag), { waitUntil: "networkidle2" });
      await instagram.page.waitFor(1000);
      let posts = await instagram.page.$$(
        "article > div:nth-child(3) img[decoding='auto']"
      );

      for (let i = 0; i < 3; i++) {
        let post = posts[i];

        // Click on the post
        await post.click();

        // wait for the model to appear
        await instagram.page.waitFor(
          "span[id='react-root'][aria-hidden='true']"
        );
        await instagram.page.waitFor(1000);

        let isLikable = await instagram.page.$('span[aria-label="Like"]');

        if (isLikable) {
          await instagram.page.click('span[aria-label="Like"]');
        }
        await instagram.page.waitFor(3000);

        // Close Model
        let CloseButton = await instagram.page.$x(
          "//button[contains(text(), 'Close')]"
        );
        await CloseButton[0].click();

        await instagram.page.waitFor(1000);
      }
      await instagram.page.waitFor(6000);
    }
  }
};

module.exports = instagram;
