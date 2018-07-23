// @flow
import alertify from 'alertify.js';

const sdk = require('contentful-management');
const contentful = require('contentful');

const fileName = 'picture';
const contentType = 'image/jpg';

const sdkClient = sdk.createClient({
  spaceId: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
});

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_KEY,
});

export async function uploadImage(file: File) {
  try {
    // check if file is an image
    if (file.type.split('/')[0] !== 'image') {
      alertify.error('File should be an image.');
      return false;
    } else {
      const space = await sdkClient.getSpace(process.env.REACT_APP_SPACE_ID);
      const upload = await space.createUpload({
        file: file,
        contentType,
        fileName,
      });
      const asset = await space.createAsset({
        fields: {
          title: {
            'en-US': fileName,
          },
          file: {
            'en-US': {
              fileName: fileName,
              contentType: contentType,
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id,
                },
              },
            },
          },
        },
      });
      const processedAsset = await asset.processForLocale('en-US', {
        processingCheckWait: 2000,
      });
      const publishedAsset = await processedAsset.publish();
      return publishedAsset.sys.id;
    }
  } catch (error) {
    alertify.error('Cannot upload image');
    throw error;
  }
}

export async function getImage(id: string | boolean) {
  try {
    const asset = await client.getAsset(id);
    return asset.fields.file.url.slice(2);
  } catch (error) {
    alertify.error('Cannot get image');
    throw error;
  }
}
