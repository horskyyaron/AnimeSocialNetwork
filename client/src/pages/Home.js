import React, { useEffect, useState } from "react";
// import "./SearchBar.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Anime from "../Components/Anime";
import User from "../Components/User";
import { Link } from "react-router-dom";
import Review from "../Components/Review";
import "./home.css";
import { useFetch } from "./utils.js";

export default function Home() {
  const [anime, setAnime] = useState("");
  const [user, setUser] = useState("");
  const [animeDetails, setAnimeDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [topAnimes, setTopAnimes] = useState([]);

  const [topUsers, loading, error] = useFetch(
    "http://localhost:8080/active_users"
  );

  const [genresStatistics, loading2, error2] = useFetch(
    "http://localhost:8080/get_total_animes_in_genres"
  );

  const animeErrorMessage = "Anime doesnt exist";
  const userErrorMessasge = "User doesnt exist";

  useEffect(() => {
    fetch("http://localhost:8080/top_animes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopAnimes(data);
      });
  }, []);

  const notifyOnAnime = () => toast(animeErrorMessage);
  const notifyOnUser = () => toast(userErrorMessasge);

  const handleAnimeSearch = () => {
    Axios.post("http://localhost:8080/anime", {
      animeName: anime,
    }).then((response) => {
      if (response.data != "") {
        setAnimeDetails(response.data);
      } else {
        console.log("empty");
        clear();
        notifyOnAnime();
      }
    });
  };

  const handleUserSearch = () => {
    Axios.post("http://localhost:8080/user", {
      username: user,
    }).then((response) => {
      if (response.data != "") {
        setUserDetails(response.data);
      } else {
        console.log("empty");
        clear();
        notifyOnUser();
      }
    });
  };

  const clear = () => {
    setAnimeDetails([]);
    setUserDetails([]);
    setAnime("");
    setUser("");
  };

  if (animeDetails.length > 0) {
    return (
      <div>
        <Anime
          title={animeDetails[0].title}
          summary={animeDetails[0].summary}
          img_url={animeDetails[0].img_url}
          episodes={animeDetails[0].episodes}
        ></Anime>
        <button onClick={clear}>Search Another</button>
      </div>
    );
  } else if (userDetails.length > 0) {
    return (
      <div>
        <button onClick={clear}>Go back</button>
        <User
          username={user}
          favorites_animes={userDetails[0]}
          reviews={userDetails[1]}
        ></User>
      </div>
    );
  } else {
    return (
      <div>
        <div className="animeSearch">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="Enter Anime"
              onChange={(e) => setAnime(e.target.value)}
              value={anime}
              required
            />
            <div>
              <button onClick={handleAnimeSearch}>Search</button>
              <button onClick={clear}>Clear</button>
              <ToastContainer />
            </div>
          </div>
        </div>

        <br></br>

        <div className="userSearch">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="Enter User"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <div>
              <button onClick={handleUserSearch}>Search</button>
              <button onClick={clear}>Clear</button>
              <h2>Top 5 animes</h2>
              <div className="top_animes">
                {topAnimes &&
                  topAnimes.map((anime) => (
                    <div className="top_anime">
                      <Anime
                        title={anime.title}
                        summary={anime.summary}
                        img_url={anime.img_url}
                        key={anime.title}
                      />
                    </div>
                  ))}
              </div>
              <h2>Top 10 most Active useres</h2>
              <div className="top_animes">
                {topUsers &&
                  topUsers.map((user) => (
                    <div className="top_anime">
                      <label>{user.profile}</label>
                      <span>
                        reviews: <b>{user.num_of_reviews}</b>
                      </span>
                    </div>
                  ))}
              </div>
              <h2>Anime Genres Statistics</h2>
              <div className="top_animes">
                <br />
                {genresStatistics &&
                  genresStatistics.map((g) => (
                    <div className="top_anime">
                      <label>{g.genre_name}</label>
                      <label>{g.total_animes}</label>
                    </div>
                  ))}
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
