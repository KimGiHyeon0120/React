import api from '../ax/axiosSetting'

export const itemList = () => {
    return api.get('/item/all');
}