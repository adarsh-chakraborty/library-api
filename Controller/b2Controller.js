const B2 = require('backblaze-b2');

const b2 = new B2({
  applicationKeyId: process.env.B2_ID,
  applicationKey: process.env.B2_KEY
});

async function getBucket() {
  try {
    await b2.authorize(); // must authorize first (authorization lasts 24 hrs)
    let response = await b2.getBucket({ bucketName: 'bookshelfgq' });
    console.log(response.data);
  } catch (err) {
    console.log('Error getting bucket:', err);
  }
}

const uploadToB2 = async (data) => {
  try {
    await b2.authorize();
    const { data: uploadUrl } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID
    });

    const filename = `${Math.random().toString(36).slice(2, 7)}-${
      data.originalname
    }`;

    await b2.uploadFile({
      uploadUrl: uploadUrl.uploadUrl,
      uploadAuthToken: uploadUrl.authorizationToken,
      fileName: filename,
      data: data.buffer,
      mime: data.mimetype
    });

    return `${process.env.B2_IMAGE_URL}${filename}`;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getBucket, uploadToB2 };
