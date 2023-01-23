import { useState, useEffect } from "react";
import axios from "axios";
import FavAnime from "./components/FavAnime.js";
import AddAnimeForm from "./components/AddAnimeForm.js";
import EditMyReview from "./components/EditMyReview.js";
import "./MyProfile.css";
import MyProfileNav from "./components/MyProfileNav.js";

export default function MyProfile() {
    const id = 310;

    const [anime_form, setAnimeForm] = useState(false);
    const [edit_form, setEditForm] = useState(false);

    const [fav_animes, error, loading] = useFetch(
        `http://localhost:8080/${id}/fav_animes`
    );

    const [most_recent_rev, error3, loading3] = useFetch(
        `http://localhost:8080/${id}/most_recent`
    );
    const [genres, error6, loading6] = useFetch(
        `http://localhost:8080/all_genres`
    );

    const handleAddAnimeButtonClicked = () => {
        setAnimeForm(true);
    };

    const handleEditMyReviewClicked = () => {
        setEditForm(true);
    };

    const handleNewAnimeSubmitted = () => {
        setAnimeForm(false);
    };
    const handleCancelEditReviews = () => {
        setEditForm(false);
    };

    if (!anime_form) {
        if (edit_form) {
            return <EditMyReview onCancel={handleCancelEditReviews} />;
        } else {
            return (
                <>
                    <MyProfileNav id={id} />
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
                                onClick={handleAddAnimeButtonClicked}
                                className="styled_button"
                            >
                                <span>add a new review</span>
                            </button>
                            <button
                                onClick={handleAddAnimeButtonClicked}
                                className="styled_button"
                            >
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
    } else {
        // return <AddAnimeForm genres={genres} onAnimeAdd={handleAnimeAddition} />;
        return (
            <AddAnimeForm
                genres={genres}
                onSubmitNewAnime={handleNewAnimeSubmitted}
            />
        );
    }
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
