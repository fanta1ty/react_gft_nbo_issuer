/**
 * Generates the image URL based on the given data.
 *
 * @param {string} data - The data to generate the image URL from.
 * @return {string} The generated image URL.
 */
const getImageUrl = (data: string | File) => {
  if (!data || data.length === 0) {
    return "";
  }
  if (data instanceof File) {
    return URL.createObjectURL(data);
  }
  if (data.startsWith("https://") || data.startsWith("http://")) {
    return data;
  }
  return `data:image/png;base64,${data}`;
};

export default getImageUrl;
