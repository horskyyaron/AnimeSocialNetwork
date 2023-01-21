# Anime social network

This project is a part of the course "DB workshop" in BIU.

Our project is a social network website which interacts with a relational databse (mySQL).

click here to download the baseline datasets for the database ->
[download baseline](https://drive.google.com/file/d/1OgjJUHvraAnlAcdNIzzJwqL0UDWqDDTY/view?usp=share_link)

## database setup

* download the tables data (link above).
* place the tables 'csv' files in the folder ***./website/backend/tables_csv/***
* have mySql server installed locally and running.
* in the file ***./website/backend/globals.py*** enter your db credentials.
* run ***./website/backend/run*** script to:

    1. create 'anime' databse.
    2. create the database tables.
    3. upload to the database. 

* if you want to reset the tables back to baseline, run the file ***./website/backend/reset*** script. 
* a ***./website/backend/clean*** script is also provided, this script will delete all the data in the tables.
