const ClientError = require('../../exceptions/ClientError');

class PlaylistsHandler {
    constructor(playlistsService, playlistSongsService, songsService, validator) {
        this._playlistsService = playlistsService;
        this._playlistSongsService = playlistSongsService;
        this._songsService = songsService;
        this._validator = validator;

        this.postPlaylistByOwnerHandler = this.postPlaylistByOwnerHandler.bind(this);
        this.getPlaylistByOwnerHandler = this.getPlaylistByOwnerHandler.bind(this);
        this.deletePlaylistByOwnerHandler = this.deletePlaylistByOwnerHandler.bind(this);
        this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
        this.getSongInPlaylistHandler = this.getSongInPlaylistHandler.bind(this);
        this.deleteSongInPlaylistHandler = this.deleteSongInPlaylistHandler.bind(this);
    }

    async postPlaylistByOwnerHandler(request, h) {
        try {
            this._validator.validatePostPlaylistPayload(request.payload);

            const { name } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const playlistId = await this._playlistsService.addPlaylistByOwner({ name, owner: credentialId, });

            const response = h.response({
                status: 'success',
                message: 'Playlist berhasil ditambahkan',
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;

        }
    }

    async getPlaylistByOwnerHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const playlists = await this._playlistsService.getPlaylistByOwner(credentialId);

            const response = h.response({
                status: 'success',
                data: {
                    playlists,
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deletePlaylistByOwnerHandler(request, h) {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._playlistsService.verifyPlaylistOwner(id, credentialId);

            await this._playlistsService.deletePlaylistByOwner(id);

            const response = h.response({
                status: 'success',
                message: 'Playlist berhasil dihapus',
            });
            response.code(200);
            return response;

        } catch (error) {
            if (error instanceof ClientError) {

                const response = h.response({
                    status: 'fail',
                    message: 'Playlist gagal dihapus. Id tidak ditemukan',
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async postSongToPlaylistHandler(request, h) {
        try {
            this._validator.validatePostSongToPlaylistPayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { playlistId } = request.params;
            const { songId } = request.payload;

            await this._songsService.verifySongExist(songId);

            await this._playlistSongsService.addSongToPlaylist({ playlistId, songId, credentialId });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan ke playlist',
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: 'Lagu gagal ditambahkan ke playlist',
                });
                response.code(error.statusCode);
                return response;
                console.log(error)
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSongInPlaylistHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { playlistId } = request.params;

            const songsPlaylist = await this._playlistSongsService.getSongInPlaylist(
                playlistId, credentialId,
            );

            const response = h.response({
                status: 'success',
                message: 'Lagu dalam playlist berhasil didapatkan',
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {

                const response = h.response({
                    status: 'fail',
                    message: 'Playlist gagal didapatkan. Id tidak ditemukan',
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteSongInPlaylistHandler(request, h) {
        try {
            this._validator.validatePostSongToPlaylistPayload(request.payload);

            const { id: credentialId } = request.auth.credentials;
            const { playlistId } = request.params;
            const { songId } = request.payload;

            await this._playlistSongsService.deleteSongFromPlaylist(playlistId, songId, credentialId);


            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil dihapus dari playlist',
                data: {
                    playlistId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {

                const response = h.response({
                    status: 'fail',
                    message: 'Lagu gagal dihapus dari playlist. Id tidak ditemukan',
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = PlaylistsHandler;