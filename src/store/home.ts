import {atom} from "jotai";
import {OrderForm} from "@/types";

const DEFAULT_FORM: OrderForm = {
    orderSum: '', //金额
    name: '', //姓名
    phoneNo: '', //手机号
    imgPath: '', //图片地址
}

export const formDataAtom = atom<OrderForm>(DEFAULT_FORM)

export const saveFormDataAtom = atom(null, (_get, set, data:Partial<OrderForm>) => {
    set(formDataAtom, prev=>({...prev, ...data}));
})

export const saveImagePathAtom = atom(null, (_get, set, path:string) => {
    if (!path) return
    set(formDataAtom, prev => ({...prev, 'imgPath': path}));
})

export const clearFormDataAtom = atom(null, (_get, set)=> {
    set(formDataAtom, DEFAULT_FORM)
} )