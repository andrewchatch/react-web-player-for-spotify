# React Web Player for Spotify

This app is a clone of the Spotify Web Player built using a React frontend and an Node.js/Express backend for authentication. 

## Using this app:

First, you can clone the project directory from 'https://github.com/andrewchatch/react-web-player-for-spotify.git' or by using the GitHub CLI:

`gh repo clone andrewchatch/react-web-player-for-spotify`

Once the directory is cloned locally, please install the required dependencies using `npm install`. 

Additionally, you will need to create a new project on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login) and store the client id and client secret in a .env file in the backend folder. Store the environment variables as SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET, respectively. You can learn more about this process [here](https://developer.spotify.com/documentation/web-playback-sdk/)

You will also need to create a MongoDB database by following the steps [here](https://www.mongodb.com/basics/create-database) and store the connection URI as MONGODB_CONNECT_URI in the .env file.

Once finished with the above steps, you can run the app using npm:

`npm start`

Runs the front and back end using [concurrently](https://www.npmjs.com/package/concurrently).

Open [http://localhost:3000](http://localhost:3000) to view the application. (The backend runs on port 8000 by default).

## Project Intent

I built this project to further develop my skills in full-stack development. I am passionate about music and use the Spotify app on a daily basis, so I thought it would be fun to work with the Spotify API and try to re-create the web player interface.

## Dependencies Used

This app is built using the following dependencies:

### Back-end

- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [axios](https://www.npmjs.com/package/axios)
- [passport](https://www.npmjs.com/package/passport)
- [passport-oauth2-refresh](https://www.npmjs.com/package/passport-oauth2-refresh)
- [passport-spotify](https://www.npmjs.com/package/passport-spotify)

### Front-end

- [React](https://reactjs.org/)
- [Font Awesome](https://fontawesome.com/icons)
- [Axios](https://www.npmjs.com/package/axios)
- [Bootstrap](https://getbootstrap.com/)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [JQuery](https://jquery.com/)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
