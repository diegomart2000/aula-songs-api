# aula-songs-api
Basic Songs API for serving static files and manage songs metadata

## Installation

Clone this repo and run:

```npm install```

For env configuration, create a `.env` file with following variables:

```
HOST=localhost
PORT=3000

MEDIA_BASE_PATH=_ROUTE_TO_MEDIA_FILES_
BACKEND_URL=http://localhost:3000
CLIENT_BASE_URL=http://localhost:8080

DATABASE_URL=_YOUR_MONGO_DB_URL_
REDIS_URL=_YOUR_REDIS_URL_
```

## API Reference

### Media
`GET` `/api/media/:id`

To get a song mp3 file for a given id

*Response*

```
Binary stream
```

### Song
`GET` `/api/song`
To get a paginated list of songs

*Query String*
```
page: Number
```

*Response*
```
{
  _id: ObjectId,
  ownerId: ObjectId,
  title: String,
  album: String,
  artist: String,
  length: Number
}
```


## The stack
It's a Node / Express App using MongoDb for persistence and Redis as key store.

Database mappings and schemas are modeled with Mongoose.

*The Backend is architected in 3 layers:*

### Routers
Build on top of express and using session and middlewares to do authorization.

### Services
Implementing Cache and Models integration. It relays on cache for fetch operations, if there is a hit, the model is hydrated and passed along. On miss, the model is fetched from the DB.

In case of data updates, updates are triggered to the DB and the cache is updated to reflect the new status.

### Models
Abstracting the access to db using Mongoose to take advantage of Scheme definition and Validations.

## To improve

### Static files
1. Move static files to a cdn and add the url slug to Song Models
2. Use Passport and JWT for authentication and authorization
