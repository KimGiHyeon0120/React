import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { boardUpdate } from "../api/board1";

export default function BoardUpdate1() {
    const location = useLocation();
    const navigate = useNavigate();

    const { boardData } = location.state || {};

    const [formData, setFormData] = useState({
        boardId: boardData?.boardId || "",
        title: boardData?.title || "",
        content: boardData?.content || "",
        memberId: boardData?.memberId || "",
    });

    useEffect(() => {
        if (!boardData) {
            alert("수정할 게시글 데이터가 없습니다.");
            navigate("/boardlist1");
        }
    }, [boardData, navigate]);

    // 입력값 변경 처리 함수
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // 게시글 수정 요청 처리 함수
    function handleSubmit() {
        console.log("전송 데이터 확인:", formData);

        boardUpdate(formData)
            .then(function (res) {
                console.log("서버 응답:", res.data);
                if (res.data.code === "200") {
                    alert("게시글이 수정되었습니다.");
                    navigate("/boardlist1");
                } else {
                    alert("수정에 실패했습니다.");
                }
            })
            .catch(function (err) {
                console.error("수정 요청 에러:", err);
                alert("수정 요청 중 오류가 발생했습니다.");
            });
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
            <h1 style={{ textAlign: "center", color: "#7BD3EA" }}>게시글 수정</h1>
            <div
                style={{
                    backgroundColor: "#FFFFFF",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="title"
                        style={{ display: "block", color: "#7BD3EA", fontWeight: "bold" }}
                    >
                        제목:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        style={{
                            width: "600px",
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
                        style={{ display: "block", color: "#7BD3EA", fontWeight: "bold" }}
                    >
                        내용:
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows="6"
                        style={{
                            width: "600px",
                            height: "400px",
                            padding: "10px",
                            border: "2px solid #F6D6D6",
                            borderRadius: "5px",
                            fontSize: "16px",
                            color: "#333",
                        }}
                    />
                </div>

                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={handleSubmit}
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
                    >
                        수정 완료
                    </button>
                    <button
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
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
