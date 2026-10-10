import { describe, it, expect } from 'vitest';
import { createStore } from 'jotai';
import { formDataAtom, saveFormDataAtom, saveImagePathAtom, clearFormDataAtom } from '../home';

const EMPTY = { orderSum: '', name: '', phoneNo: '', imgPath: '' };

describe('home atoms', () => {
  it('表单默认值全为空', () => {
    const store = createStore();
    expect(store.get(formDataAtom)).toEqual(EMPTY);
  });

  it('saveFormData 只合并传入的字段', () => {
    const store = createStore();
    store.set(saveFormDataAtom, { name: '张三' });
    store.set(saveFormDataAtom, { orderSum: '100' });
    expect(store.get(formDataAtom)).toEqual({ ...EMPTY, name: '张三', orderSum: '100' });
  });

  it('saveImagePath 保存图片地址，空字符串被忽略', () => {
    const store = createStore();
    store.set(saveImagePathAtom, '//img/a.png');
    expect(store.get(formDataAtom).imgPath).toBe('//img/a.png');
    store.set(saveImagePathAtom, '');
    expect(store.get(formDataAtom).imgPath).toBe('//img/a.png');
  });

  it('clearFormData 恢复默认值', () => {
    const store = createStore();
    store.set(saveFormDataAtom, { name: '张三', phoneNo: '138 1234 5678' });
    store.set(saveImagePathAtom, '//img/a.png');
    store.set(clearFormDataAtom);
    expect(store.get(formDataAtom)).toEqual(EMPTY);
  });

  it('不同 store 之间状态互相隔离', () => {
    const a = createStore();
    const b = createStore();
    a.set(saveFormDataAtom, { name: '张三' });
    expect(b.get(formDataAtom).name).toBe('');
  });
});
