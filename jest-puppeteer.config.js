module.exports = {
  launch: {
      slowMo: 25,
      headless: process.env.HEADLESS !== 'false'
  },
  browserContext: "default",
};