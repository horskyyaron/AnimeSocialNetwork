import mysql.connector
from globals import *
import time

DB_NAME = "anime"

def is_db_exists(mycursor, db_name):
    mycursor.execute(f"show databases like '{db_name}'")
    res = mycursor.fetchone()
    return res


print("\nconnecting to database...")
conn = mysql.connector.connect(
    host=HOST, user=USER, password=PASSWORD
)
print("connected!")

mycursor = conn.cursor()

print("creating/checking database\n++++++++++++++++++++++++++++++")
if is_db_exists(mycursor, DB_NAME):
    print("[anime] db exits!")
else:
    mycursor.execute(f"CREATE DATABASE {DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
    conn.commit()
    print("[anime] db created!")
    conn.commit()
print("++++++++++++++++++++++++++++++")
print("done")

mycursor.close()
conn.close()
