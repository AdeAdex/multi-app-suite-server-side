//backend

require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || process.env.PORT2;


app.use(express.json());

const corsOptions = {
  origin: [process.env.CORS_ORIGIN_LOCAL, process.env.CORS_ORIGIN_PROD],
};

app.use(cors(corsOptions));

app.get("/api/football-matches", async (req, res) => {
  console.log("adex");
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": process.env.X_AUTH_TOKEN,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
