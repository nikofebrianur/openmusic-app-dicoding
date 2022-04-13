const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: handler.postSongToPlaylistHandler,
        options: {
            auth: 'openmusicsapp_jwt',
          },
    },
    {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: handler.getSongInPlaylistHandler,
        options: {
            auth: 'openmusicsapp_jwt',
          },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}/songs',
        handler: handler.deleteSongInPlaylistByIdHandler,
        options: {
            auth: 'openmusicsapp_jwt',
          },
    },
];

module.exports = routes;
