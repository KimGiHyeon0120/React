import { useEffect, useState } from 'react';
import { boardlist, boardGood } from '../api/board1';
import { useNavigate } from 'react-router-dom';

export default function Study() {
    const [boardList, setBoardList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    /** 게시판 데이터 로드 */
    function loadBoardList(params) {
        boardlist(params)
            .then((res) => {
                console.log("API Response: ", res.data); // API 응답 확인
                setBoardList(res.data.data); // 데이터 상태 업데이트
            })
            .catch((err) => {
                console.error("API Error: ", err);
            });
    }

    /** 검색 버튼 */
    function searchBoards() {
        const params = { keyword };
        loadBoardList(params);
    }

    useEffect(() => {
        searchBoards();
    }, [keyword]);

    /** 좋아요 처리 */
    function changeItem(idx) {
        const obj = { boardId: idx };

        boardGood(obj)
            .then((res) => {
                if (res.data.code === "200") {
                    const updatedBoardList = boardList.map((item) =>
                        item.boardIdx === idx ? { ...item, boardGood: item.boardGood + 1 } : item
                    );
                    setBoardList(updatedBoardList); // 클라이언트 상태 업데이트
                }
            })
            .catch((err) => {
                console.error("좋아요 API 에러:", err);
            });
    }

    /** 글쓰기 페이지 이동 */
    function goToWritePage() {
        const memberId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID 가져오기
        if (!memberId) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        navigate('/boardwrite1', { state: { memberId } }); // memberId를 글쓰기 페이지로 전달
    }

/** 상세보기 페이지 이동 */
function goToDetailPage(boardIdx) {
    navigate(`/boarddetail1/${boardIdx}`); // URL 경로 변수 방식으로 전달
}

    return (
        <div>
            <h1>게시판 목록</h1>

            {/** 글쓰기 버튼 */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={goToWritePage}
                    style={{
                        padding: '10px 20px',
                        marginBottom: '10px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    글쓰기
                </button>
            </div>

            {/** 검색 필터 */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={searchBoards} style={{ padding: '5px 10px' }}>
                    검색
                </button>
            </div>

            {/** 게시판 리스트 */}
            {boardList.map((item, index) => (
                <div
                    key={index}
                    style={{
                        border: '2px solid blue',
                        width: '400px',
                        margin: '10px',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={() => goToDetailPage(item.boardIdx)} // 상세보기로 이동
                >
                    <div>
                        제목: {item.title}
                        <br />
                        작성일: {item.createdAt}
                        <br />
                        작성자: {item.memberId}
                        <br />
                        좋아요 수: {item.boardGood}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                changeItem(item.boardIdx);
                            }}
                        >
                            👍
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
