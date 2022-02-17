/**
 * jsonObject与array互转
 *
 * obj 要转换的对象数据
 * const obj = {
 *         field_a: "1111"
 *         field_a1: "3333"
 *         field_a2: "5555"
 *         field_b: "2222"
 *         field_b1: "4444"
 *         field_b2: "6666"
 *     }
 *
 * fieldArr 转换后数据里面的字段
 * const fieldArr = ['field_a','field_b']
 *
 * resultArr:
 * [
 *     {
 *         "field_a": "1111",
 *         "field_b": "2222"
 *     },
 *     {
 *         "field_a": "3333",
 *         "field_b": "4444"
 *     },
 *     {
 *         "field_a": "5555",
 *         "field_b": "6666"
 *     }
 * ]
 */

// 对象转数组
export function objTransformToArr(obj, fieldArr) {
  const keys = Object.keys(obj);
  const arr = keys
    .map((item) => {
      if (item.includes(fieldArr[0])) {
        // console.log(item.split(''))
        return item.replace(fieldArr[0], '');
      }
    })
    .filter((item) => typeof item !== 'undefined');
  const resultArr: Record<string | number | symbol, any> = [];
  arr.forEach((item: string) => {
    const obj1: Record<string | number | symbol, any> = {};
    fieldArr.forEach((el) => {
      obj1[el] = obj[`${el}${item}`];
    });
    resultArr.push(obj1);
  });
  return resultArr;
}
// 数组转对象
export function arrTransformToObj(arr, fieldArr) {
  const obj = {};
  arr.forEach((item, index) => {
    // console.log(item)
    fieldArr.forEach((el) => {
      obj[`${el}${index ? index : ''}`] = item[el];
    });
  });
  return obj;
}
