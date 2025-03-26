const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const countQuery = "SELECT COUNT(*) as total FROM items";
    const [countRows] = await db.query(countQuery);
    const total = countRows[0].total;

    const itemsQuery = `SELECT * FROM items ORDER BY id ASC LIMIT ? OFFSET ?`;
    const [rows] = await db.query(itemsQuery, [limit, offset]);

    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
