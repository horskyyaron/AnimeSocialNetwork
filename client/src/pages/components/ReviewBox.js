import { useState, useEffect } from "react";
import axios from "axios";
import "./review_box.css";

export default function ReviewBox({
  profile,
  rev_id,
  title,
  img_url,
  score,
  rev_text,
  updateDb,
}) {
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
  const handleEditReviewSubmit = (e) => {
    e.preventDefault();
    setShouldUpdate(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      updateDb(rev_update_text, rev_update_score, rev_id);
      setEditDialog(false);
    }
  }, [shouldUpdate]);

  if (!edit_dialog) {
    console.log("original score" + score);
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
        <form onSubmit={handleEditReviewSubmit} className="edit_rev_form">
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
