import { useEffect, useState } from 'react';
import { boardlist } from '../api/board1';
import { useNavigate } from 'react-router-dom';

export default function Study() {
    const [boardList, setBoardList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    /** 게시판 데이터 로드 */
    function loadBoardList(params) {
        boardlist(params)
            .then((res) => {
                setBoardList(res.data.data); // 데이터 상태 업데이트
            })
            .catch((err) => {
                console.error('API Error: ', err);
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
        <div
            style={{
                backgroundColor: '#F6F7C4', // 페이지 배경색
                minHeight: '100vh',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h1 style={{ textAlign: 'center', color: '#7BD3EA' }}>게시판 목록</h1>

            {/** 글쓰기 버튼 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    onClick={goToWritePage}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#A1EEBD',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#7BD3EA')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#A1EEBD')}
                >
                    글쓰기
                </button>
            </div>

            {/** 검색 필터 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '250px',
                        border: '2px solid #F6D6D6',
                        borderRadius: '5px',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={searchBoards}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#7BD3EA',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#A1EEBD')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#7BD3EA')}
                >
                    검색
                </button>
            </div>

            {/** 게시판 리스트 */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                    justifyContent: 'center',
                }}
            >
                {boardList.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: '2px solid #F6D6D6',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'pointer',
                        }}
                        onClick={() => goToDetailPage(item.boardIdx)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <h3 style={{ color: '#F6D6D6' }}>{item.title}</h3>
                        <p style={{ margin: '5px 0', color: '#7BD3EA' }}>
                            작성일: {item.createdAt}
                        </p>
                        <p style={{ margin: '5px 0', color: '#A1EEBD' }}>
                            작성자: {item.memberId}
                        </p>
                        <p style={{ margin: '5px 0', color: '#F6D6D6' }}>
                            좋아요 수: {item.boardGood}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
