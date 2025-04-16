import requests
import psycopg2
from datetime import datetime

# Database connection
def connect_db():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_db_user",
        password="your_db_password",
        host="your_db_host",
        port="your_db_port"
    )
    return conn

# Fetch data from external sources
def fetch_data():
    response = requests.get("https://api.example.com/data")
    data = response.json()
    return data

# Update the database with the fetched data
def update_database(data):
    conn = connect_db()
    cursor = conn.cursor()

    for item in data:
        # Update real_estate_objects table
        cursor.execute("""
            INSERT INTO real_estate_objects (name, address, purchase_date, purchase_price)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (name) DO UPDATE
            SET address = EXCLUDED.address,
                purchase_date = EXCLUDED.purchase_date,
                purchase_price = EXCLUDED.purchase_price
            RETURNING id
        """, (item['name'], item['address'], item['purchase_date'], item['purchase_price']))
        real_estate_object_id = cursor.fetchone()[0]

        # Update current_values table
        cursor.execute("""
            INSERT INTO current_values (real_estate_object_id, date, value)
            VALUES (%s, %s, %s)
            ON CONFLICT (real_estate_object_id, date) DO UPDATE
            SET value = EXCLUDED.value
        """, (real_estate_object_id, datetime.now().date(), item['current_value']))

        # Update income_from_rents table
        cursor.execute("""
            INSERT INTO income_from_rents (real_estate_object_id, date, income)
            VALUES (%s, %s, %s)
            ON CONFLICT (real_estate_object_id, date) DO UPDATE
            SET income = EXCLUDED.income
        """, (real_estate_object_id, datetime.now().date(), item['income_from_rents']))

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    data = fetch_data()
    update_database(data)
