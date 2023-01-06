/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {Promise}
 */
export function getBlob(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    // 避免 200 from disk cache
    url = `${url}?r=${Math.random()}`;
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
export function saveAs(blob, filename) {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  link.remove();
  window.URL.revokeObjectURL(link.href);
}
