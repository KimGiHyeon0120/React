import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { boarddetail, boardRemove, boardGood } from "../api/board1";

export default function BoardDetail1() {
    const { boardId } = useParams(); // URL에서 boardId 추출
    const navigate = useNavigate(); // 페이지 이동에 사용
    const [boardData, setBoardData] = useState(null);

    const currentUserId = localStorage.getItem("userId"); // 현재 사용자 ID

    function fetchBoardDetail(boardId) {
        boarddetail({ boardId })
            .then((res) => {
                if (res.data.code === "200") {
                    setBoardData({ ...res.data.data, boardId });
                }
            })
            .catch(() => {
                alert("게시글 데이터를 불러오는 중 오류가 발생했습니다.");
            });
    }

    useEffect(() => {
        if (boardId) {
            fetchBoardDetail(boardId);
        }
    }, [boardId]);

    function handleLike() {
        if (!boardData) return;

        const obj = { boardId };

        boardGood(obj)
            .then((res) => {
                if (res.data.code === "200") {
                    // 좋아요 수 업데이트
                    setBoardData((prevData) => ({
                        ...prevData,
                        boardGood: prevData.boardGood + 1,
                    }));
                } else {
                    alert("좋아요 처리가 실패했습니다.");
                }
            })
            .catch((err) => {
                console.error("좋아요 API 에러:", err);
                alert("좋아요 처리 중 오류가 발생했습니다.");
            });
    }




    
    function detail() {
        if (boardData) {
            navigate("/boardupdate1", { state: { boardData } });
        } else {
            alert("게시글 데이터를 불러오지 못했습니다.");
        }
    }





    function deleteBoard() {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            boardRemove({ boardId })
                .then((res) => {
                    if (res.data.code === "200") {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/boardlist1"); // 삭제 후 게시판 목록으로 이동
                    } else {
                        alert("게시글 삭제에 실패했습니다.");
                    }
                })
                .catch(() => {
                    alert("게시글 삭제 중 오류가 발생했습니다.");
                });
        }
    }

    return (
        <div
            style={{
                backgroundColor: "#F6F7C4", // 페이지 배경색
                minHeight: "100vh",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {boardData ? (
                <>
                    <h1 style={{ textAlign: "center", color: "#7BD3EA" }}>
                        게시글 상세보기
                    </h1>
                    <div
                        style={{
                            backgroundColor: "#FFFFFF",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "18px",
                                color: "#F6D6D6",
                                fontWeight: "bold",
                            }}
                        >
                            제목: {boardData.title}
                        </p>
                        <p style={{ color: "#A1EEBD" }}>내용: {boardData.content}</p>
                        <p style={{ color: "#7BD3EA" }}>
                            작성자: {boardData.memberId}
                        </p>
                        <p style={{ color: "#F6D6D6" }}>
                            좋아요 수: {boardData.boardGood}
                        </p>
                        <button
                            onClick={handleLike}
                            style={{
                                padding: "5px 10px",
                                marginTop: "10px",
                                backgroundColor: "#A1EEBD",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                transition: "background-color 0.3s",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#7BD3EA")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#A1EEBD")
                            }
                        >
                            👍 좋아요
                        </button>
                        <p style={{ color: "#F6D6D6", marginTop: "20px" }}>
                            작성일: {new Date(boardData.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                        }}
                    >
                        <button
                            onClick={() => navigate(-1)}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#7FC7D9", // 뒤로가기 버튼 색상
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                transition: "background-color 0.3s",
                                marginBottom: "20px", // 뒤로가기 버튼과 수정 버튼 사이에 간격 추가
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#7BD3EA")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#7FC7D9")
                            }
                        >
                            뒤로가기
                        </button>
                        <br></br>
                        {currentUserId === boardData.memberId && (
                            <>
                                <button
                                    onClick={detail}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#7BD3EA",
                                        color: "#FFFFFF",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        transition: "background-color 0.3s",
                                        marginRight: "10px", // 수정 버튼과 삭제 버튼 사이에 간격 추가
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor = "#A1EEBD")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.backgroundColor = "#7BD3EA")
                                    }
                                >
                                    수정하기
                                </button>
                                <button
                                    onClick={deleteBoard}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#F6D6D6",
                                        color: "#FFFFFF",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        marginLeft: "10px",
                                        transition: "background-color 0.3s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor = "#A1EEBD")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.backgroundColor = "#F6D6D6")
                                    }
                                >
                                    삭제하기
                                </button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <></> // 데이터가 없는 경우 빈 상태로 유지
            )}
        </div>
    );
}
