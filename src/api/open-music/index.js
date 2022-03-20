const AlbumHandler = require('./albums/AlbumHandler');
const routes = require('./albums/routes');

module.exports = {
    name: 'album-handler',
    version: '1.0.0',
    register: async (server, { service }) => {
        const albumhandler = new AlbumHandler(service);
        server.route(routes(albumhandler));
    },
};
