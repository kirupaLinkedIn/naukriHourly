import { test, expect } from '@playwright/test';

class NaukriPage {
  constructor(page) {
    this.page = page;
  }

  // URLs
  naukriHomeURL = 'https://www.naukri.com/nlogin/login';
  naukriHomePage = 'https://www.naukri.com/mnjuser/profile';

  // Login Page Elements
  naukriUsername = "//input[@id='usernameField']";
  naukriPassword = "//input[@id='passwordField']";
  naukriSubmitButton = "//button[@type='submit'][contains(text(),'Login')][1]";

  // Profile Page Elements
  naukriCompleteProfile = "//div[@class='view-profile-wrapper']/child::a";
  naukriResumeHeadlinesIcon = "(//span[@class='edit icon'])[1]";
  naukriHeadlinesTextarea = "//textarea[@id='resumeHeadlineTxt']";
  naukriHeadlinesSaveButton = "(//button[@class='btn-dark-ot'])[3]";

  // Login Method
  async login(username, password) {
    await this.page.goto(this.naukriHomeURL, { waitUntil: 'load' });
    console.log('Navigated to Naukri Login Page' + this.naukriHomeURL);
    await this.page.waitForLoadState('load');

    await this.page.locator(this.naukriUsername).fill(username);
    await this.page.locator(this.naukriPassword).fill(password);
    await this.page.locator(this.naukriSubmitButton).click();
  }
}

test.describe('Update Naukri Profile', () => {
  let naukriPage;

  test('Update Resume Headline', async ({ page }) => {
    naukriPage = new NaukriPage(page);
    await naukriPage.login('mkirupaagar@gmail.com', 'Kirupa$278');
    await page.locator(naukriPage.naukriCompleteProfile).click();
    await page.locator(naukriPage.naukriResumeHeadlinesIcon).click();

    let headlinesText = await page.locator(naukriPage.naukriHeadlinesTextarea).textContent();
    console.log('Headlines Text: ', headlinesText);

    if (headlinesText) {
      if (headlinesText.endsWith('.')) {
        headlinesText = headlinesText.slice(0, -1);
      } else {
        headlinesText = headlinesText + '.';
      }
      await page.locator(naukriPage.naukriHeadlinesTextarea).fill(headlinesText);
      await page.locator(naukriPage.naukriHeadlinesSaveButton).click();
    }

    console.log('Updated Headlines Text: ', headlinesText);
  });
});
