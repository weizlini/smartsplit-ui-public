import axios from "axios";
import config from "./config";
import { jwtHeader } from "./core";

/**
 * Fetch a secure signed POST ia AWS PostObjectV4
 * @returns {Promise<*>}
 */
export async function getS3Signed() {
  try {
    const response = await axios.get(`${config.apiUrl}/s3/sign`, {
      headers: { authorization: jwtHeader() },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * an async call that first calls our API to create a signed post via AWS PostObjectV4
 * then directly POSTs the file to S3. the filename is generated on the server
 *
 * @param files FileList
 * @param onProgress function
 * @returns {Promise<{mediaUrl: string}|boolean>}
 */
export async function uploadToS3(files: FileList, onProgress) {
  // fetch the signed S3 form and input params
  const signingData = await getS3Signed();

  // the url to post to S3
  const amazonUrl = signingData.form.action;

  // POST data container
  const formData = new FormData();

  //getting the extension
  const parts = files[0].name.split(".");
  const ext = parts[parts.length - 1];

  // filename generated on the API with the extension
  const filename = `${signingData.filename}.${ext}`;

  // multipart form upload and file details
  const headers = {
    "Content-Type": "multipart/form-data",
    "Content-Disposition": `form-data; name="file"; filename="${filename}"`,
  };

  // the final URL of the media on the S3
  const imageUrl = signingData.url + `.${ext}`;

  // copy the s3 signing data into the form
  const keys = Object.keys(signingData.inputs);
  keys.forEach((key) => {
    if (key === "key") {
      formData.set(key, signingData.prefix + signingData.inputs[key]);
    } else {
      formData.set(key, signingData.inputs[key]);
    }
  });

  // rename the file to the new filename
  const renamedFile = new File([files[0]], filename, {
    type: files[0].type,
  });

  //add the file's binary data
  formData.set("file", renamedFile);

  //upload the file. onProgress for progress display
  try {
    await axios.post(amazonUrl, formData, {
      headers: headers,
      onUploadProgress: onProgress,
    });

    // return the images S3 permalink
    return { mediaUrl: imageUrl };
  } catch (e) {
    console.log(e.response.data);
    return false;
  }
}

/**
 * create an entry in the media table in the API,
 * is successful returns the newly created media model
 * {
 *     id:int,
 *     user_id:int,
 *     url:"the s3 URL"
 *     [...]
 * }
 * @param s3url
 * @param section
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createMedia(s3url, section) {
  return await axios.post(
    `${config.apiUrl}/media`,
    { s3url, section },
    {
      headers: { authorization: jwtHeader() },
    }
  );
}
