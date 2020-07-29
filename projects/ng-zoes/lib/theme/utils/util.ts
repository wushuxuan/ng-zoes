import { hasValue, inArray, isArray, isDefined, isEmpty, isMap, isObject, isSet, isString, PlainObject } from './validator';

const REGEXP_IMAGE_TYPE = /^image\/.+$/;
const REGEXP_VIDEO_TYPE = /^video\/.+$/;


export function toBool(value: any, defaultValue: boolean) {
    value = toBoolean(value, true);
    return value == null ? defaultValue : value;
}

export function toBoolean(value: any, allowUndefined: boolean | null = false): boolean | undefined {
    return allowUndefined && typeof value === 'undefined' ? undefined : value != null && `${value}` !== 'false';
}

export function isImageType(value) {
    return REGEXP_IMAGE_TYPE.test(value);
}

export function isVideoType(value) {
    return REGEXP_VIDEO_TYPE.test(value);
}

export function getFileType(fileName) {
    // 后缀获取
    let suffix = '';
    // 获取类型结果
    let result = '';
    try {
        const flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
    } catch (err) {
        suffix = '';
    }
    // fileName无后缀返回 false
    if (!suffix) { return false; }
    suffix = suffix.toLocaleLowerCase();
    // 图片格式
    const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    // 进行图片匹配
    result = imglist.find(item => item === suffix);
    if (result) {
        return 'image';
    }
    // 匹配txt
    const txtlist = ['txt'];
    result = txtlist.find(item => item === suffix);
    if (result) {
        return 'txt';
    }
    // 匹配 excel
    const excelist = ['xls', 'xlsx'];
    result = excelist.find(item => item === suffix);
    if (result) {
        return 'excel';
    }
    // 匹配 word
    const wordlist = ['doc', 'docx'];
    result = wordlist.find(item => item === suffix);
    if (result) {
        return 'word';
    }
    // 匹配 pdf
    const pdflist = ['pdf'];
    result = pdflist.find(item => item === suffix);
    if (result) {
        return 'pdf';
    }
    // 匹配 ppt
    const pptlist = ['ppt', 'pptx'];
    result = pptlist.find(item => item === suffix);
    if (result) {
        return 'ppt';
    }
    // 匹配 视频
    const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
    result = videolist.find(item => item === suffix);
    if (result) {
        return 'video';
    }
    // 匹配 音频
    const radiolist = ['mp3', 'wav', 'wmv'];
    result = radiolist.find(item => item === suffix);
    if (result) {
        return 'radio';
    }
    // 其他 文件类型
    return 'other';
}

export function isEqual(value, compare) {
    return value == compare
}


export function hasOwn(object: any, property: string): boolean {
    if (!object || !['number', 'string', 'symbol'].includes(typeof property) ||
        (!isObject(object) && !isArray(object) && !isMap(object) && !isSet(object))
    ) { return false; }
    if (isMap(object) || isSet(object)) { return object.has(property); }
    if (typeof property === 'number') {
        if (isArray(object)) { return object[<number>property]; }
        property = property + '';
    }
    return object.hasOwnProperty(property);
}