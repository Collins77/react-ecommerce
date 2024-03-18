const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');

dotenv.config()

cloudinary.config({
    cloud_name: 'dwuhl0u0b',
    api_key: '444721293814759',
    api_secret: 'YeWYjTxTs1SAllRxmx2GrF4dsQs'
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}