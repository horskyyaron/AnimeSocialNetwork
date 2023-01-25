import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Anime({ title, summary, img_url, episodes }) {
  return (
    <div className="anime">
      <h4 className="title">{title}</h4>
      <p>number of episodes: {episodes}</p>
      <img src={img_url} alt="" />
      <p className="summary">{summary}</p>
    </div>
  );
}
