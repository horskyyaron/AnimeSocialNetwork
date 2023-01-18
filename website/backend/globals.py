# Database credentials
USER = "root"
PASSWORD = "secret"
HOST = "localhost"
DATABASE = "anime"

# tables information
ANIME_GENRE = "anime_genre"
ANIME_GENRE_HEADER = "(anime_id, genre_name) "
ANIME_GENRE_HEADER_TYPES = ["int", "str"]
ANIME_GENRE_QUERY = """CREATE TABLE anime_genre (
    anime_id INT,
    genre_name VARCHAR(255)
); 
"""

ANIMES = "animes"
ANIMES_HEADER = "(uid, title, summary, aired, ended, episodes, img_url) "
ANIMES_HEADER_TYPES = ["int", "str", "str", "str", "str", "int", "str"]
ANIMES_QUERY = """CREATE TABLE animes (
    uid INT,
    title VARCHAR(500),
    summary TEXT,
    aired DATE,
    ended DATE,
    episodes INT,
    img_url VARCHAR(255)
);
"""


FAVS = "favorites"
FAVS_HEADER = "(profile_id, fav_anime_id) "
FAVS_HEADER_TYPES = ["int", "int"]
FAVS_QUERY = """CREATE TABLE favorites (
    profile_id INT,
    fav_anime_id INT
); 
"""


PROFILES = "profiles"
PROFILES_HEADER = "(id, profile_name, password, gender, birthday) "
PROFILES_HEADER_TYPES = ["int", "str", "str", "str", "str"]
PROFILES_QUERY = """CREATE TABLE profiles (
    id INT,
    profile_name VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(255),
    birthday DATE
); 
"""

REVIEWS = "reviews"
REVIEWS_HEADER = "(uid, profile, anime_uid, text, score) "
REVIEWS_HEADERS_TYPES = ["int", "str", "int", "str", "int"]
REVIEWS_QUERY = """CREATE TABLE reviews (
    uid INT,
    profile VARCHAR(255),
    anime_uid INT,
    text TEXT,
    score INT
); 
"""

TABLES = {
    ANIME_GENRE: [ANIME_GENRE_HEADER, ANIME_GENRE_HEADER_TYPES, ANIME_GENRE_QUERY],
    ANIMES: [ANIMES_HEADER, ANIMES_HEADER_TYPES, ANIMES_QUERY],
    FAVS: [FAVS_HEADER, FAVS_HEADER_TYPES, FAVS_QUERY],
    PROFILES: [PROFILES_HEADER, PROFILES_HEADER_TYPES, PROFILES_QUERY],
    REVIEWS: [REVIEWS_HEADER, REVIEWS_HEADERS_TYPES, REVIEWS_QUERY],
}
