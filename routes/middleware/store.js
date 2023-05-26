 const storage = multer.diskStorage({
    destination: '../../public/images/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
export  const upload = multer({ storage });