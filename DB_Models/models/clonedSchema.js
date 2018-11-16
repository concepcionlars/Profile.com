var m0ng00se 									= require('mongoose');

var clonedSchema = m0ng00se.Schema({
	gfs_filename: String,
	gfs_mimetype: String,
	gfs_length: Number,
	gfs_chunkSize: Number,
});

module.exports = m0ng00se.model('cloneschema', clonedSchema);