import { Injectable } from '@angular/core';
import ImageCompressor from 'image-compressor.js'

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {

  constructor() { }

  compress = async (file, quality, convertSize) => {
    if (!/image\/\w+/.test(file.type)) {
      return false;
    }
    if (file.size < convertSize) {
      return false;
    }
    // 进行图片压缩
    return new Promise((resolve, reject) => {
      new ImageCompressor().compress(file, {
        quality: quality,  //压缩力度
        maxWidth: 1000, //输出图像的最大宽度  minWidth  指定宽度 width
        maxHeight: 1000,  //输出图像的最大高度  minHeight   指定高度 height
        convertSize: 614400, //(614400字节)超过600kb压缩  超过这个值的PNG文件将被转换为jpeg文件。要禁用它，只需将值设置为无穷大
        success(result) {
          resolve(new File([result], file.name,{type:file.type}))
        },
        error(e) {
          reject(e)
        }
      })
    })
  }









}
