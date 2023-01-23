import { useState } from "react";
export default function EditReviewBox({
    text,
    score,
    onCancel,
    onSubmitUpdate,
}) {
    const [rev_update_text, setRevUpdateText] = useState(text);
    const [rev_update_score, setRevUpdateScore] = useState(score);

    const handleCancel = () => {
        setRevUpdateText(text);
        setRevUpdateScore(score);
        onCancel(false);
    };

    const handleEditReviewSubmit = (e) => {
        e.preventDefault();
        onSubmitUpdate(rev_update_score, rev_update_text);
    };
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
                <div class="edit_rev_buttons">
                    <button type="submit" className="styled_button save">
                        <span>save</span>
                    </button>
                    <button onClick={handleCancel} className="styled_button cancel">
                        <span>cancel</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
