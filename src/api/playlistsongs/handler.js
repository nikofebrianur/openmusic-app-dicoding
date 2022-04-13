class PlaylistSongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
        this.getSongInPlaylistHandler = this.getSongInPlaylistHandler.bind(this);
        this.deleteSongInPlaylistByIdHandler = this.deleteSongInPlaylistByIdHandler.bind(this);
    }

    async postSongToPlaylistHandler(request, h) {
        this._validator.validatePlaylistSongPayload(request.payload);

        const { songId } = request.payload;
        const { id: playlistId } = request.params;

        const playlistsongsId = await this._service.addSongToPlaylist({ playlistId, songId });

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan ke playlist',
            data: {
                playlistsongsId,
            },
        });
        response.code(201);
        return response;
    }

    async getSongInPlaylistHandler(request, h) {
        const { id: playlistId } = request.params;
        const songs = await this.service.getPlaylists(playlistId);

        const response = h.response({
            status: 'success',
            data: {
              songs,
            },
          });
          response.code(200);
          return response;
    }

    async deleteSongInPlaylistByIdHandler(request, h) {
        const { playlistId } = request.params;
        const { songId } = request.payload;

        const playlistsongsId = await this._service.deleteSongInPlaylistById(playlistId, songId);

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil dihapus dari playlist',
            data: {
              playlistsongsId,
            },
          });
          response.code(200);
          return response;
    }
}

module.exports = PlaylistSongsHandler;
