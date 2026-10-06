/**
 * 字符串填充函数
 * @param value 目标字符串
 * @param position 需要填充的位置
 * @param padstr 填充字符串
 * @param inputElement 输入框，用于修正光标位置
 * @return 返回填充后的字符串
 */
export const padStr = (
  value: string,
  position: number[],
  padstr: string,
  inputElement: HTMLInputElement,
): string => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value = value.substring(0, item + index) + padstr + value.substring(item + index);
    }
  });
  value = value.trim();
  // 解决安卓部分浏览器插入空格后光标错位问题
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(value.length, value.length);
  });
  return value;
};
