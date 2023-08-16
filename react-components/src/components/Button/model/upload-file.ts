export type UploadFile = {
  // Событие загрузки файла
  onChange: (file: File) => void;

  // Список разрешенных для загрузки расширений
  acceptList?: string[];

  // Обратный вызов при несоответствие загруженного файла списку разширения
  errorCallback?: (errorMessage: string) => void;
};
