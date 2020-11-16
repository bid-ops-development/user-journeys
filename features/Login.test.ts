import { login, logout } from "./support/Authentication";
import * as bidops from '../bidops.json';

const baseUrl = bidops.environments.local;
const { sam, barbara } = bidops.personae;
jest.setTimeout(10000)

describe('Login', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1024, height: 768 })
    console.log(`[before:all] visit ${baseUrl}`)
    await Promise.all([
      page.waitForNavigation(),
      page.goto(baseUrl),
    ])
  })

  describe('as a buyer', () => {
    beforeAll(async () => await login(page, barbara));
    afterAll(async () => await logout(page))

    describe('when I enter my credentials', () => {
      it('should authenticate me', async () => {
        expect(page.url()).toMatch(`/bid_requests`);
      })
    });
  });

  describe('as a supplier', () => {
    beforeAll(async () => await login(page, sam));
    afterAll(async () => await logout(page))

    describe('when I enter my credentials', () => {
      it('should authenticate me', async () => {
        expect(page.url()).toMatch(`/bid_requests`);
      })
    });
  });
});