import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
 import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";

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

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1.2rem;
   margin-left: -20px;
  cursor: pointer;
  font-weight: bold;
  color: #333; 
  font-family: ExtraBold;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 13px;
  color: #888;
  font-family: Regular;
`;

const Tag = styled.span`
  background: #d7e5ff;
  color: #4171d6;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  font-family: Regular;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: Bold;
`;

const Content = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  background: #ececff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 20px;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 14px;
  color: #777;
  padding: 0.8rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const CommentTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const Comment = styled.div`
  margin-bottom: 1rem;
  font-family: Regular;
`;

const CommentAuthor = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 0.2rem;
  font-family: Regular;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #444;
  font-family: Regular;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #aaa;
  font-family: Regular;
`;

const CommentInputWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.7rem 1rem;
  font-size: 14px;
  border-radius: 10px;
  font-family: Regular;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background: #94b5e9;
  color: white;
  padding: 0.7rem 1.2rem;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  font-family: Regular;
  cursor: pointer;
`;

const CommunityPostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 postId 추출
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/community/${id}`);
        console.log("✅ 게시글 상세 응답:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("❌ 게시글 상세 불러오기 실패:", error);
      }
    };

    if (id) fetchPost();
  }, [id]);

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Back onClick={() => navigate(-1)}>
            <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
            커뮤니티
          </Back>

          {post ? (
            <>
              <Meta>
                <Tag>{post.category || "카테고리"}</Tag>
                <span>{post.nickname || "익명"}</span>
                <span>날짜 없음</span> {/* 날짜 데이터가 없으므로 하드코딩 or 추후 백엔드 제공 필요 */}
              </Meta>

              <Title>{post.title}</Title>
              <Content>{post.content}</Content>

              {post.image ? (
                <img
                  src={post.image}
                  alt="게시글 이미지"
                  style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }}
                />
              ) : (
                <ImageBox>이미지 없음</ImageBox>
              )}

              <StatusRow>
                <span>🤍 좋아요 {post.likeCount}</span>
              </StatusRow>

              <CommentTitle>댓글 0</CommentTitle> {/* 댓글 기능 구현 전이므로 0으로 표시 */}

              <CommentInputWrapper>
                <CommentInput placeholder="댓글을 입력해주세요" />
                <SubmitButton>등록</SubmitButton>
              </CommentInputWrapper>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default CommunityPostDetailPage;
