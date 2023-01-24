import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import FavAnime from "../pages/components/FavAnime"
import Review from "./Review";

export default function User({username, favorites_animes, reviews}) { 

    return (
        <div className="user">
            <div>
                <h1>username: {username}</h1>
                <h2>Favorites Animes</h2>
                {favorites_animes.map((anime) => (
                    <FavAnime
                        img_url={anime.img_url}
                        title={anime.title}
                        key={anime.title}
                    />
                ))}
            </div>
            <div>
                <h2>Reviews</h2>
                {reviews.map((review) => (
                    <Review
                        img_url={review.img_url}
                        animeTitle={review.title}
                        reviewText={review.text}
                        score={review.score}
                        key={review.title} 
                    />
                ))}
            </div>
        </div>
    )
}
