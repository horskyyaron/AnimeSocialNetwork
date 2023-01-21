import { useState, useEffect } from "react";
import axios from "axios";
import FavAnime from "./components/FavAnime.js";
import "./MyProfile.css";

export default function MyProfile() {
  const id = 207;

  const [fav_animes, error, loading] = useFetch(
    `http://localhost:8080/${id}/fav_animes`
  );
  const [user_name, error2, loading2] = useFetch(
    `http://localhost:8080/profile/${id}`
  );

  return (
    <>
      <nav className="my_profile_navbar">
        <div className="container">
          <div className="user_name">
            {loading2 ? (
              <h1>loading...</h1>
            ) : (
              <h1>{user_name[0].profile_name}</h1>
            )}
          </div>
          <ul>
            <li>#Reviews</li>
            <li>#liked animes</li>
            <li>#top-anime-liked</li>
          </ul>
        </div>
      </nav>
      <div className="interactive_section">
        <div className="container">
          <ul>
            <li>
              <button className="add_rev">add review</button>
            </li>
            <li>
              <button className="add_anime">add anime</button>
            </li>
          </ul>
          <div className="latest_review">
            Elit libero repudiandae nostrum quidem natus Nesciunt commodi optio
            animi est cupiditate Perferendis corrupti quas cumque quidem quaerat
            aut Possimus commodi amet doloribus fuga enim A aliquam dicta quas
            maiores.
          </div>
        </div>
      </div>
      <h1>Favorite animes</h1>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="fav_animes_container">
          {fav_animes.map((anime) => (
            <FavAnime
              title={anime.title}
              img_url={anime.img_url}
              key={anime.title}
            />
          ))}
        </div>
      )}
    </>
  );
}

function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setError(false);
      // setLoading(true);
      try {
        const result = await axios.get(url, { signal: controller.signal }); //fetching data from server
        setData(result.data); //updating the jokes array state, which will rerender the component.
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError(true);
      }
      setLoading(false);

      //cleanup
      return () => {
        controller.abort();
      };
    })(); // IIFE
  }, []);
  return [data, error, loading];
}
