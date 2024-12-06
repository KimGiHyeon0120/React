import api from '../ax/axiosSetting'

export const boardlist = (param) => {
    console.log(param);
    return api.get('/board/list', {
        params: param
    });
}


export const boarddetail = (param) => {
    console.log(param);
    return api.get('/board/find', {
        params: param
    });
}

export const boardGood = (obj) => {
    return api.post('/board/good', JSON.stringify(obj)
    , {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const boardWrite = (obj) => {
    return api.post('/board/regist', JSON.stringify(obj)
    , {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}