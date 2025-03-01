/**
 * @file NaukriPage.js
 * @description This file contains the NaukriPage class which extends the Playwright Page class.
 * @module NaukriPage
 * @requires import("...").Page
 */
/**
 * @typedef {import('@playwright/test').Page} Page
 */

class NaukriPage {
  /**
   * @param {Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page
  }

  // URLs
  naukriHomeURL = 'https://www.naukri.com/nlogin/login'
  naukriHomePage = 'https://www.naukri.com/mnjuser/profile'

  // Login Page Elements
  naukriUsername = "//input[@id='usernameField']"
  naukriPassword = "//input[@id='passwordField']"
  naukriSubmitButton = "//button[@type='submit'][contains(text(),'Login')][1]"

  // Profile Page Elements
  naukriCompleteProfile = "//div[@class='view-profile-wrapper']/child::a"
  naukriResumeHeadlinesIcon = "(//span[@class='edit icon'])[1]"
  naukriHeadlinesTextarea = "//textarea[@id='resumeHeadlineTxt']"
  naukriHeadlinesSaveButton = "(//button[@class='btn-dark-ot'])[3]"

  // Login Method
  async login(username, password) {
    await this.page.goto(this.naukriHomeURL, { waitUntil: 'load' })
    console.log('Navigated to Naukri Login Page' + this.naukriHomeURL)
    await this.page.waitForLoadState('load')

    await this.page.locator(this.naukriUsername).fill(username)
    await this.page.locator(this.naukriPassword).fill(password)
    await this.page.locator(this.naukriSubmitButton).click()
  }
}

module.exports = { NaukriPage }
