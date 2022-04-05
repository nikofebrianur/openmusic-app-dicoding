const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongService {
    constructor() {
        this._song = [];
    }

    addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSong = {
            title, year, genre, performer, duration, albumId, id, createdAt, updatedAt,
        };

        this._song.push(newAlbum);

        const isSuccess = this._song.filter((song) => song.id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return id;
    }

    getAllSongs() {
        return this._song;
    }

    getSongById(id) {
        const song = this._songs.filter((n) => n.id === id)[0];
        if (!song) {
          throw new NotFoundError('Lagu tidak ditemukan');
        }
        return song;
      }

      editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const index = this.song.findIndex((song) => song.id === id);
     
        if (index === -1) {
          throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
     
        const updatedAt = new Date().toISOString();
     
        this.song[index] = {
          ...this.song[index],
          title,
          year,
          genre,
          performer,
          duration,
          albumId,
          updatedAt,
        };
      }

      deleteSongById(id) {
        const index = this._song.findIndex((s) => s.id === id);
        if (index === -1) {
          throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
        this._song.splice(index, 1);
      }
}

module.exports = SongService;
