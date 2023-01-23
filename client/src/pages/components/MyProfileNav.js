import { useState, useEffect } from "react";
import axios from 'axios'

export default function MyProfileNav({ id }) {
    const [user_name, error2, loading2] = useFetch(
        `http://localhost:8080/profile/${id}`
    );

    const [total_reviews, error4, loading4] = useFetch(
        `http://localhost:8080/${id}/num_of_reviews`
    );
    const [total_fav_animes, error5, loading5] = useFetch(
        `http://localhost:8080/${id}/count_fav_animes`
    );
    const [genres, error6, loading6] = useFetch(
        `http://localhost:8080/all_genres`
    );

    return (
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
                    <li>#Reviews: {loading4 ? "loading" : total_reviews[0].total}</li>
                    <li>
                        #Favorites animes:{" "}
                        {loading5 ? "loading" : total_fav_animes[0].total}
                    </li>
                </ul>
            </div>
        </nav>
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
