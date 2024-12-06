import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { boarddetail, boardRemove } from "../api/board1";

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
        <div>
            {boardData ? (
                <>
                    <h1>게시글 상세보기</h1>
                    <p>제목: {boardData.title}</p>
                    <p>내용: {boardData.content}</p>
                    <p>작성자: {boardData.memberId}</p>
                    <p>좋아요 수: {boardData.boardGood}</p>
                    <p>작성일: {new Date(boardData.createdAt).toLocaleString()}</p>

                    {currentUserId === boardData.memberId && (
                        <div style={{ marginTop: "20px" }}>
                            <button
                                onClick={detail}
                                style={{
                                    marginRight: "10px",
                                    padding: "10px 20px",
                                    backgroundColor: "blue",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                수정하기
                            </button>
                            <button
                                onClick={deleteBoard}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                삭제하기
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <></> // 데이터가 없는 경우 빈 상태로 유지
            )}
        </div>
    );
}
