




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
            IDX : {item.itemIdx}<br></br>
            NAME : {item.name}<br></br>
            가격 : {item.price}<br></br>
            추천 : {item.good}<br></br>
            카테고리 이름 : {item.categoryName}<br></br>
            카테고리 id : {item.categoryId}<br></br>
        </div>
    )
}