import api from '../ax/axiosSetting'

export const itemList = (param) => {
    console.log(param);
    
    return api.get('/item/all', {
        params: param
    });
}


export const itemGood = (obj) =>{
    return api.get('/item/good', {
        params : obj
    })
}