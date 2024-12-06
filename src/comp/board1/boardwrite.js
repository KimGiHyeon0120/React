import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { boardWrite } from '../api/board1';

export default function WritePost() {
    const navigate = useNavigate();

    // Ref 생성
    const titleRef = useRef('');
    const contentRef = useRef('');

    useEffect(() => {
        // 로그인 여부 확인
        const memberId = localStorage.getItem('userId');
        if (!memberId) {
            alert('로그인이 필요합니다.');
            navigate('/login'); // 로그인 페이지로 리다이렉트
        }
    }, [navigate]);

    const writePostAction = () => {
        const titleValue = titleRef.current.value;
        const contentValue = contentRef.current.value;
        const memberId = localStorage.getItem('userId');

        if (!titleValue || !contentValue) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // 데이터 포장
        const postData = {
            title: titleValue,
            content: contentValue,
            memberId: memberId,
        };

        boardWrite(postData)
            .then(res => {
                const data = res.data;
                if (data.code === '200') {
                    alert('글쓰기 성공!');
                    navigate('/boardlist1'); // 글쓰기 성공 후 게시판 목록으로 이동
                } else {
                    alert('글쓰기 실패! 다시 시도해주세요.');
                }
            })
            .catch(err => {
                console.error('글쓰기 에러:', err);
                alert('서버와의 통신 중 오류가 발생했습니다.');
            });
    };

    return (
        <div
            style={{
                backgroundColor: "#F6F7C4", // 페이지 배경색
                minHeight: "100vh",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1 style={{ textAlign: "center", color: "#7BD3EA" }}>글쓰기</h1>
            <div
                style={{
                    backgroundColor: "#FFFFFF",
                    padding: "30px", // padding을 더 추가하여 크기를 늘림
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    maxWidth: "800px", // maxWidth를 늘려 더 넓은 영역 제공
                    margin: "0 auto",
                }}
            >
                <div style={{ marginBottom: "20px" }}>
                    <label
                        htmlFor="title"
                        style={{
                            display: "block",
                            color: "#7BD3EA",
                            fontWeight: "bold",
                        }}
                    >
                        제목:
                    </label>
                    <input
                        type="text"
                        placeholder="제목 입력"
                        ref={titleRef}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "2px solid #F6D6D6",
                            borderRadius: "5px",
                            fontSize: "16px",
                            color: "#333",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label
                        htmlFor="content"
                        style={{
                            display: "block",
                            color: "#7BD3EA",
                            fontWeight: "bold",
                        }}
                    >
                        내용:
                    </label>
                    <textarea
                        placeholder="내용 입력"
                        ref={contentRef}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "2px solid #F6D6D6",
                            borderRadius: "5px",
                            fontSize: "16px",
                            color: "#333",
                            height: "200px",
                        }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <input
                        type="button"
                        value="글쓰기"
                        onClick={writePostAction}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#A1EEBD",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "background-color 0.3s",
                            marginRight: "10px",
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#7BD3EA")
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#A1EEBD")
                        }
                    />
                    <input
                        type="button"
                        value="취소"
                        onClick={() => navigate(-1)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#F6D6D6",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#A1EEBD")
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#F6D6D6")
                        }
                    />
                </div>
            </div>
        </div>
    );
}
