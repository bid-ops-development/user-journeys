import { Page } from "puppeteer";
import { config } from "../config";
import { login, logout, UserProfile } from "./Authentication";
import { BidRequest, RequestAttributes } from "./BidRequest";

const { baseUrl } = config;

type AppRoute = 'home'
const router = (route: AppRoute) => {
  return { 'home': baseUrl }[route]
}

// slightly higher-order wrapper around app-level concepts
class App {
  constructor(private page: Page) {}

  init = async () => {
    await this.setViewport()
    await this.visit("home");
  }

  async setViewport() {
    await page.setViewport({ width: 1024, height: 768 })
  }

  async visit(route: AppRoute) {
    let uri = router(route)
    await Promise.all([
      page.waitForNavigation(),
      page.goto(uri),
    ])
  }

  signIn = async (persona: UserProfile) => {
    await login(this.page, persona);
  }

  signOut = async () => {
    await logout(this.page);
  }

  bidRequests = {
    create: async (attributes: RequestAttributes) => {
      await BidRequest.create(this.page, attributes)
    },
    inviteSupplier: async () => {

    },
  }

  // todo createRequest()
}

export default App;