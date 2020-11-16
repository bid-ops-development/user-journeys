import { login, logout } from "../support/Authentication";
import * as bidops from '../../bidops.json';
import { config } from "../config";

const { sam, barbara } = bidops.persona;
const { baseUrl } = config;

jest.setTimeout(10000)

describe('Login', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1024, height: 768 })
    await Promise.all([
      page.waitForNavigation(),
      page.goto(baseUrl),
    ])
  })

  describe('As a buyer', () => {
    beforeAll(async () => await login(page, barbara));
    afterAll(async () => await logout(page))

    describe('When I enter my credentials', () => {
      it('Authenticates me', async () => {
        expect(page.url()).toMatch(`/bid_requests`);
      })
    });
  });

  describe('As a supplier', () => {
    beforeAll(async () => await login(page, sam));
    afterAll(async () => await logout(page))

    describe('When I enter my credentials', () => {
      it('Authenticates me', async () => {
        expect(page.url()).toMatch(`/bid_requests`);
      })
    });
  });
});