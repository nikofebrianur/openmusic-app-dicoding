const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylistByOwner({ name, owner }) {
        const id = `playlist-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
            values: [id, name, owner],
        };
        
        const result = await this._pool.query(query);
        
        if (!result.rows[0].id) {
            throw new InvariantError('Playlist gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getPlaylistByOwner(owner) {
        const query = {
            text: 'SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner WHERE playlists.owner = $1',
            values: [owner],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async deletePlaylistByOwner(id) {
        const query = {
            text: 'DELETE FROM playlists WHERE id = $1 RETURNING id, owner',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Playlist gagal dihapus. Id tidak ditemukan');
        }
    }

    async verifyPlaylistOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM playlists WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length > 0) {
            throw new NotFoundError('Gagal menemukan playlist.')
        }

        const playlist = result.rows[0];

        if (playlist.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try {
            await this.verifyPlaylistOwner(playlistId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }

            try {
                await this._collaborationService.verifyCollaborator(playlistId, userId);
            } catch {
                throw error;
            }
        }
    }

    async verifyPlaylistExist(playlistId) {
        const query = {
            text: 'SELECT COUNT(1) FROM playlists WHERE id = $1',
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        if (!result) {
            throw new NotFoundError('Playlist yang dicari tidak ditemukan');
        }
    }
}

module.exports = PlaylistsService;