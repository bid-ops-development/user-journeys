module.exports = {
  launch: {
      slowMo: 50,
      headless: process.env.HEADLESS !== 'false'
  },
  browserContext: "default",
};