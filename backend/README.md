### Installation
Use the npm to install all the packages:
```
npm install
```

### Database setup
To run the database, first set the MYSQL_ROOT_PASSWORD variable on the .env file:
```
MYSQL_ROOT_PASSWORD: example123
```

To start the database, use docker-compose and execute following command:
```
docker-compose up -d mysql
```

Run the migrations to create the database and his tables:
```
npx prisma migrate dev
```
Now that the database is configured you can execute the project.

### Usage
To execute the project:
```
npm run dev
```