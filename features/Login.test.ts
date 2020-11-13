// import puppeteer from 'puppeteer'
import { getDocument, queries } from 'pptr-testing-library'
const { getByLabelText, getByText } = queries

describe('As a BidOps user', () => {
  beforeAll(async () => {
    await page.goto('http://bidops.staging.bidops.com');
  });

  describe('When I visit the app homepage', () => {
    it('should be titled "BidOps"', async () => {
      await expect(page.title()).resolves.toMatch('Bid Ops');
    });

    it('should authenticate me', async () => {
      expect(page.url()).toEqual("http://bidops.staging.bidops.com/login")

      const $document = await getDocument(page)
      const $email = await getByLabelText($document, 'Enter Email')
      const $pass = await getByLabelText($document, 'Enter Password')
      const $submit = await getByText($document, 'Sign in')

      await $email.type('buyer@bidops.com')
      await $pass.type('hours~bridge~port~design')
      await $submit.click()
      await page.screenshot({ path: "./login.jpg", type: 'jpeg' })
      await page.waitForNavigation()
      expect(page.url()).toEqual("http://bidops.staging.bidops.com/bid_requests")
    })
  });
});