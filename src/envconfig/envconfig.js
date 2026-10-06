/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//elm.cangdu.org/img/';
if(import.meta.env.DEV){
  baseURL = '//api.cangdu.org';
}else{
  baseURL = '//api.cangdu.org';
}


export default {imgUrl, baseURL}