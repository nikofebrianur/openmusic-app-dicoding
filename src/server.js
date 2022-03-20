const Hapi = require('@hapi/hapi');
const openMusic = require('./api/open-music/');
const AlbumService = require('./api/services/inMemory/AlbumService');

const init = async () => {
  const albumService = new AlbumService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: openMusic,
    options: {
      service: albumService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
