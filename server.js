//==================================================================================
//================================== WEB SERVER MODULES ============================
//==================================================================================
const express                                                       = require('express');
const server                                                        = express();
const b0dy_parser                                                   = require('body-parser');
const passp0rt                                                      = require('passport');
const l0cal_strategy                                                = require('passport-local');
const passp0rt_l0cal_m0ng00se                                       = require('passport-local-mongoose')
const meth0d_0verride                                               = require('method-override');
const path                                                          = require('path');
const http                                                          = require('http');
const gridfs														= require('gridfs-stream');
const GridFS														= require('gridfs')
const fs 															= require('fs');
const m0ng0db														= require('mongodb');
// const Busboy														= require('busboy');					
// const url															= require('url').URL;
const crypto 														= require('crypto');

//=============================== for development purpose ==========================
const test 															= require('assert');

//==================================================================================
//================================== CONNECT MONGODB ===============================
//==================================================================================
const m0ng00se 														= require('mongoose');
const mongodb_route                                                 = require('./server/routes/DBConnect');
const conn 															= m0ng00se.connection;
mongodb_route();
//==================================================================================
//=================================== MONGODB MODEL ================================
//==================================================================================
const newsfeed                                                      = require('./DB_Models/models/newsfeed');
const cloneschema                                                   = require('./DB_Models/models/clonedSchema');

//==================================================================================
//================================ WEB SERVER CONFIGURATION ========================
//==================================================================================
server.use(express.static(path.join(__dirname, 'dist/profile')));
//for form data
server.use(b0dy_parser.urlencoded({limit: '50mb', extended: false, parameterLimit: 1000000}));
// for json object
server.use(b0dy_parser.json({limit: '50mb'}));

// ==================================
// MULTER CONFIGURATION
// ==================================
var multer = require('multer');
var storage = multer.diskStorage({
	// destination: function(req, file, cb){
	// 	cb(null, 'uploads')
	// },
	filename: function(req, file, cb){
		cb(null, file.filename + '-' + Date.now())
	}
})

var upload = multer({storage: storage,
	limits: {fileSize: 100000000000}
});


//==================================================================================
//================================== RESTFUL API ===================================
//==================================================================================
//landing page including sign up and sign in
server.get('/', (req, res)=>{
    res.redirect('/newsfeed');
})

//HOMEPAGE
server.get('/newsfeed', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/profile/index.html'));
})

//HOMEPAGE POST HANDLER
//How to save the uploaded files to a newly updated mongoDB
//GridFsBucket 
server.post('/postHandler', (req, res, next) => {
	//files metadata
	const file = req.body;

	/*GENERATE A 32BIT NAME TO BE SAVE IN MONGODB*/
	function makeid() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		//to generate random letter and numbers
		for (var i = 0; i < 36; i++)
		  text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	//Dynamic name and path
	const name = makeid() + file.filesize;
	const path = './temp/' + file.filename;

	// transfer and encode the base64 data
	const buff = new Buffer(file.binary, 'base64');
	const image = fs.writeFileSync(path, buff);

	const test = require('assert');
	m0ng0db.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
		const db 										= client.db('team_vuyog');
		const bucket 									= new m0ng0db.GridFSBucket(db);

		//reading the files and pipe to uploadStream
		const readstream = fs.createReadStream(path);
		readstream.on('data', (data)=>{
			console.log(data);
		})

		readstream.on('finish', ()=>{
			console.log('done');
		})

		const metadata = {
			'mimetype': file.mimetype
		}

		const license = fs.readFileSync(path);
		const uploadStream = bucket.openUploadStream(name);
		const id = uploadStream.id;

		//wait for stream to finish
		uploadStream.once('finish', (file) => {
			var chunksColl = db.collection('fs.chunks');
			var chunksQuery = chunksColl.find({ files_id: id });

			chunksQuery.toArray((error, docs)=>{
				//WILL BE COMMENTED OUT IN PRODUCTION MODE().
				// test.equal(error, null);
				// test.equal(docs.length, 1);
				// test.equal(docs[0].data.toString('hex'), license.toString('hex'));

				var filesColl = db.collection('fs.files');
				var filesQuery = filesColl.find({_id: id});

				filesQuery.toArray((error, docs)=>{
					var hash = crypto.createHash('md5');
					hash.update(license)                                                                                                                                                                                                                                                           
					test.equal(docs[0].md5, hash.digest('hex'));

					//make sure we created indexes
					filesColl.listIndexes().toArray((error, indexes)=>{
						// console.log(indexes)
						chunksColl.listIndexes().toArray((error, indexes)=>{
							res.send(file)
						})
					})
				})
			})
		})
		readstream.pipe(uploadStream)
	})
})


//HTTPRESPONSE FROM ANGULAR newsfeed.service.ts
//the request is from newsfeed.service.ts in angular
//send a json to the angular template and render using a component
//in the prodMode() set this response as a httpHeader 
server.get('/json', (req, res)=>{
	newsfeed.find().populate('uploadedmedia').exec((err, foundFeed) => {
		if(err){
			res.send('something went wrong');
		} else {
			res.send(foundFeed)
		}
	})
})

//IMAGE AND VIDEO PRELOADER
server.get('/data/:filename/:id/:length/:chunkSize', (req, res) => {
	const filename = req.params.filename;
	const id = req.params.id;
	const length = req.params.length;
	const chunkSize = req.params.chunkSize;

	m0ng0db.connect('mongodb://localhost/27017', {useNewUrlParser : true}, (err, client)=>{
		const db = client.db('team_vuyog');
		const bucket = new m0ng0db.GridFSBucket(db);

		const downloadStream = bucket.openDownloadStreamByName(filename);

		downloadStream.on('data', (data)=>{
			// console.log(data)
		})

		downloadStream.pipe(res);
	})
})

server.delete('/json/:l/:k', (req, res) => {
	console.log(req.params.l);
	console.log(req.params.k);
})
 
//OLD VERSION OF PREVIEWER
//IMAGE AND VIDEO PRELOADER
//this preloader has no catch and throw error
//this is a basic, a sample, this method need to be update
//this preloader is for development purposes only
server.get('/data/:filename/:length/:chunksize/:mimetype', (req, res) => {
	const filename = req.params.filename;
	const length = req.params.length;
	const chunksize = req.params.chunksize;
	const mimetype = req.params.mimetype;
	gridfs.mongo = m0ng00se.mongo;
	const gfs = gridfs(conn.db);

	if(req.range.headers){
		console.log('sending a request without a header');
	} else {
		var start = parseInt(chunksize);
		var end = parseInt(length);
		var lengths = start - end-1;

		res.writeHead(206, {
			"Content-Type": mimetype,
			"Accept-Range": 'Bytes',
			"Content-length": end,
			"Content-Range": 'Bytes' + ' ' + 0 + '-' + (end-1) + '/' + end,
		})

		var readstream = gfs.createReadStream({
			filename: filename
		})
		readstream.on('close', () => {
		})
		readstream.pipe(res);
	}
})

//==================================================================================
//=================================== SERVER LISTENER ==============================
//==================================================================================
server.listen(5000, (req, res)=>{
    console.log('server has running in port 5000')
})