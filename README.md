# LairBnB

### 1. Download / Clone the repository
- In the terminal, run ```git clone git@github.com:georgeeng89/LairBnB.git```


### 2. Install dependencies
- Run ```npm install``` in the terminal

### 3. Create the User
- In PostgreSQL, create a user: ```CREATE USER <username> WITH PASSWORD <password> CREATEDB LOGIN;```
- Make sure <password> is in quotes.

### 4. Setting up the environment.
- In the backend folder, create a ```.env``` file. 

- In the ```.env.``` file, set up the variables:

```PORT=5000
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=auth_db
DB_HOST=localhost
JWT_SECRET=
JWT_EXPIRES_IN=604800
```

- Fill in ```DB_USERNAME``` and ```DB_PASSWORD``` with the username and password you created in step 3. Create a secret for ```JWT_SECRET```.


### 5. Creating the Database, Migrating, and Seeding.
- Run ```npx dotenv sequelize db:create``` in the terminal to create the database.
- Run ```npx dotenv sequelize db:migrate``` to migrate the tables.
- Run ```npx dotenv sequelize db:seed:all``` to seed the database.

### 7. Starting the server.
- In the backend directory, run ```npm start``` in the terminal to start the backend, then in the frontend directory, run ```npm start``` in the terminal to start the frontend.

