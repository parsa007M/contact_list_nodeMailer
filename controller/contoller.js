const multer = require('multer'); // which is primarily used for uploading files
const jimp = require('jimp'); // JavaScript Image Manipulation Program

const contacts = require('../model/contacts');
const { quality } = require('jimp');


let contactList = []; 

let fileName= ''; // filename for choose file input

// ! SET STORAGE ENGINE FOR AVATAR: ==============================

// The disk storage engine gives you full control on storing files to disk.

const storager = multer.diskStorage({
    destination: 'public/uploads/avatars',
    filename:(req, file, cb)=>{
        // The function should call 'cb' with a boolean
        // to indicate if the file should be accepted
        fileName = 'av.'+
                    Date.now()+
                    path.extname(file.originalname);
                    cb(null, fileName);
    }
})

// init upload for avatar. Create a multer object

const upload = multer({
    storage:storager
}).single('avatar');

// single(fieldname): Accept a single file with the name fieldname. The single file will be stored in req.file.

// ! NEW CONTACT PART : ==============================

exports.newContact = (req, res)=>{

    jimp.read('public/uploads/avatars'+fileName,(err, file)=>{
        if(err) throw err;
        file
            .resize(250,250) // resize
            .quality(60) // set image quality 
            .write('public/uploads/avatars'+fileName); // save
    });
}
