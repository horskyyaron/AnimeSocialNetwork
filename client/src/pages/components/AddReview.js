import { useFetch } from "../utils.js";
import { useState } from "react";
import axios from "axios";
import AnimeSearchOption from "./AnimeSearchOption.js";
import "./AddReview.css";

export default function AddReview({ onCancel, onAdd, user_id }) {
  const [search, setSearch] = useState("");
  const [selectedAnime, setSelectedAnime] = useState("");
  const [review, setReview] = useState("");
  const [score, setScore] = useState(1);

  const [baseline, error, loading] = useFetch(
    "http://localhost:8080/all_animes"
  );

  const handleCancel = () => {
    //telling parent comp to close this comp.
    onCancel(false);
  };
  const handleSelected = (anime_name) => {
    setSelectedAnime(anime_name);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    addReviewToDb();
    onAdd();
  };

  const addReviewToDb = async () => {
    const result_uid = await axios.get("http://localhost:8080/last_review_uid");
    const uid = result_uid.data.result[0]["uid"] + 1;
    const anime_uid_result = await axios.get(
      `http://localhost:8080/profile/${user_id}`
    );
    const profile = anime_uid_result.data[0]["profile_name"];
    const anime_uid = baseline["result"].filter((anime) => {
      return anime.title == selectedAnime;
    })[0]["uid"];

    const result = await axios.post("http://localhost:8080/add_review", {
      uid: uid,
      profile: profile,
      anime_uid: anime_uid,
      review: review,
      score: score,
    });

    console.log(result);
    alert("review added!");
  };

  return (
    <>
      <h1>Add Review</h1>

      <input type="search" onChange={(e) => setSearch(e.target.value)} />
      <div>
        <ul>
          {loading
            ? "loading"
            : baseline["result"]
                .filter((anime) => {
                  return search.toLowerCase() === ""
                    ? anime.title
                    : anime.title.toLowerCase().includes(search.toLowerCase());
                })
                .slice(0, 10)
                .map((anime) => (
                  <AnimeSearchOption
                    onSelect={handleSelected}
                    anime_name={anime.title}
                    key={anime.title}
                  />
                ))}
        </ul>
      </div>
      {selectedAnime == "" ? (
        "choose an anime"
      ) : (
        <>
          selected anime: <b>{selectedAnime}</b>
          <form onSubmit={handleSumbit} className="add_review_form">
            <label>review:</label>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              placeholder=""
              maxLength="3000"
              minLength="20"
              required
            ></textarea>
            <label>score (1-10):</label>
            <input
              type="number"
              min="1"
              max="10"
              defaultValue={score}
              onChange={(e) => setScore(e.target.value)}
            ></input>
            <button type="submit" className="styled_button">
              send review
            </button>
          </form>
        </>
      )}
      <br />
      <button className="styled_button" onClick={handleCancel}>
        cancel
      </button>
    </>
  );
}
