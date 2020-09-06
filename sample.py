import sqlite3

DATABASE_PATH = 'expense.db'

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

def create_tables():
    create_admin_table = """
        CREATE TABLE IF NOT EXISTS admin(
            admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            PASSWORD TEXT
        )
    """
    create_expense_table = """
        CREATE TABLE IF NOT EXISTS expense(
            expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            paid INTEGER,
            price INTEGER,
            date DATE
        )
    """
    conn = create_connection(DATABASE_PATH)
    c = conn.cursor()
    c.execute(create_admin_table)
    c.execute(create_expense_table)
    conn.close()

def admin(data):
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    query = """
        SELECT * FROM admin WHERE username = ? AND password = ?
    """
    c = conn.cursor()
    data = c.execute(query, (data['email'], data['password'])).fetchone()
    if data is None:
        print(1)
        # do something
    else:
        print(1)
        # do something
    conn.close()

def add_expense(data):
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    query = """
        INSERT INTO expense(name, paid, price, date) VALUES (?, ?, ?, ?)
    """
    c = conn.cursor()
    data = c.execute(query, (data['name'], data['paid'], data['price'], data['dob']))
    conn.commit()
    conn.close()
    return #do something



def home(mysql,data):
    conn = create_connection(DATABASE_PATH)
    conn.row_factory = dict_factory
    data_query = 'SELECT * FROM expense'
    c = conn.cursor()
    data = c.execute(data_query).fetchall()
    print(data)
    adi = 'SELECT SUM(price) as sum FROM expense WHERE paid = 1'
    adi_sum = c.execute(adi).fetchone()
    if adi_sum is None:
        adi_sum=0
    else:
        adi_sum = adi_sum['sum']
    amey ='SELECT SUM(price) as sum FROM expense WHERE paid = 2'
    amey_sum = c.execute(amey).fetchone()
    if amey_sum is None:
        amey_sum=0
    else:
        amey_sum = amey_sum['sum']
    abhi = 'SELECT SUM(price) as sum FROM expense WHERE paid = 3'
    abhi_sum = c.execute(abhi).fetchone()
    if abhi_sum is None:
        abhi_sum=0
    else:
        abhi_sum = abhi_sum['sum']
    ani = 'SELECT SUM(price) as sum FROM expense WHERE paid = 4'
    ani_sum = c.execute(ani).fetchone()
    if ani_sum is None:
        ani_sum=0
    else:
        ani_sum = ani_sum['sum']
    conn.close()
    response = { 'expense':data,
        'adi_sum':int(adi_sum),
        'amey_sum':int(amey_sum),
        'abhi_sum':int(abhi_sum),
        'ani_sum':int(ani_sum)}
    return response

conn = create_connection(DATABASE_PATH)
create_tables()
conn.close()