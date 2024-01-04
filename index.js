import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const response = result.data.drinks[0];
    res.render("index.ejs", { data: response });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const cocktailName = req.body;
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName.cocktailName}`
    );
    res.render("index.ejs", { data: response.data.drinks[0] });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error:
        "No such cocktail exists, please go back and search for a valid drink",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
