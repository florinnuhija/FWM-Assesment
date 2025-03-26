const request = require("supertest");
const express = require("express");
const itemsRouter = require("../routes/items");

const app = express();
app.use(express.json());
app.use("/api/items", itemsRouter);

describe("GET /api/items", () => {
  it("should return a list of items with pagination info", async () => {
    const res = await request(app).get("/api/items?page=1&limit=5");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("pagination");
    expect(res.body.pagination).toHaveProperty("total");
  });

  it("should handle invalid page query params gracefully", async () => {
    const res = await request(app).get("/api/items?page=abc&limit=5");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});
