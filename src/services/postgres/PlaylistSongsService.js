const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSongToPlaylist({ playlistId, songId }) {
        const id = `playlistsong-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Lagu gagal ditambahkan ke playlist');
        }

        return result.rows[0].id;
    }

    async getSongInPlaylist(playlistId) {
        const query = {
            text: 'SELECT song.id, song.name, song.username FROM playlistsongs LEFT JOIN users ON song_id = song.id WHERE playlists.id = $1',
            values: [playlistId],
        };
        const result = await this._pool.query(query);
        
        if (!result.rows[0].id) {
            throw new NotFoundError('Lagu tidak ditemukan di playlist');
        }
        return result.rows[0];
    }

    async deleteSongInPlaylistById(playlistId, songId) {
        const query = {
            text: 'DELETE FROM playlistsongs WHERE playlist_id AND song_id = $2 = $1 RETURNING id',
            values: [playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Lagu gagal dihapus dari playlist. Id tidak ditemukan');
        }
    }
}

module.exports = PlaylistSongsService;