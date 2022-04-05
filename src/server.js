require('dotenv').config();

const Hapi = require('@hapi/hapi');
const openMusic = require('./api/open-music/');
const AlbumService = require('./services/inMemory/AlbumService');
const SongService = require('./services/inMemory/SongService');
const Validator = require('./validator/open-music');

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: openMusic,
    options: {
      service: [ albumService, songService ],
      validator: Validator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
