const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumService {
    constructor() {
        this._album = [];
    }

    addAlbum({ name, year }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newAlbum = {
            name, year, id, createdAt, updatedAt,
        };

        this._album.push(newAlbum);

        const isSuccess = this._album.filter((album) => album.id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Album gagal ditambahkan');
        }

        return id;
    }

    getAlbumById(id) {
        const album = this._albums.filter((n) => n.id === id)[0];
        if (!album) {
          throw new NotFoundError('Album tidak ditemukan');
        }
        return album;
      }

      editAlbumById(id, { name, year }) {
        const index = this.album.findIndex((note) => note.id === id);
     
        if (index === -1) {
          throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
     
        const updatedAt = new Date().toISOString();
     
        this.album[index] = {
          ...this.album[index],
          name,
          year,
          updatedAt,
        };
      }

      deleteAlbumById(id) {
        const index = this._album.findIndex((n) => n.id === id);
        if (index === -1) {
          throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
        this._album.splice(index, 1);
      }
}

module.exports = AlbumService;