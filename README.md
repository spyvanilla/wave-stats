# Wave Stats
Analyse your wave status in spotify!

# How to run
In the root directory, create a ```credentials.json``` file and create the following values:

```SECRET_KEY``` - Any value you want, but is recommended to generate one with a safe method

```REDIS_HOST``` - The url of the redis instance you're using

```REDIS_PASSWORD``` - The password of the redis instance you're using

```REDIS_PORT``` - The port of the redis instance you're using

To get the following values, you need to follow the steps to create an app in the spotify dashboard - https://developer.spotify.com/documentation/web-api/quick-start/

```CLIENT_ID``` - The public client id of the spotify app you created

```CLIENT_SECRET``` - The secret key of the spotify app you created

```REDIRECT_URI``` - ```localhost:3000```

```SCOPES``` - The scopes of the spotify app you created (fill at least these - ```user-read-currently-playing user-read-recently-played user-top-read user-library-read```)
