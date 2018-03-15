const sdk = require('contentful-management');
const contentful = require('contentful');
const spaceId = '5gzm0fh2d9ed';
const fileName = 'picture';
const contentType = 'image/jpg';
const accessToken =
  'CFPAT-2d9ff7b29556f9ef96a692fb5d056429854c0c0bb4cd3b35554981b490f569e5';
const deliveryKey =
  'a89f4b0633cc0566cf78c952114ace472fa114af74743d013a428be3627c924f';

const sdkClient = sdk.createClient({
  spaceId: spaceId,
  accessToken: accessToken,
});

const client = contentful.createClient({
  space: spaceId,
  accessToken: deliveryKey,
});

export async function uploadImage(file) {
  try {
    const space = await sdkClient.getSpace(spaceId);
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
  } catch (error) {
    console.log(error);
  }
}

export async function getImage(id) {
  const asset = await client.getAsset(id);
  return asset.fields.file.url.slice(2);
}
