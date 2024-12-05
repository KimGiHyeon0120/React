import api from '../ax/axiosSetting'

export const itemList = (param) => {
    console.log(param);
    
    return api.get('/item/all', {
        params: param
    });
}