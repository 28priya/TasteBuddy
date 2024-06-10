from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuration for MySQL
db_config = {
    'user': 'Priyanshi2829',
    'password': 'Priyanshi@28',
    'host': 'localhost',
    'database': 'tastebuddy_db'
}

# Function to connect to MySQL
def get_db_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

# Fetch all recipes from the database
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM recipes')
    recipes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(recipes)

# Serve the explore page
@app.route('/')
def explore():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM recipes')
    recipes = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('index.html', recipes=recipes)

if __name__ == '__main__':
    app.run(debug=True)
