require("dotenv").config();
const express = require("express");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
