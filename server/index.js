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
  getLastReviewUid,
  check_credentials,
  getMostRecentReview,
  getUsersNumberOfReviews,
  getUserTotalFavAnimes,
  getAllAnimesNames,
  getLastAnimeId,
  add_anime,
  isAnimeExists,
  addAnimeGenres,
  addReview,
  updateUserReview,
  addAnimeToFav,
  getUserId,
  getAnimeDetails,
  getReviewDetails,
  getIDByProfileName,
  getTotalAnimesInAllGenres,
} from "./database.js";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/all_genres", async (req, res) => {
  const genres = await getAllGenres();
  res.send(genres);
});

app.get("/get_total_animes_in_genres", async (req, res) => {
  const genres = await getTotalAnimesInAllGenres();
  res.send(genres);
});

app.get("/:profile_name/id", async (req, res) => {
  const profile_name = req.params.profile_name;
  const genres = await getUserId(profile_name);
  res.send(genres);
});

app.get("/all_animes", async (req, res) => {
  const result = await getAllAnimesNames();
  res.send(result);
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
  const animes = await getTopAnimes(5, 100);
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

app.get("/last_review_uid", async (req, res) => {
  const result = await getLastReviewUid();
  res.send(result);
});

app.post("/update_genres", async (req, res) => {
  const { anime_id, anime_genres } = req.body;
  const result = await addAnimeGenres(anime_id, anime_genres);
  res.send({ result: result });
});

app.post("/add_to_fav", async (req, res) => {
  const { user_id, anime_id } = req.body;
  const result = await addAnimeToFav(user_id, anime_id);
  res.send({ result: result });
});

app.post("/add_review", async (req, res) => {
  const { uid, profile, anime_uid, review, score } = req.body;
  const result = await addReview(uid, profile, anime_uid, review, score);
  res.send({ result: result });
});

app.post("/update_review", async (req, res) => {
  const { text, score, rev_id } = req.body;
  const result = await updateUserReview(text, score, rev_id);
  res.send(result);
});

app.post("/register", async (req, res) => {
  const { gender, password, birthday, username } = req.body;
  const result = await createUser(username, gender, birthday, password);
  res.send(result);

  // let msg = "";
  // if (result == null) {
  //   console.log("username taken");
  //   msg = "unsucsesfull register :(";
  // } else {
  //   console.log("added user!");
  //   msg = "sucsesfull register! :)";
  // }
  // res.send({ result: msg });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await check_credentials(username, password);
  res.send(result);
});

/*get anime details*/
app.post("/anime", async (req, res) => {
  const animeName = req.body.animeName;
  const result = await getAnimeDetails(animeName);
  if (result.length > 0) {
    // console.log(result);
    res.send(result);
  } else {
    res.send(null);
    console.log("Anime doesnt exist");
  }
});

/*get user details*/
app.post("/user", async (req, res) => {
  const username = req.body.username;
  const idRes = await getIDByProfileName(username);
  if (idRes.length > 0) {
    var data = JSON.parse(JSON.stringify(idRes));
    var id = data[0].id;
    const favAnimesRes = await getUserFavAnimes(id);
    const reviewDetailsRes = await getReviewDetails(username);

    const userData = [favAnimesRes, reviewDetailsRes];
    if (favAnimesRes.length > 0) {
      console.log(favAnimesRes);
      res.send(userData);
    }
  } else {
    res.send(null);
    console.log("User doesnt exist");
  }
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
