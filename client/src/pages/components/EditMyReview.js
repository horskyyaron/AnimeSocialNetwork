import { useEffect, useState } from "react";
import axios from "axios";

import ReviewBox from "./ReviewBox.js";

export default function EditReviews({ onCancel }) {
    const profile = "-Melancholy-";

    const [refreshPage, setRefreshPage] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setRefreshPage(false);
        const controller = new AbortController();
        (async () => {
            setError(false);
            setLoading(true);
            try {
                const result = await axios.get(
                    ` http://localhost:8080/${profile}/get_reviews`,
                    { signal: controller.signal }
                ); //fetching data from server
                setReviews(result.data["reviews"]); //updating the jokes array state, which will rerender the component.
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
    }, [refreshPage]);

    const handleCancel = () => {
        onCancel();
    };

    const handleUpdate = async (text, score, rev_id) => {
        const result = await axios.post("http://localhost:8080/update_review", {
            text,
            score,
            rev_id,
        });
        setRefreshPage(true);
    };

    return (
        <>
            <h1>Edit Reviews</h1>
            <button onClick={handleCancel} className="styled_button">
                <span>go back</span>
            </button>
            <div className="reviews_container">
                {loading
                    ? "loading..."
                    : reviews.map((r) => {
                        return (
                            <ReviewBox
                                profile={r.profile}
                                rev_id={r.rev_id}
                                title={r.title}
                                img_url={r.img_url}
                                score={r.score}
                                rev_text={r.text}
                                updateDb={handleUpdate}
                            />
                        );
                    })}
            </div>
        </>
    );
}
