import multer from "multer";
// diskStorage is used to store files on disk

export const upload =multer({storage:multer.diskStorage({})})


