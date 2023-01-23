import { useEffect, useState } from "react";
import axios from "axios";

import ReviewBox from "./ReviewBox.js";

export default function EditMyReview({ onCancel }) {
  const profile = "Crystal";

  const [reviews, error, loading] = useFetch(
    `http://localhost:8080/${profile}/get_reviews`
  );

  if (!loading) {
    console.log(reviews["reviews"]);
  }

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <h1>Edit Reviews</h1>
      <button onClick={handleCancel}>go back</button>
      <div className="reviews_container">
        {loading
          ? "loading..."
          : reviews["reviews"].map((r) => {
              return (
                <ReviewBox
                  profile={r.profile}
                  rev_id={r.rev_id}
                  title={r.title}
                  img_url={r.img_url}
                  score={r.score}
                  rev_text={r.text}
                />
              );
            })}
      </div>
    </>
  );

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
}
