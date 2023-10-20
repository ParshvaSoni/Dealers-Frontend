import { notification } from "antd";
// import AWS from 'aws-sdk';
import { S3Client, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import type { UploadFile } from 'antd/es/upload/interface';
import { async } from "q";
import axios from "axios";
import { config } from "./Constant";

// For capitalizing first letter of each word in string
export function Capitalize(str = "") {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// For opening the notification
type NotifyProp = {
  type: string,
  title: string,
  description: string,
  onClickFun?: () => void,
  duration?: number,
  key?: string
}
export function OpenNotification({ type = 'info', title = 'New Notification !', description = "You have a got new notification checkout !", onClickFun = () => { console.log("Notification Clicked") }, duration = 5, key = Date.now().toString() }: NotifyProp) {

  switch (type) {
    case 'info':
      notification.info({ message: title, description: description, duration: duration, onClick: onClickFun, key });
      break;
    case 'warning':
      notification.warning({ message: title, description: description, duration: duration, onClick: onClickFun, key });
      break;
    case 'success':
      notification.success({ message: title, description: description, duration: duration, onClick: onClickFun, key });
      break;
    case 'error':
      notification.error({ message: title, description: description, duration: duration, onClick: onClickFun, key });
      break;
    default:
      notification.open({ message: title, description: description, duration: duration, onClick: onClickFun, key });
  }
}



type CookieProp = {
  name: string,
  value?: string,
  domain?: string,
  path?: string,
  expires?: string | number | Date,
  httponly?: string,
  secure?: boolean
}

export const docCookies = {
  getItem: function ({ name }: CookieProp) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function ({ name, value = '', expires, path, domain, secure }: CookieProp) {
    if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) { return false; }
    var sExpires = "";
    if (expires) {
      switch (expires.constructor) {
        case Number:
          sExpires = expires === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + expires;
          break;
        case String:
          sExpires = "; expires=" + expires;
          break;
        case Date:
          sExpires = "; expires=" + expires.toString();
          break;
      }
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + sExpires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
    return true;
  },
  removeItem: function ({ name, path, domain }: CookieProp) {
    if (!name) { return false; }
    document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
    return true;
  },
  hasItem: function ({ name }: CookieProp) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

// export const uploadFileToBucket = async(file: UploadFile) => {
//   try {
//     console.log(process.env.BUCKET_NAME)
//     AWS.config.update({
//       accessKeyId: process.env.BUCKET_ACCESS_KEY || "00571c22a1d3f5c0000000002",
//       secretAccessKey: process.env.BUCKET_SECRET_KEY|| "K005c7Khw/fQuv3/7PAPTmewnT7YRq8"
//     });

//     const myBucket = new AWS.S3({
//       params: { Bucket: process.env.BUCKET_NAME||"imagebucket44" },
//       region: process.env.BUCKET_REGION||"us-east-005",

//     });

//     const params = {
//       ACL: 'public-read',
//       Body: file.thumbUrl,
//       Bucket: process.env.BUCKET_NAME||'imagebucket44',
//       Key: file.name,
//     };

//     myBucket.putObject(params)
//       .on('httpUploadProgress', (evt) => {
//         console.log(Math.round((evt.loaded / evt.total) * 100))
//       })
//       .send((err) => {
//         if (err) console.log(err)
//       })
//   }
//   catch (err) {
//     console.log(err);
//   }
// }


// export const uploadFileToBucket = async(file:UploadFile)=>{
//   try{
//     console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID,process.env.REACT_APP_AWS_SECRET_ACCESS_KEY)
//     const accessKeyId = "00571c22a1d3f5c0000000002";
//     const secretAccessKey = "K005c7Khw/fQuv3/7PAPTmewnT7YRq8";
//     const s3 = new S3Client({
//       credentials:{
//         accessKeyId,
//         secretAccessKey
//       },
//       endpoint: 'https://s3.us-east-005.backblazeb2.com',
//       region: 'us-east-005',
//     });
//     await s3.send(new PutObjectCommand({
//       Bucket: process.env.REACT_APP_BUCKET_NAME,
//       Key: "test.jpg",
//       Body: file.thumbUrl
//     }));
//     console.log("Successfully uploaded data to " + process.env.REACT_APP_BUCKET_NAME + "/" + 'test.jpg');
//   }
//   catch(err)
//   {
//     console.error(err);
//   }
// }

export const uploadFileToBucket = async (file: UploadFile) => {
  try {
    console.log(file);
    let filename = file.name.split('.')[0] + '.' + file.originFileObj?.type.split('/')[1];
    console.log(filename);
    let response = await axios.post(config.URLS.BACKEND_URL + 'bucket/uploadFile', { file: file.thumbUrl, fileName: filename, fileType: file.type }, { withCredentials: true });
    console.log(response);
  }
  catch (err) {
    console.log(err)
  }
}

export const deleteFileFromBucket = async (file: UploadFile) => {
  try {
    console.log(file);
    let response = await axios.delete(config.URLS.BACKEND_URL + 'bucket/deleteFile/' + file.name);
    console.log(response);
  }
  catch (err) {
    console.log(err);
  }
}
