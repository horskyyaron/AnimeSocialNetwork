import "./anime_form.css";
import { useEffect, useState } from "react";
import axios from "axios";

// export default function AddAnimeForm({ genres, onAnimeAdd }) {
export default function AddAnimeForm({ genres }) {
  const [shouldCheckAnime, setShouldAnimeCheck] = useState(false);
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
        const result = await axios.get(
          `http://localhost:8080/${anime_name}/is_exists`
        );
        if (result.data["result"] > 0) {
          console.log("anime exits!");
        } else {
          console.log("new anime!!!");
        }
      })();
      setShouldAnimeCheck(false);
    } else {
      console.log("use effect: not checking anime");
    }
  }, [shouldCheckAnime]);

  // checks the input of the form before submitting
  const isInputOk = async () => {
    // const is_exists = await axios.get(
    //   `http:localhost:8080/${anime_name}/is_exists`
    // );
    // console.log("is_exits", is_exists.data);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShouldAnimeCheck(true);
    // console.log(isInputOk());
    // if (await isInputOk()) {
    //   console.log("good! making post setEpisodes");
    // const result = await axios.post("http://localhost:8080/add_anime", {
    //   anime_name,
    //   summary,
    //   aired_date,
    //   end_date,
    //   episodes,
    //   img_url,
    //   anime_genres: anime_genres.filter((g) => {
    //     if (g != "none") {
    //       return g;
    //     }
    //   }),
    // });
    // console.log(result);
    // } else {
    //   console.log("bad, see errors.");
    // }
  };

  const handleGenreChange = (e) => {
    console.log(anime_genres);
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
              onChange={(e) => setAnimeName(e.target.value)}
            />
          </li>
          <li>
            <label>anime summary:</label>
            <textarea
              onChange={(e) => setSummary(e.target.value)}
              placeholder=""
              maxLength="3000"
              minLength="20"
            ></textarea>
          </li>
          <li>
            <label>aired date:</label>
            <input
              type="date"
              placeholder=""
              onChange={(e) => setAiredDate(e.target.value)}
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
            />
          </li>
          <li>
            <label>picture url</label>
            <input type="text" onChange={(e) => setImgUrl(e.target.value)} />
          </li>
          <li>
            <label>Anime genre (can choose multiple)</label>
            <select name="genre1" id="pet-select1" onChange={handleGenreChange}>
              <option value="none">none</option>
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
        <button type="submit">Add anime</button>
      </form>
    </div>
  );
}
