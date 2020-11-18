import * as bidops from '../../bidops.json';
import { config } from '../config';
import { login } from "../support/Authentication"
import { BidRequest } from "../support/BidRequest";

const { barbara } = bidops.persona;
const { baseUrl } = config;

jest.setTimeout(60 * 1000)

describe('Creating requests', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1024, height: 768 })
    await Promise.all([
      page.waitForNavigation(),
      page.goto(baseUrl)
    ])
    await login(page, barbara)
  })

  describe('When I click on "New Request"', () => {
    it('I am walked through building a request', async () => {
      await BidRequest.create(page, {
        title: 'One Billion Light Bulbs',
        description: 'Ad Astra Per Aspera',
        spendCategory: "Tail End Spend"
      });
      
      expect(page.url()).toMatch(`/dashboard`)

      if (page.url()) {
        const matches = page.url() //.match("/bid_requests/(\d+)/dashboard")
          .match("/bid_requests/(\\d+)/dashboard"); //[1]
        if (matches) {
          const bidRequestId = matches[1];
          console.log("---> Created new bid request with id", bidRequestId)
        }
      }
    })
  })
})