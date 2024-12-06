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
        <div>
            <h1>글쓰기</h1>
            <input
                type="text"
                placeholder="제목 입력"
                ref={titleRef}
            /><br/>
            <textarea
                placeholder="내용 입력"
                ref={contentRef}
            /><br/>
            <input
                type="button"
                value="글쓰기"
                onClick={writePostAction}
            />
        </div>
    );
}
