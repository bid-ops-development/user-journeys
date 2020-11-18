import { queries, getDocument } from 'pptr-testing-library';
import * as bidops from '../../bidops.json';
import { config } from '../config';
import App from '../support/App';
import { login } from "../support/Authentication"
import { BidRequest } from "../support/BidRequest";
const { getByLabelText } = queries;


jest.setTimeout(60 * 1000)

describe('Creating requests', () => {
  const app: App = new App(page);
  const { barbara } = bidops.persona;
  const { baseUrl } = config;
  let bidRequestId: string;
  beforeAll(app.init)
  beforeAll(async () => await app.signIn(barbara))

  describe('When I click on "New Request"', () => {
    it('I can walk through building a request', async () => {
      await app.bidRequests.create({
        title: 'One Billion Light Bulbs',
        description: 'Ad Astra Per Aspera',
        spendCategory: "Tail End Spend"
      });
      
      if (page.url()) {
        expect(page.url()).toMatch(`/dashboard`)
        const matches = page.url()
          .match("/bid_requests/(\\d+)/dashboard");
        if (matches) {
          bidRequestId = matches[1];
          console.log("---> Created new bid request with id", bidRequestId)
        }
      }
    })

    it('can invite suppliers', async () => {
      // await Promise.all([
        // page.waitForNavigation(),
      await page.goto(baseUrl + `/bid_requests/${bidRequestId}/suppliers`)
      // ])

      console.log("Inviting suppliers...")

      const $document = await getDocument(page);

      const $addSuppliers = await getByLabelText($document, "Add Suppliers")
      await $addSuppliers.click()

      console.log("Clicked add suppliers...")

      const $addFromSuppliers = await getByLabelText($document, "Add from Suppliers")
      await $addFromSuppliers.click()

      page.waitForTimeout(5000);
    })
  })
})