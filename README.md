# user-journeys

End-to-end user stories for the Bid Ops app.

# About

We use Jest for a testing DSL and Puppeteer to manage the headless chrome instance.

# Features

- [x] Login to the app as a buyer
- [x] Create a bid request
- [ ] Login to the app as a supplier
- [ ] Make a bid

# Getting Started

Clone the repo and `yarn install` for dependencies.

# Run User Journeys

Run entire suite:
`yarn test`

Run a specific spec:
`HEADLESS=false yarn test CreateRequests`