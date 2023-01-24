import { useState, useEffect } from "react";
import { useFetch } from "./utils.js";
import FavAnime from "./components/FavAnime.js";
import AddAnimeForm from "./components/AddAnimeForm.js";
import EditMyReview from "./components/EditMyReview.js";
import MyProfileNav from "./components/MyProfileNav.js";
import AddReview from "./components/AddReview.js";
import AddAnimeToFav from "./components/AddAnimeToFav.js";
import "./MyProfile.css";

export default function MyProfile({ user_name, user_id }) {
  const [add_new_anime, setAddNewAnime] = useState(false);
  const [edit_reviews, setEditReviews] = useState(false);
  const [add_anime_to_fav, setAddAnimeToFav] = useState(false);
  const [add_review, setAddReview] = useState(false);
  const [added_new_anime_to_fav, setAddedNewAnimeToFav] = useState("");

  const [fav_animes, error, loading] = useFetch(
    `http://localhost:8080/${user_id}/fav_animes`,
    [added_new_anime_to_fav]
  );

  const [most_recent_rev, error3, loading3] = useFetch(
    `http://localhost:8080/${user_id}/most_recent`
  );
  const [genres, error6, loading6] = useFetch(
    `http://localhost:8080/all_genres`
  );

  const handleAddAnimeButtonClicked = () => {
    setAddNewAnime(true);
  };

  const handleEditMyReviewClicked = () => {
    setEditReviews(true);
  };

  const handleNewAnimeSubmitted = () => {
    setAddNewAnime(false);
  };
  const handleCancelEditReviews = () => {
    setEditReviews(false);
  };
  const handleAddNewReviewCancel = (value = true) => {
    setAddReview(value);
  };

  const handleAddNewReviewSent = () => {
    setAddReview(false);
  };
  const handleAddFavCancel = (value = true) => {
    //closing on cancel
    setAddAnimeToFav(value);
  };

  const handleAddToFav = (anime_name) => {
    //closing on add component.
    setAddedNewAnimeToFav(anime_name);
    setAddAnimeToFav(false);
  };

  if (add_anime_to_fav) {
    return (
      <AddAnimeToFav
        user_id={user_id}
        onCancel={handleAddFavCancel}
        onAdd={handleAddToFav}
      />
    );
  } else if (add_new_anime) {
    return (
      <AddAnimeForm
        genres={genres}
        onSubmitNewAnime={handleNewAnimeSubmitted}
      />
    );
  } else if (edit_reviews) {
    return <EditMyReview onCancel={handleCancelEditReviews} />;
  } else if (add_review) {
    return (
      <AddReview
        user_id={user_id}
        onAdd={handleAddNewReviewSent}
        onCancel={handleAddNewReviewCancel}
      />
    );
  } else {
    return (
      <>
        <MyProfileNav user_id={user_id} user_name={user_name} />
        <div className="interactive_section">
          <div className="container">
            <button
              className="styled_button"
              onClick={handleEditMyReviewClicked}
            >
              <span>edit my reviews</span>
            </button>
            <button
              onClick={handleAddAnimeButtonClicked}
              className="styled_button"
            >
              <span>Add an anime to the community</span>
            </button>
            <button
              onClick={handleAddNewReviewCancel}
              className="styled_button"
            >
              <span>add a new review</span>
            </button>
            <button onClick={handleAddFavCancel} className="styled_button">
              <span>add new anime to favorites</span>
            </button>
          </div>
          <div className="latest_review">
            <h3>most recent review: </h3>
            {loading3 ? (
              <h1>loading</h1>
            ) : (
              <div>
                <ul>
                  <li></li>
                  <li>
                    anime: <b>{most_recent_rev[0].title}</b>
                  </li>
                  <li>
                    <img src={most_recent_rev[0].img_url} alt="" />
                  </li>
                  <li>
                    <b>{most_recent_rev[0].text}</b>
                  </li>
                </ul>
              </div>
            )}
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
}
