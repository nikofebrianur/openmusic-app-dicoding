const AlbumHandler = require('./albums/AlbumHandler');
const SongHandler = require('./songs/SongHandler');

const albumRoutes = require('./albums/routes');
const songRoutes = require('./songs/routes');

module.exports = {
    name: 'album-handler',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const albumhandler = new AlbumHandler(service, validator);
        server.route(albumRoutes(albumhandler));
    },
    name: 'song-handler',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const songhandler = new SongHandler(service, validator);
        server.route(songRoutes(songhandler));
    },
};
