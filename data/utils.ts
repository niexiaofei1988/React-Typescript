import pinyin from 'pinyin';
import sourceData from './all_china';

export const provinceRe = /^[1-9]{2}0{4}$/;
export const cityRe = /^[1-9]{2}\d{2}0{2}$/;
export const countyRe = /[1-9]{2}0{4}|[1-9]{2}\d{2}0{2}$/; //县

const keys = Object.keys(sourceData);

// 首字母转大写
export function firstUpperCase(str: string) {
  return str.replace(/^\S/g, (strItem) => strItem.toUpperCase());
}

// 转拼音
function getPinyinByChineseName(cnName: string) {
  return pinyin(cnName, {
    style: pinyin.STYLE_NORMAL,
  })
    .map((item) => firstUpperCase(item[0]))
    .join('');
}

interface ItemDataParams {
  title: string;
  pid?: string;
  key: string;
}

// 获取单个数据
export function getItemData({ pid, key, title }: ItemDataParams) {
  return {
    pid,
    key,
    title,
    value: key,
    pinyin: getPinyinByChineseName(title),
  };
}

const result = keys.reduce((prev, next) => {
  let pid = '';
  const title = sourceData[next];
  const item = getItemData({ pid, key: next, title });
  if (next.match(provinceRe)) {
    prev[next] = item;
  } else if (next.match(cityRe)) {
    pid = next.replace(next.slice(2, 4), '00');
    if (prev[pid]) {
      const cityItem = {
        path: `${pid}-${next}`,
        ...item,
        pid,
      };
      prev[pid].children = Array.isArray(prev[pid].children)
        ? prev[pid].children.concat(cityItem)
        : [].concat(cityItem);
    }
  } else if (!next.match(countyRe)) {
    // 县 区
    const parentPId = next.replace(next.slice(2, 6), '0000');
    pid = next.replace(next.slice(4, 6), '00');
    if (prev[next.replace(next.slice(2, 6), '0000')]) {
      const child = prev[next.replace(next.slice(2, 6), '0000')].children;
      if (child && Object.prototype.toString.call(child) === '[object Array]') {
        const i = child.findIndex((city) => city.key === pid);
        const countItem = {
          path: `${parentPId}-${pid}-${next}`,
          ...item,
          pid,
        };
        if (i >= 0) {
          child[i].children = child[i].children
            ? child[i].children.concat(countItem)
            : [].concat(countItem);
        }
      }
    }
  }
  return prev;
}, {});

export default Object.values(result);
