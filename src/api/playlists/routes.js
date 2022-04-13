const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: handler.postPlaylistByOwnerHandler,
        options: {
            auth: 'openmusicsapp_jwt',
          },
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: handler.getPlaylistByOwnerHandler,
        options: {
            auth: 'openmusicsapp_jwt',
          },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}',
        handler: handler.deletePlaylistByOwnerHandler,
        options: {
            auth: 'openmusicsapp_jwt',
          },
    },
];

module.exports = routes;
