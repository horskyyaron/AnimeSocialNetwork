# Anime social network

This is a project which is part of the course "DB workshop" in BIU.

Our project is a social network website which interacts with a relational databse (mySQL).

click here to download the starting point datasets for the database [download](https://drive.google.com/file/d/1pT_Y2e1xh0EWlWXCO6jhiBVjKjWvM1Ww/view?usp=share_link)

## database setup

* download the tables data (link above).
* place the tables csv file in the folder ***./website/backend/tables_csv/***
* have mySql server installed locally and running.
* in the file ***./website/backend/globals.py*** enter your db credentials (you should change only the password, leave the rest as is)
* run ***./website/backend/run*** script to:

    1. create 'anime' databse.
    2. create the database tables.
    3. upload the data to the tables.

* if needed to delete tables, run the file ***./website/backend/clean*** script. this will delete all tables. (you can always run the ***'run'*** script to upload the data again)
