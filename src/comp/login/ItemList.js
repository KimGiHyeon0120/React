import { useEffect, useState } from 'react';
import { itemList } from '../api/Item';
import ItemArea from './ItemArea'

export default function Study() {

    const [ items, setItems] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [keyword, setKeyword] = useState('');

    const catagoryLists = [
        {id: '0', 'name': '전체'},
        {id: '1', 'name': '도서'},
        {id: '2', 'name': '전자'},
        {id: '3', 'name': '생활'}
    ]

    function startItemList(seachItem) {
        itemList(seachItem)
        .then(res => {
            console.log(res);
            if(res.data.code == 200) {
                setItems(res.data.data);
                console.log(res.data.data);
            }
        })
    }

    useEffect(() => {
        startItemList();
    }, [])

    useEffect(() => {
        seachBtn();
    }, [keyword]);

    function categoryNum(num) {
        console.log('num: ', num);
    }

    /** 검색 버튼 */
    function seachBtn() {
        let param = new Object();
        param.keyword = keyword;
        console.log(param);

        startItemList(param); // 아이템 검색
    }

    return(
        <div>
            <h1>아이템 리스트</h1>
            {/** 카테고리 리스트 */}
            {catagoryLists.map(
                (item, index) => (
                    <div key={index}>
                        <a onClick={
                            e=> {
                                e.preventDefault();     //html 기본기능 멈추게 하기
                                categoryNum(item.id);
                            }
                        }>{item.name}</a>
                    </div>
                )
            )}

            <input
                type="text"
                placeholder='검색'
                value={keyword}
                onChange={
                    e=>setKeyword(e.target.value)
                }/>
            <input type="button" value="검색" onClick={seachBtn} />
            {/** 아이템 리스트 */}
            {items.map(
                (item, index) => (
                    <ItemArea item={item} index={index}></ItemArea>
                )
            )}
        </div>
    )
}