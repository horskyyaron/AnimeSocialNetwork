import mysql.connector
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

mycursor = conn.cursor()

print("creating/checking tables\n++++++++++++++++++++++++++++++")
for table in TABLES:
    if is_table_exits(mycursor, table):
        print(f"{f'[{table}]':20} {'already exits'}")
        continue
    mycursor.execute(TABLES[table][2])
    print(f"{f'[{table}]':20} {'created!'}")
print("++++++++++++++++++++++++++++++")
print("done")
