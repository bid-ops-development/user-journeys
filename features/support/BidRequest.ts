import { Page } from "puppeteer"
import { queries, getDocument } from "pptr-testing-library"
const { getByText, getByTestId, getByLabelText } = queries;

type SpendCategory = 'Tail End Spend'
type RequestOptions = {
  title: string,
  description?: string,
  spendCategory?: SpendCategory
}

export class BidRequest {
  static async create(page: Page, { title, description, spendCategory }: RequestOptions) {
    console.log("[create-request] Creating request for " + title);
    const $document = await getDocument(page);
    const $newRequest = await getByText($document, 'New Request');
    await Promise.all([
      page.waitForNavigation(),
      $newRequest.click(),
    ]);

    console.log("[create-request] Creating request from scratch");

    // 0. Pick "Create From Scratch"
    const $fromScratch = await getByTestId($document, 'create-from-scratch');
    await $fromScratch.click();

    console.log("[create-request] Fill in details");

    // 1. Fill in title and description
    const $title = await getByLabelText($document, 'Request Title');
    const $description = await getByLabelText($document, 'Request Description');

    await $title.type(title);
    if (description) {
      await $description.type(description);
    }

    const $continueToCategory = await getByLabelText($document, 'Continue')
    await $continueToCategory.click();

    // 2. Set spend category
    console.log("[create-request] Set spending category");

    let category = spendCategory || 'Tail End Spend';
    const $spendCategory = await getByTestId($document,
      category)
    await $spendCategory.click()

    const $continueToCurrency = await getByLabelText($document, 'Continue')
    await $continueToCurrency.click();

    // 3. Select currency (USD default)
    const $continueToContract = await getByLabelText($document, 'Continue')
    await $continueToContract.click();

    // 4. Select contract details
    const $otp = await getByLabelText($document, "One-Time Purchase")
    await $otp.click()

    const $continueToPurpose = await getByLabelText($document, 'Continue')
    await $continueToPurpose.click();

    // 5. Specify bidding event
    const $no = await getByLabelText($document, 'NO')
    await $no.click()

    const $continueToComplete = await getByLabelText($document, 'Continue')
    await $continueToComplete.click();

    // 6. Done!
    const $complete = await getByLabelText($document, 'Complete')
    await $complete.click();

    // todo(jweissman) -- we could scan url and return the created bid id here

    await page.waitForTimeout(2000);
  }
}