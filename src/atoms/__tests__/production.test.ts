import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createStore } from 'jotai';
import type { Product } from '@/types';
import Api from '@/api/api';
import {
  dataListAtom,
  getProDataListAtom,
  selectedProListAtom,
  togSelectProAtom,
  editSelectProAtom,
  clearSelectedAtom,
} from '../production';

vi.mock('@/api/api', () => ({ default: { getProduction: vi.fn() } }));

const PRODUCTS: Product[] = [
  { product_id: 1, product_name: 'A', product_price: 100, commission: 10 },
  { product_id: 2, product_name: 'B', product_price: 200, commission: 20 },
];

/** 创建一个已经加载好商品的 store */
const loadedStore = async () => {
  vi.mocked(Api.getProduction).mockResolvedValue(PRODUCTS);
  const store = createStore();
  await store.set(getProDataListAtom);
  return store;
};

describe('production atoms', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getProDataList：加载商品，默认选中且数量为 0', async () => {
    const store = await loadedStore();
    expect(store.get(dataListAtom)).toEqual([
      { ...PRODUCTS[0], selectStatus: true, selectNum: 0 },
      { ...PRODUCTS[1], selectStatus: true, selectNum: 0 },
    ]);
  });

  it('getProDataList：接口失败时保持原列表并打印错误', async () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(Api.getProduction).mockRejectedValue(new Error('network'));
    const store = createStore();
    await store.set(getProDataListAtom);
    expect(store.get(dataListAtom)).toEqual([]);
    expect(err).toHaveBeenCalledOnce();
  });

  it('togSelectPro：只切换目标商品，且返回新数组（不修改原数组）', async () => {
    const store = await loadedStore();
    const before = store.get(dataListAtom);
    store.set(togSelectProAtom, 0);
    const after = store.get(dataListAtom);
    expect(after).not.toBe(before);
    expect(after[0]!.selectStatus).toBe(false);
    expect(after[1]!.selectStatus).toBe(true);
    expect(before[0]!.selectStatus).toBe(true);
    // 再切一次回到选中，且不会重置数量
    store.set(editSelectProAtom, 0, 2);
    store.set(togSelectProAtom, 0);
    store.set(togSelectProAtom, 0);
    expect(store.get(dataListAtom)[0]).toMatchObject({ selectStatus: false, selectNum: 2 });
  });

  it('editSelectPro：按增量修改数量，且不会小于 0', async () => {
    const store = await loadedStore();
    store.set(editSelectProAtom, 1, 2);
    store.set(editSelectProAtom, 1, 1);
    expect(store.get(dataListAtom)[1]!.selectNum).toBe(3);
    store.set(editSelectProAtom, 1, -10);
    expect(store.get(dataListAtom)[1]!.selectNum).toBe(0);
  });

  it('连续多次增量修改不会丢失（基于最新状态计算）', async () => {
    const store = await loadedStore();
    store.set(editSelectProAtom, 0, 1);
    store.set(editSelectProAtom, 0, 1);
    expect(store.get(dataListAtom)[0]!.selectNum).toBe(2);
  });

  it('selectedProList：派生出已选中且数量大于 0 的商品，并随状态更新', async () => {
    const store = await loadedStore();
    expect(store.get(selectedProListAtom)).toEqual([]);
    store.set(editSelectProAtom, 0, 1);
    store.set(editSelectProAtom, 1, 2);
    expect(store.get(selectedProListAtom).map(p => p.product_id)).toEqual([1, 2]);
    store.set(togSelectProAtom, 0);
    expect(store.get(selectedProListAtom).map(p => p.product_id)).toEqual([2]);
  });

  it('clearSelected：全部取消选中并数量归零', async () => {
    const store = await loadedStore();
    store.set(editSelectProAtom, 0, 3);
    store.set(clearSelectedAtom);
    expect(store.get(dataListAtom).every(p => !p.selectStatus && p.selectNum === 0)).toBe(true);
    expect(store.get(selectedProListAtom)).toEqual([]);
  });
});
