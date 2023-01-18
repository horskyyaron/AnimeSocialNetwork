import mysql.connector
from mysql.connector import cursor
from globals import *

def is_table_exits(mycursor, table_name):
    mycursor.execute(f"show tables like '{table_name}'")
    res = mycursor.fetchone()
    return res

print("\nconnecting to database...")
conn = mysql.connector.connect(
    host=HOST, user=USER, password=PASSWORD, database=DATABASE
)
print("connected!")

cursor = conn.cursor()

print("dropping tables\n++++++++++++++++++++++++++++++")
for table in TABLES:
    if not is_table_exits(cursor, table):
        print(f"{f'[{table}]':20} {'doesnt exists'}")
        continue
    cursor.execute(f"drop table {table}")
    print(f"{f'[{table}]':20} {'dropped!'}")

print("++++++++++++++++++++++++++++++")
print("done")
cursor.close()
conn.close()
