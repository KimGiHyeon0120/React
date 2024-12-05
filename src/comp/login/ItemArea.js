




//아이템 리스트 영역
export default function AreaItem(props) {

const item = props.item;
const index = props.index;

    return (
        <div key={index} style={
            {
                'border' : '2px solid blue',
                'width' : '400px',
                'margin' : '10px',
                'cursor' : 'pointer'
            }
        }>
            IDX : {item.itemIdx}&nbsp;|&nbsp;
            NAME : {item.name}&nbsp;|&nbsp;
            가격 : {item.price}&nbsp;|&nbsp;
            추천 : {item.good}<br></br>
            카테고리 id : {item.categoryId}&nbsp;|&nbsp;
            카테고리 이름 : {item.categoryName}

        </div>
    )
}