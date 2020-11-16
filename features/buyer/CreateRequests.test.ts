import { queries, getDocument } from "pptr-testing-library"
import { Page } from "puppeteer"
import * as bidops from '../../bidops.json';
import { config } from '../config';
import { login, logout } from "../support/Authentication"

const { getByLabelText, getByText, getByTestId } = queries
const { barbara } = bidops.persona;
const { baseUrl } = config;

jest.setTimeout(15000)

type RequestOptions = { title: string, description: string }
const createRequest = async (page: Page, { title, description }: RequestOptions) => {
  const $document = await getDocument(page);
  const $newRequest = await getByText($document, 'New Request');
  await Promise.all([
    page.waitForNavigation(),
    $newRequest.click()
  ])

  const $fromScratch = await getByTestId($document, 'create-from-scratch');
  await $fromScratch.click();
  // await Promise.all([
    // page.waitForNavigation(),
    // $fromScratch.click()
  // ])

  const $title = await getByLabelText($document, 'Request Title');
  const $description = await getByLabelText($document, 'Request Description');
  // const $continue = await getByLabelText($document, 'Continue')

  await $title.type(title);
  await $description.type(description);

  await page.waitForTimeout(1000);
  // await $continue.click();
}

describe('Creating requests', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1024, height: 768 })
    await Promise.all([
      page.waitForNavigation(),
      page.goto(baseUrl),
    ])
    await login(page, barbara)
  })

  afterAll(async () => await logout(page))

  describe('When I click on "New Request"', () => {
    it('Lets me build a request', async () => {
      await createRequest(page, {
        title: 'One Billion Light Bulbs',
        description: 'Ad Astra'
      });
      
      expect(page.url()).toMatch(`/new_bid_request`);
    })
  })
})