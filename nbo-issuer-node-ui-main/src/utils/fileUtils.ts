export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(
        reader.result
          ?.toString()
          .replace("data:", "")
          .replace(/^.+,/, "") as string,
      );
    reader.onerror = reject;
  });

export function downloadFileFromInput(file: File) {
  const fr = new FileReader();
  fr.readAsDataURL(file);

  const blob = new Blob([file], { type: "application/pdf" });

  const objectURL = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectURL;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export const downloadFileFromURL = (
  url: string,
  fileName = "file",
  type = "pdf",
) => {
  fetch(url).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.${type}`;
      a.click();
      a.remove();
    });
  });
};

export const downloadJsonFile = (data: unknown, fileName: string) => {
  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const viewJson = (data: unknown) => {
  const url = window.URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  window.open(url);
};
