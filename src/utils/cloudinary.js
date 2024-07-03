import { v2 as cloudinary } from "cloudinary"

import fs from "fs"
//file system which upload the file at local server and after using that file it get unlink


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


const uploadOnCloudinary = sync(localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const reponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded sucessfully
        console.log("file has been uploaded  on cloudinary",
            reponse.url
        );
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        return null;

    }
}
export { uploadOnCloudinary }

//parameter bana ke local file ka path thenm upload aand after that unlink