import SparkMD5 from 'spark-md5';
import { checkFile, mergeFile, uploadChunkFile } from '@/api';

export function setChunks(fileSize: number, chunkSize: number) {
  return Math.ceil(fileSize / chunkSize);
}

//生成文件的 MD5
export function md5File(file: File, chunks: number, chunkSize: number) {
  return new Promise<string>((resolve, reject) => {
    let blobSlice =
      File.prototype.slice ||
      //@ts-ignore
      File.prototype.mozSlice ||
      //@ts-ignore
      File.prototype.webkitSlice;

    let currentChunk = 0;
    let spark = new SparkMD5.ArrayBuffer();

    let fileReader = new FileReader();
    fileReader.onload = function (e: ProgressEvent<FileReader>) {
      // console.log("read chunk nr", currentChunk + 1, "of", chunks);

      console.log(e.target?.result);

      spark.append(e.target?.result as ArrayBuffer); // Append array buffer
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        // let cur = +new Date();
        // console.log('finished loading');
        // alert(spark.end() + '---' + (cur - pre)); // Compute hash
        let result = spark.end();
        resolve(result);
      }
    };
    fileReader.onerror = function (err) {
      console.warn('oops, something went wrong.');
      reject(err);
    };

    function loadNext() {
      let start = currentChunk * chunkSize;
      let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  });
}

//检查文件的 MD5
export async function checkFileMD5(fileName: string, md5: string) {
  try {
    const result = await checkFile(fileName, md5);
    const data = result.data;

    return {
      success: true,
      isFile: data.isFile,
      list: data.list,
    };
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
      isFile: false,
      list: [],
    };
  }
}

export async function checkAndUploadChunk(
  md5: string,
  chunkList: string[],
  {
    fileSize,
    chunkSize,
    file,
    chunks,
  }: { fileSize: number; chunkSize: number; file: File; chunks: number },
) {
  // let hasUploaded = chunkList.length;

  //TODO: 已经上传文件的校验

  for (let i = 0; i < chunks; i++) {
    let exist = chunkList.indexOf(i + '') > -1;

    if (!exist) {
      const r = await upload(i, md5, {
        fileSize,
        chunkSize,
        file,
        chunks: chunks + '',
      });

      if (!r.success) {
        return false;
      }
      // hasUploaded++;

      // .then((result) => {
      //   hasUploaded++;

      //   //上传的进度比
      //   let radio = Math.floor((hasUploaded / chunks) * 100);
      //   console.log(`'已经上传了${radio}%`);
      // })
      // .catch((error) => {
      //   console.log("error", error);
      // });
    }
  }

  return true;
}

export async function upload(
  i: number,
  md5: string,
  {
    fileSize,
    chunkSize,
    file,
    chunks,
  }: { fileSize: number; chunkSize: number; file: File; chunks: string },
) {
  const index = i + 1; //需要上传的文件的序号
  const start = i * chunkSize;
  const end = index * chunkSize > fileSize ? fileSize : index * chunkSize;
  const data = file.slice(start, end);

  let form = new FormData();
  form.append('file', data);
  form.append('total', chunks);
  form.append('index', i + '');
  form.append('md5', md5);

  try {
    await uploadChunkFile(form);
    return {
      success: true,
      index: i,
      md5,
    };
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
      index: i,
      md5,
    };
  }
}

export async function merge(md5: string, fileName: string) {
  try {
    await mergeFile(md5, fileName);
    return {
      success: true,
    };
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
    };
  }
}
