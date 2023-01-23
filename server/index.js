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
  getUserReviews,
  getMostActiveUsers,
  check_credentials,
  getMostRecentReview,
  getUsersNumberOfReviews,
  getUserTotalFavAnimes,
  getLastAnimeId,
  add_anime,
  isAnimeExists,
  addAnimeGenres,
} from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/all_genres", async (req, res) => {
  const genres = await getAllGenres();
  res.send(genres);
});

app.get("/:anime/is_exists", async (req, res) => {
  const anime_name = req.params.anime;
  const result = await isAnimeExists(anime_name);
  res.send({ result: result.length });
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

app.get("/profiles/last_id", async (req, res) => {
  const last_anime_id = await getLastAnimeId();
  res.send({ last_id: last_anime_id[0]["uid"] });
});

app.get("/:profile/get_reviews", async (req, res) => {
  const profile = req.params.profile;
  const result = await getUserReviews(profile);
  res.send({ reviews: result });
});

app.get("/:id/most_recent", async (req, res) => {
  const id = req.params.id;
  const review = await getMostRecentReview(id);
  res.send(review);
});

app.post("/update_genres", async (req, res) => {
  const { anime_id, anime_genres } = req.body;
  const result = await addAnimeGenres(anime_id, anime_genres);
  res.send({ result: result });
});

app.post("/update_review", async (req, res) => {
  const { rev_id, score, rev_text } = req.body;
  console.log(req.body);
  // const result = await updateUserReview(rev_id, score, rev_text);
  res.send({ result: "hi" });
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
  const { anime_name, summary, aired_date, end_date, episodes, img_url, id } =
    req.body;
  const result = await add_anime(
    anime_name,
    summary,
    aired_date,
    end_date,
    episodes,
    img_url,
    id
  );
  res.send(result);
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});
