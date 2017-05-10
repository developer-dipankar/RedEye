var express = require('express')
var app = express()
app.set('view engine', 'pug')

var MongoClient = require('mongodb').MongoClient

var fileUpload = require('express-fileupload')

// // jQuery File Upload
// var upload = require('jquery-file-upload-middleware');
// // configure upload middleware
// upload.configure({
//     uploadDir: __dirname + '/public/uploads',
//     uploadUrl: '/uploads',
//     imageVersions: {
//         thumbnail: {
//             width: 80,
//             height: 80
//         }
//     }
// });


// default options 
app.use(fileUpload());
 
app.post('/uploadFiles', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // var filesUpload = [];
  let filesUpload = req.files
  console.log(req)
  // for (var i = 0; i < filesUpload.length; i++) {
  // 	console.log(filesUpload[i])
  // }

  // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  // let sampleFile = req.files.sampleFile;
  // console.log(sampleFile);
  // // Use the mv() method to place the file somewhere on your server 
  // sampleFile.mv('D:/WorkShop/Express/redeye/public/images/filename.jpg', function(err) {
  //   if (err)
  //     return res.status(500).send(err);
 
  //   res.send('File uploaded!');
  // });
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/photoupload', function (req, res) {
  res.render('photoupload', { title: 'Hey', message: 'Hello there!' })
})

// app.get('/upload', function (req, res) {
//   res.render('upload', { title: 'Hey', message: 'Hello there!' })
// })

// app.get('/mongoShow', function (req, res) {
//   	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
// 	  if (err) throw err

// 	  db.collection('bank_data').find({last_name: 'SMITH'}).toArray(function (err, result) {
// 	    if (err) throw err
//     	// for(var i=0; i<result.length; i++){
//     	// 	console.log(result[i].first_name+' '+result[i].last_name)
//     	// }
//     	console.log(result)
// 		// res.render('bank_data', result)
 
// 	  })
// 	})
// })

app.get('/mysql', function (req, res) {

	var mysql = require('mysql')
	// var result = new array()
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'db_floorplanner_v2'
	});

	connection.connect()

	connection.query('SELECT * FROM `assignments`', function (err, rows, fields) {
	  if (err) throw err
	  // res.render('mysql',rows)
	  console.log(rows)

	  // for (var i = 0; i < rows.length; i++) {
	  // 	console.log(rows[i].name)
	  // }
	})

	connection.end()



	// res.send()
})

var multer = require('multer')

app.get('/multiupload', function (req, res) {
  res.render('multiupload', { title: 'Hey', message: 'Hello there!' })
})
var upload = multer({ dest: 'uploads/' })
app.post('/multiupload',upload.array('photos', 12), function (req, res) {
  console.log(req.files);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
