// import puppeteer from 'puppeteer'
// import { getDocument, queries, waitFor } from 'pptr-testing-library'
// const { getByText, getByTestId, getByLabelText } = queries

// const browser = await puppeteer.launch()
// const page = await browser.newPage()

// // Grab ElementHandle for document
// const $document = await getDocument(page)
// // Your favorite query methods are available
// const $form = await getByTestId($document, 'my-form')
// // returned elements are Puppeteer ElementHandles too!
// const $email = await getByLabelText($form, 'Email')
// // interact with puppeteer like usual
// await $email.type('pptr@example.com')
// // waiting works too!
// // await waitFor(() => getByText('Loading...'))

// // export {}