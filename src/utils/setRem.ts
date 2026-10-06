/**
 * 根据设计稿宽度设置根节点 font-size，配合 px2rem 使用
 * @param psdw 设计稿宽度
 */
const setRem = (psdw: number): void => {
  const htmlDOM = document.documentElement;
  const scale = htmlDOM.clientWidth / psdw;
  const rem = (psdw / 10) * scale;
  htmlDOM.style.fontSize = `${rem}px`;
  htmlDOM.setAttribute('data-dpr', String(window.devicePixelRatio));
};

setRem(750);
