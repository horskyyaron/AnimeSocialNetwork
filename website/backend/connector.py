# -*- coding: utf-8 -*-
from mysql.connector import cursor
import pandas as pd
import numpy as np
import mysql.connector
from mysql.connector import errorcode
from globals import *

def calc_num_of_values(header):
    total = len(header.split(","))
    res = ""
    for i in range(0, total):
        res = res + "%s, "
    return res[: len(res) - 2]


def get_value(data_type, data):
    if (type(data) == float or type(data) == np.float64) and np.isnan(data):
        return None
    if data_type == "int":
        return int(data)
    elif data_type == "float":
        if np.isnan(data):
            return None
        return float(data)
    return str(data)


def create_values_tupple(row, table_name):
    header = TABLES[table_name][0]
    types = TABLES[table_name][1]
    total = len(header.split(","))
    values = tuple()
    for i in range(0, total):
        elem = get_value(types[i], row[i])
        temp = values + (elem,)
        values = temp
    return values


def upload_to_db(cursor, data_file, table_name):
    insert_query = (
        f"INSERT INTO {table_name}"
        f"{TABLES[table_name][0]}"
        f"VALUES ({calc_num_of_values(TABLES[table_name][0])})"
    )
    pdf = pd.read_csv(data_file)
    animes = []
    print(f"uploading data into table {table_name}...")
    for index, row in pdf.iterrows():
        if table_name == "animes" and row[0] in animes:
            continue
        animes.append(row[0])
        values = create_values_tupple(row, table_name)
        cursor.execute(insert_query, values)
    print("done")


def upload_table(table_name, data_file, cursor, conn):
    try:
        # query for uploading
        upload_to_db(
            cursor,
            data_file,
            table_name,
        )

        # Make sure data is committed to the database
        conn.commit()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)


def connect_to_db():
    try:
        print("connecting to database...")
        conn = mysql.connector.connect(
            user=USER, password=PASSWORD, host=HOST, database=DATABASE, use_unicode=True
        )
        print("connected!")

        cursor = conn.cursor()

        # ALTER DATABASE [database_name]
        # CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
        # Enforce UTF-8 for the connection.
        cursor.execute("SET NAMES utf8mb4")
        cursor.execute("SET CHARACTER SET utf8mb4")
        cursor.execute("SET character_set_connection=utf8mb4")

        return cursor, conn
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)


def close_connection(cursor, conn):
    # Make sure data is committed to the database
    cursor.close()
    conn.close()


cursor, conn = connect_to_db()

for table in TABLES:
    upload_table(table,f"./tables_csv/{table}.csv", cursor,conn)

# upload_table("anime_genre", "./tables_csv/anime_genre.csv", cursor, conn)
# upload_table("favorites", "./tables_csv/favorites.csv",cursor,conn)
# upload_table("genre_to_id", "./tables_csv/genre_to_id.csv",cursor,conn)
# upload_table("profiles_to_id", "./tables_csv/profile_to_id.csv",cursor,conn)
# upload_table("profiles", "./tables_csv/profiles.csv",cursor,conn)
# upload_table("anime_to_id", "./tables_csv/anime_to_id.csv",cursor,conn)
# upload_table("animes", "./tables_csv/animes.csv",cursor,conn)
# upload_table("reviews", "./tables_csv/reviews.csv",cursor,conn)
# close_connection(cursor, conn)
