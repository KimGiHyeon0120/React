import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { boardUpdate } from "../api/board1";

export default function BoardUpdate1({ boardData }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        boardId: boardData?.boardId || "",
        title: boardData?.title || "",
        content: boardData?.content || "",
        memberId: boardData?.memberId || "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit() {
        boardUpdate(formData)
            .then(function (res) {
                if (res.data.code === "200") {
                    alert("게시글이 수정되었습니다.");
                    navigate("/boardlist1");
                } else {
                    alert("수정에 실패했습니다.");
                }
            })
            .catch(function () {
                alert("수정 요청 중 오류가 발생했습니다.");
            });
    }

    return (
        <div>
            <h1>게시글 수정</h1>
            <div>
                <label>제목:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>내용:</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSubmit}>수정 완료</button>
            <button onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}
