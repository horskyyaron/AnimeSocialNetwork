import { useState, useEffect } from "react";
import axios from "axios";
import "./review_box.css";
import EditReviewBox from "./EditReviewBox";

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

    const handleEdit = () => {
        setEditDialog(true);
    };

    const handleUpdateRev = (new_score, new_text) => {
        updateDb(new_text, new_score, rev_id);
        setShouldUpdate(true);
    };

    useEffect(() => {
        if (shouldUpdate) {
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
            <EditReviewBox
                text={rev_text}
                score={score}
                onCancel={setEditDialog}
                onSubmitUpdate={handleUpdateRev}
            />
        );
    }
}
