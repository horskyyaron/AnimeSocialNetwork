import { useFetch } from "../utils.js";
import { useState } from "react";
export default function AnimeSearchOption({ anime_name, onSelect }) {
  const handleClick = () => {
    onSelect(anime_name);
  };

  return <button onClick={handleClick}>{anime_name}</button>;
}
