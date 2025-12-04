import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BackSvg from "../../assets/community/Back.svg";

interface CommentItem {
  commentId: number;
  postTitle: string;
  content: string;
  createdAt: string;
}

const MyComments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<CommentItem[]>([]);

useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get("/community/my-comments");
      setComments(res.data.data);
      console.log("내 댓글 조회:", res.data.data);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  };

  fetchComments();
}, []);  

  return (
    <Outer>
      <Wrapper>
        <Header>
          <BackIcon src={BackSvg} onClick={() => navigate("/mypage")} />
          <PageTitle>내 댓글</PageTitle>
        </Header>

        <Card>
          {comments.map((item) => (
            <CommentCard key={item.commentId}>
              <PostTitle>{item.postTitle}</PostTitle>
              <CommentText>{item.content}</CommentText>
              <MetaText>
                {new Date(item.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </MetaText>
            </CommentCard>
          ))}
        </Card>
      </Wrapper>
    </Outer>
  );
};

export default MyComments;


// ----- 스타일 -----

const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background: #f8fafc;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
   color: black;
`;

const BackIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const PageTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-family: Bold;
  color: black;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  color: black;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const PostTitle = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 0.4rem;
  color: black;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: black;
  margin-bottom: 0.6rem;
`;

const MetaText = styled.div`
  font-size: 12px;
  color: #999;
`;
