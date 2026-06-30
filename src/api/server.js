/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ ok: true, service: "Digital Friend Express API" });
});

const port = process.env.EXPRESS_PORT || 5050;
app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
