import React, { useState } from "react";

export default function Review({ animeTitle, reviewText, img_url, score }) {
    return (
      <div className="review"
      style={
        {
         border: '2px solid black'
        }
      }>
        <h3>{animeTitle}</h3>
        <img src={img_url} alt="" />
        <h4>review:</h4>
        <p>{reviewText}</p>
        <h4>final score: {score}</h4>
      </div>
    );
  }
  