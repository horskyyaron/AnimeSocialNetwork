import { useFetch } from "../utils.js";
import { useState } from "react";
import AnimeBox from "./AnimBox.js";
import "./AddAnimeToFav.css";
import axios from "axios";

export default function AddAnimeToFav({ onCancel, onAdd, user_id }) {
  const [baseline, error, loading] = useFetch(
    "http://localhost:8080/all_animes"
  );

  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState("");

  const handleCancel = () => {
    onCancel(false);
  };

  const handleClick = (anime) => {
    setSelected(anime);
  };

  const handleResetSelection = () => {
    setSelected("");
  };

  const addFavAnime = () => {
    //adding to db
    post_fav_anime_to_user(user_id);

    // informing user
    console.log("adding anime to user");
  };

  const post_fav_anime_to_user = async (user_id) => {
    //getting anime_id
    const anime_id = baseline["result"].filter((anime) => {
      return anime.title == selected;
    })[0]["uid"];

    const result = await axios.post("http://localhost:8080/add_to_fav", {
      user_id: user_id,
      anime_id: anime_id,
    });
    console.log(result);

    if (result.data.result.addition == "ok") {
      alert("added");
      onAdd(selected);
    }
  };

  return (
    <>
      <div class="add_fav_top">
        <h1>adding anime to fav</h1>
        <input type="search" onChange={(e) => setSearch(e.target.value)} />
        {selected == "" ? (
          ""
        ) : (
          <>
            <br></br>
            <span>
              selected: <b>{selected}</b>
            </span>
            <br></br>
            <button className="styled_button" onClick={addFavAnime}>
              add
            </button>
            <button className="styled_button" onClick={handleResetSelection}>
              cancel
            </button>
          </>
        )}
        <br></br>
        <button className="styled_button" onClick={handleCancel}>
          go back
        </button>
      </div>
      <div class="animes_container">
        {loading
          ? "loading"
          : baseline["result"]
              .filter((anime) => {
                return search.toLowerCase() === ""
                  ? anime.title
                  : anime.title.toLowerCase().includes(search.toLowerCase());
              })
              .slice(0, 50)
              .map((anime) => (
                <AnimeBox
                  onClick={handleClick}
                  title={anime.title}
                  img_url={anime.img_url}
                  key={anime.title}
                />
              ))}
      </div>
    </>
  );
}
