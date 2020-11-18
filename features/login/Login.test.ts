import { login, logout } from "../support/Authentication";
import * as bidops from '../../bidops.json';
import { config } from "../config";
import App from "../support/App";

const { sam, barbara } = bidops.persona;
const { baseUrl } = config;

jest.setTimeout(60*1000)

describe('Login', () => {
  const app: App = new App(page);
  beforeAll(app.init);

  describe('As a buyer', () => {
    beforeAll(async () => await app.signIn(barbara));
    afterAll(async () => await app.signOut())

    describe('When I enter my credentials', () => {
      it('Authenticates me', async () => {
        expect(page.url()).toMatch(`/bid_requests`);
      })
    });
  });

  describe('As a supplier', () => {
    beforeAll(async () => await app.signIn(sam));
    afterAll(async () => await app.signOut())

    describe('When I enter my credentials', () => {
      it('Authenticates me', async () => {
        expect(page.url()).toMatch(`/bid_requests`);
      })
    });
  });
});