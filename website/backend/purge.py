import mysql.connector
from mysql.connector import cursor
from globals import *

conn = mysql.connector.connect(
    host=HOST, user=USER, password=PASSWORD, database=DATABASE
)
print("connected!")

cursor = conn.cursor()

print("deleting database\n++++++++++++++++++++++++++++++")
cursor.execute("DROP DATABASE " + DATABASE)
print(f"[{DATABASE}]: dropped.")
print("++++++++++++++++++++++++++++++")
print("done")
cursor.close()
conn.close()
