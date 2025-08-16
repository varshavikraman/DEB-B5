import multer from 'multer';

// use memory storage to store file as buffer
const storage = multer.memoryStorage();

const upload = multer({storage:storage});

export default upload;