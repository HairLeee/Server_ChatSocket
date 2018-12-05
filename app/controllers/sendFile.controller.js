  // upload file
  var multer  = require('multer')
  const sftpStorage = require('multer-sftp');
  const config = require('../../config/main.config');
//   var storage = sftpStorage({
//     sftp: {
//         host: config.IMAGE_SERVER.HOST,
//         port: config.IMAGE_SERVER.POST,
//         username: config.IMAGE_SERVER.USERNAME,
//         password: config.IMAGE_SERVER.PASSWORD
//       },
//     destination: function (req, file, cb) {
//       cb(null, '/home/sharing/public/imagesChat')
//     },
//     filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + new Date().getTime() + '.' + file.originalname.split('.')[1])
//       //let extArray = file.mimetype.split("/");
//       //let extension = extArray[extArray.length - 1];
//     //   const nameImage = objCommon.generateUUID();
//       //cb(null, nameImage + '.' + extension)
//     }
//   });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image')
    },
    filename: function (req, file, cb) {
      let jdjjd = file.fieldname + '-' + new Date().getTime() + '.' + file.originalname.split('.')[1];
      cb(null, file.fieldname + '-' + new Date().getTime() + '.' + file.originalname.split('.')[1]);
    }
  })

var upload = multer({ storage: storage });
var uploadImageChat = upload.single('chatImage');

exports.uploadImage = (req, res) => {
  uploadImageChat(req, res, (err) => {
        var fileInfor = req.file;
        var path = fileInfor.path
        console.log(path);
      });
  console.log('dkfkd');
};