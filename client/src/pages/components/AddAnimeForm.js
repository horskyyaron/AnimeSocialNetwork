import "./anime_form.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { color } from "@mui/system";

// export default function AddAnimeForm({ genres, onAnimeAdd }) {
export default function AddAnimeForm({ genres, onSubmitNewAnime }) {
  const [shouldCheckAnime, setShouldAnimeCheck] = useState(false);
  const [anime_exists, setAnimeExists] = useState(false);
  const [anime_name, setAnimeName] = useState("");
  const [summary, setSummary] = useState("");
  const [aired_date, setAiredDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [anime_genres, setAnimeGenres] = useState([
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ]);

  useEffect(() => {
    if (shouldCheckAnime) {
      (async () => {
        let is_exits = false;
        let is_dates_ok = false;
        const result = await axios.get(
          `http://localhost:8080/${anime_name}/is_exists`
        );
        if (result.data["result"] > 0) {
          is_exits = true;
          console.log("anime exits!");
          setAnimeExists(true);
          return;
        } else {
          console.log("new anime!!!");
        }
        if (end_date == "") {
          is_dates_ok = Date.parse(Date()) >= Date.parse(aired_date);
        } else {
          is_dates_ok = Date.parse(aired_date) < Date.parse(end_date);
        }

        console.log("dates ok:", is_dates_ok, "anime exits:", is_exits);
        if (!is_exits && is_dates_ok) {
          console.log("can add this anime");
          const last_id = await axios.get(
            `http://localhost:8080/profiles/last_id`
          );
          const new_id = last_id.data.last_id + 1;
          post_new_anime(new_id);
        } else {
          console.log("can't add this anime");
        }
      })();
    } else {
      console.log("use effect: not checking anime");
    }
    setShouldAnimeCheck(false);
  }, [shouldCheckAnime]);

  const post_new_anime = async (id) => {
    const result_add_anime = await axios.post(
      "http://localhost:8080/add_anime",
      {
        anime_name,
        summary,
        aired_date,
        end_date: end_date ? end_date : "NULL",
        episodes,
        img_url,
        id,
      }
    );

    const result_add_anime_genres = await axios.post(
      "http://localhost:8080/update_genres",
      {
        anime_id: id,
        anime_genres: [...new Set(anime_genres)].filter((g) => {
          if (g != "none") {
            return g;
          }
        }),
      }
    );

    onSubmitNewAnime();
  };
  const cancelAddNewAnimeForm = () => {
    onSubmitNewAnime();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShouldAnimeCheck(true);
    // console.log(isInputOk());
    // if (await isInputOk()) {
    //   console.log("good! making post setEpisodes");
  };

  const handleGenreChange = (e) => {
    const i = parseInt(e.target.name.slice(-1));
    const copy = [...anime_genres];
    copy[i - 1] = e.target.value;
    setAnimeGenres(copy);
  };

  return (
    <div>
      <h1>Add anime</h1>
      <form onSubmit={handleSubmit} className="anime_form">
        <ul>
          <li>
            <label>anime name:</label>
            <input
              type="text"
              id="anime_name"
              placeholder="anime name"
              onChange={(e) => {
                setAnimeName(e.target.value);
                setAnimeExists(false);
              }}
              required
            />
          </li>
          {anime_exists ? (
            <li style={{ color: "red" }}>
              <b>anime exists!</b>
            </li>
          ) : (
            ""
          )}
          <li>
            <label>anime summary:</label>
            <textarea
              onChange={(e) => setSummary(e.target.value)}
              placeholder=""
              maxLength="3000"
              minLength="20"
              required
            ></textarea>
          </li>
          <li>
            <label>aired date:</label>
            <input
              type="date"
              placeholder=""
              onChange={(e) => setAiredDate(e.target.value)}
              required
            />
          </li>
          <li>
            <label>ended date:(optianl)</label>
            <input
              type="date"
              placeholder=""
              onChange={(e) => setEndDate(e.target.value)}
            />
          </li>
          <li>
            <label>number of episodes:</label>
            <input
              type="number"
              minLength="1"
              maxLength="3000"
              onChange={(e) => setEpisodes(e.target.value)}
              required
            />
          </li>
          <li>
            <label>picture url</label>
            <input
              type="text"
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
          </li>
          <li>
            <label>Anime genre (as least one genre)</label>
            <select
              name="genre1"
              id="genre-select1"
              onChange={handleGenreChange}
              required
            >
              {genres.map((g) => (
                <option value={g.genre_name}>{g.genre_name}</option>
              ))}
            </select>
            <select
              name="genre2"
              id="genre-select2"
              onChange={handleGenreChange}
            >
              <option value="none">none</option>
              {genres.map((g) => (
                <option value={g.genre_name}>{g.genre_name}</option>
              ))}
            </select>
            <select
              name="genre3"
              id="genre-select3"
              onChange={handleGenreChange}
            >
              <option value="none">none</option>
              {genres.map((g) => (
                <option value={g.genre_name}>{g.genre_name}</option>
              ))}
            </select>
            <select
              name="genre4"
              id="genre-select4"
              onChange={handleGenreChange}
            >
              <option value="none">none</option>
              {genres.map((g) => (
                <option value={g.genre_name}>{g.genre_name}</option>
              ))}
            </select>
            <select
              name="genre5"
              id="genre-select5"
              onChange={handleGenreChange}
            >
              <option value="none">none</option>
              {genres.map((g) => (
                <option value={g.genre_name}>{g.genre_name}</option>
              ))}
            </select>
            <select
              name="genre6"
              id="genre-select6"
              onChange={handleGenreChange}
            >
              <option value="none">none</option>
              {genres.map((g) => (
                <option value={g.genre_name}>{g.genre_name}</option>
              ))}
            </select>
          </li>
        </ul>
        <button type="submit">Add new anime</button>
        <button onClick={cancelAddNewAnimeForm}>back</button>
      </form>
    </div>
  );
}
