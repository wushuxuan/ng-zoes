export interface LocaleData {
  [key: string]: any;
}

export interface TableLocaleData extends LocaleData {
  emptyText: string;
  clearText: string;
}

export interface UploadLocaleData extends LocaleData {
  uploading: string,
  removeFile: string,
  uploadError: string,
  previewFile: string,
  downloadFile: string,
  uploadStorage: string
}

export interface FormLocalData extends LocaleData {
  submit: string;
  cancel: string;
}

export interface FullLocaleData {
  abbr: string;
  zt: TableLocaleData;
  zu: UploadLocaleData;
  zf: FormLocalData;
}
