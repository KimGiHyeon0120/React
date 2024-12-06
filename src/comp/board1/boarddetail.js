import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { boarddetail } from '../api/board1'; // boarddetail API 함수

export default function BoardDetali1() {
    const { boardId } = useParams(); // URL에서 boardId 추출
    const [boardData, setBoardData] = useState(null);

    // 게시글 데이터를 로드하는 함수
    function fetchBoardDetail(boardId) {
        boarddetail({ boardId })
            .then((res) => {
                console.log("API 응답:", res.data);

                if (res.data.code === "200") {
                    setBoardData(res.data.data); // 게시글 데이터 설정
                }
            })
            .catch((err) => {
                console.error("API 호출 에러:", err);
            });
    }

    useEffect(() => {
        if (boardId) {
            fetchBoardDetail(boardId); // 데이터 로드 함수 호출
        }
    }, [boardId]);

    // 데이터 로드 전 처리
    if (!boardData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>게시글 상세보기</h1>
            <p>제목: {boardData.title}</p>
            <p>내용: {boardData.content}</p>
            <p>작성자: {boardData.memberId}</p>
            <p>좋아요 수: {boardData.boardGood}</p>
            <p>작성일: {new Date(boardData.createdAt).toLocaleString()}</p>
        </div>
    );
}
