import {atom} from "jotai";
import {SelectableProduct} from "@/types";
import Api from "@/api/api";

export const dataListAtom = atom<SelectableProduct[]>([])

// 保存商品数据
export const getProDataListAtom = atom(null, async (_get, set)=>{
    try {
        const result = await Api.getProduction()
        set(dataListAtom, result.map(item=> ({...item, selectStatus: true, selectNum: 0})))
    } catch (e) {
        console.error(e)
    }
})

export const selectedProListAtom = atom(get =>
    get(dataListAtom).filter(item => item.selectStatus && item.selectNum)
)

// 选择商品
export const togSelectProAtom = atom(null, (get, set, index:number)=>{
    set(dataListAtom, prev=>prev.map((item, i) => i === index ? {...item, selectStatus: !item.selectStatus} : item))
})
// 编辑商品
export const editSelectProAtom = atom(null, (_get, set, index:number, delta: number)=>{
    set(dataListAtom, prev =>
        prev.map((item, idx)=>
            idx === index ? {...item, selectNum: Math.max(0, item.selectNum + delta)} : item
        )
    )
})
// 清空选择
export const clearSelectedAtom = atom(null, (_get,set)=>{
    set(dataListAtom, prev=>prev.map(item=>({...item, 'selectStatus': false, 'selectNum': 0})))
})
