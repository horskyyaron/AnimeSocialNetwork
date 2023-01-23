import { useState, useEffect } from "react";
import axios from "axios";
import "./review_box.css";

export default function ReviewBox({ profile, rev_id, title, img_url, score, rev_text }) {
  const [edit_dialog, setEditDialog] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [rev_update_text, setRevUpdateText] = useState(rev_text);
  const [rev_update_score, setRevUpdateScore] = useState(score);

  const handleEdit = () => {
    setEditDialog(true);
  };

  const handleCancel = () => {
    setRevUpdateText(rev_text);
    setRevUpdateScore(score);
    setEditDialog(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldUpdate(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      console.log("should update");
      updateReviewInDb();
    }
  }, [shouldUpdate]);

  const updateReviewInDb = async (id) => {
    console.log("sending to db");

    const result = await axios.post("http://localhost:8080/update_review", {
      rev_id,
      rev_update_score,
      rev_update_text,
    });
  };

  if (!edit_dialog) {
    return (
      <div className="review_box">
        <div className="left">
          <h3>{title}</h3>
          <div className="img_container">
            <img src={img_url} alt="" />
          </div>
          <label for="">You gave a score of: {score}</label>
        </div>
        <div class="right">
          <div className="review">{rev_text}</div>
          <button onClick={handleEdit}>
            <span>edit review</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="edit_review">
        <form onSubmit={handleSubmit} className="edit_rev_form">
          <h3>review:</h3>
          <textarea
            onChange={(e) => setRevUpdateText(e.target.value)}
            placeholder=""
            maxLength="100000"
            minLength="20"
            required
            value={rev_update_text}
          ></textarea>
          <h3>score:</h3>
          <input
            type="number"
            min="1"
            max="10"
            defaultValue={score}
            onChange={(e) => setRevUpdateScore(e.target.value)}
          ></input>
          <button type="submit">save</button>
          <button onClick={handleCancel}>cancel</button>
        </form>
      </div>
    );
  }
}
