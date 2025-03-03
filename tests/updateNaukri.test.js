import { test, expect } from '@playwright/test';

class NaukriPage {
  constructor(page) {
    this.page = page;
  }

  // URLs
  naukriHomeURL = 'https://www.naukri.com/';
  naukriHomePage = 'https://www.naukri.com/mnjuser/profile';
  loginPage = "//a[@id='login_Layer']";
  // Login Page Elements
  naukriUsername = "//input[@placeholder='Enter your active Email ID / Username']";
  naukriPassword = "//input[@placeholder='Enter your password']";
  naukriSubmitButton = "//button[@type='submit'][contains(text(),'Login')][1]";

  // Profile Page Elements
  naukriCompleteProfile = "//div[@class='view-profile-wrapper']/child::a";
  naukriResumeHeadlinesIcon = "(//span[@class='edit icon'])[1]";
  naukriHeadlinesTextarea = "//textarea[@id='resumeHeadlineTxt']";
  naukriHeadlinesSaveButton = "(//button[@class='btn-dark-ot'])[3]";

  // Login Method
  async login(username, password) {
    console.log('Navigating to Naukri Login Page');
    await this.page.goto(this.naukriHomeURL);
    console.log('Navigated to Naukri Login Page: ' + this.naukriHomeURL);

    //click on login button
    await this.page.waitForSelector(this.loginPage, { state: 'visible', timeout: 10000 });
    await this.page.locator(this.loginPage).click();
    
    console.log('Filling in username');
    await this.page.locator("//input[contains(@placeholder,'Enter your active Email ID / Username')]").type(username);
    console.log('Filling in password');
    await this.page.locator("//input[@type='password']").type(password);
    console.log('Clicking submit button');
    await this.page.locator(this.naukriSubmitButton).click();
  }
}

test.describe('Update Naukri Profile', () => {
   test.setTimeout(60000); // Increase timeout to 60 seconds

  let naukriPage;

  test('Update Resume Headline', async ({ page }) => {
    naukriPage = new NaukriPage(page);
    console.log('Starting login process');
    await naukriPage.login('mkirupaagar@gmail.com', 'Kirupa$278');
    console.log('Login successful');

    console.log('Navigating to complete profile');
    //wait for 5 seconds
    await page.waitForTimeout(10000);
    await page.locator(naukriPage.naukriCompleteProfile).click();
    console.log('Clicked on complete profile');

    console.log('Clicking on resume headlines icon');
    await page.locator(naukriPage.naukriResumeHeadlinesIcon).click();
    console.log('Clicked on resume headlines icon');

    console.log('Fetching current headlines text');
    let headlinesText = await page.locator(naukriPage.naukriHeadlinesTextarea).textContent();
    console.log('Headlines Text: ', headlinesText);

    if (headlinesText) {
      if (headlinesText.endsWith('.')) {
        console.log('Removing trailing period from headlines text');
        headlinesText = headlinesText.slice(0, -1);
      } else {
        console.log('Adding period to headlines text');
        headlinesText = headlinesText + '.';
      }
      console.log('Updating headlines text');
      await page.locator(naukriPage.naukriHeadlinesTextarea).fill(headlinesText);
      console.log('Saving updated headlines text');
      await page.locator(naukriPage.naukriHeadlinesSaveButton).click();
    }

    console.log('Updated Headlines Text: ', headlinesText);
  });
});
