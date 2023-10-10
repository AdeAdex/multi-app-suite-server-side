//backend

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for specific origin
const corsOptions = {
  origin: ["https://adex-multi-app-suite.vercel.app", "http://localhost:3000"],
};

app.use(cors(corsOptions));

app.get("/api/football-matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/PL/matches?matchday=11'",
      {
        headers: {
          "X-Auth-Token": "70f5fc17b1374351b458e3f71cb76249",
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
