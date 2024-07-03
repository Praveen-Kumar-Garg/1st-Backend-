import multer from "multer"
//multer for file uploading

//all file to be kept in public-temp

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")

    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  

  export const upload = multer({
    storage,
  })