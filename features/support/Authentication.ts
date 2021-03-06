import { queries, getDocument } from "pptr-testing-library"
import { Page } from "puppeteer"

export type UserProfile = { email: string, password: string, role: string }

const { getByLabelText, getByText, getByTestId } = queries

export const login = async (page: Page, { email, password, role }: UserProfile) => {
  const $document = await getDocument(page)
  const $email = await getByLabelText($document, 'Enter Email')
  const $pass = await getByLabelText($document, 'Enter Password')
  const $submit = await getByText($document, 'Sign in')
  await $email.type(email)
  await $pass.type(password)
  await Promise.all([
    page.waitForNavigation(),
    $submit.click(),
  ])
  await page.waitForTimeout(1000)
}

export const logout = async (page: Page) => {
  const $document = await getDocument(page)
  const $dropdown = await getByLabelText($document, 'User Avatar')
  await $dropdown.click()
  const $signout = await getByTestId($document, "sign-out")
  await Promise.all([
    $signout.click(),
    page.waitForNavigation()
  ])
  await page.waitForTimeout(1000)
}