var m0ng00se 									= require('mongoose');

var postSchema = m0ng00se.Schema({
	content: String,
	uploadedmedia: [{
		type: m0ng00se.Schema.Types.ObjectId,
		ref: 'cloneschema'
	}],
	dateCreated: {
		type: Date,
		default: Date.now
	}
	
});

module.exports = m0ng00se.model('newsfeeds', postSchema);