import express from "express";
import cors from "cors";
import {
  getProfiles,
  getProfileName,
  getNumOfUsers,
  isUsernameTaken,
  createUser,
  getAnimeAvgScroe,
  getTopAnimes,
  getUserFavAnimes,
  getAllGenres,
  getAnimeByGenreList,
  getMostActiveUsers,
  check_credentials,
  getMostRecentReview,
  getUsersNumberOfReviews,
  getUserTotalFavAnimes,
  add_anime,
} from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/all_genres", async (req, res) => {
  const genres = await getAllGenres();
  res.send(genres);
});

app.get("/:id/num_of_reviews", async (req, res) => {
  const id = req.params.id;
  const total_reviews = await getUsersNumberOfReviews(id);
  res.send(total_reviews);
});

// genres should be a string of the following format a,b,c...
app.get("/animes/:genres", async (req, res) => {
  const genres = req.params.genres.split(",");
  const animes = await getAnimeByGenreList(genres);
  res.send(animes);
});

app.get("/active_users", async (req, res) => {
  const active_users = await getMostActiveUsers(10);
  res.send(active_users);
});

app.get("/:id/fav_animes", async (req, res) => {
  const id = req.params.id;
  const animes = await getUserFavAnimes(id);
  res.send(animes);
});

app.get("/:id/count_fav_animes", async (req, res) => {
  const id = req.params.id;
  const animes = await getUserTotalFavAnimes(id);
  res.send(animes);
});

app.get("/top_animes", async (req, res) => {
  const animes = await getTopAnimes(10, 100);
  res.send(animes);
});
app.get("/profiles", async (req, res) => {
  const profiles = await getProfiles();
  res.send(profiles);
});

app.get("/:anime/score", async (req, res) => {
  const anime_name = req.params.anime;
  const score = await getAnimeAvgScroe(anime_name);
  res.send(score);
});

app.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const profile_name = await getProfileName(id);
  res.send(profile_name);
});

app.get("/:id/most_recent", async (req, res) => {
  const id = req.params.id;
  const review = await getMostRecentReview(id);
  res.send(review);
});

app.post("/register", async (req, res) => {
  const { gender, password, birthday, profile_name } = req.body;
  const result = await createUser(profile_name, gender, birthday, password);
  let msg = "";
  if (result == null) {
    console.log("username taken");
    msg = "unsucsesfull register :(";
  } else {
    console.log("added user!");
    msg = "sucsesfull register! :)";
  }
  res.send({ result: msg });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await check_credentials(username, password);
  res.send({ result: result });
});

app.post("/add_anime", async (req, res) => {
  const {
    anime_name,
    summary,
    aired_date,
    end_date,
    episodes,
    img_url,
    anime_genres,
  } = req.body;
  const result = await add_anime(
    anime_name,
    summary,
    aired_date,
    end_date,
    episodes,
    img_url,
    anime_genres
  );
  res.send({ result: "hi" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});
