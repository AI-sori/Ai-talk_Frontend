import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import LikeIcon from "../assets/Like.svg";
import LikeAfterIcon from "../assets/Likeafter.svg";

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
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const CommentAuthor = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #111;
  font-family: Regular;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: #999;
  font-family: Regular;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #444;
  font-family: Regular;
  line-height: 1.5;
  white-space: pre-line;
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

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }

  span {
    font-size: 14px;
    color: #777;
  }
`;

type Post = {
  postId: number;
  nickname: string;
  category: string;
  title: string;
  content: string;
  image: string;
  likeCount: number;
};
type Comment = {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
};
const CommunityPostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/community/${id}`);
      setPost(res.data);
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (error) {
      console.error("게시글 상세 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const handleLikeToggle = async () => {
    if (!id) return;

    try {
      if (liked) {
        await axiosInstance.delete(`/community/${id}/like`);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await axiosInstance.post(`/community/${id}/like`);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!id || !comment.trim()) return;

    try {
      await axiosInstance.post("/community/comments", {
        postId: Number(id),
        content: comment.trim(),
      });
      setComment("");
      fetchPost(); // 등록 후 게시글 다시 불러오기
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Back onClick={() => navigate("/community")}>
            <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
            커뮤니티
          </Back>

          {post ? (
            <>
              <Meta>
                <Tag>{post.category}</Tag>
                <span>{post.nickname}</span>
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
                <LikeBox onClick={handleLikeToggle}>
                  <img src={liked ? LikeAfterIcon : LikeIcon} alt="좋아요" />
                  <span>{likeCount}</span>
                </LikeBox>
              </StatusRow>

              <CommentTitle>댓글 {post.comments.length}</CommentTitle>

             {post.comments.map((c) => (
  <Comment key={c.id}>
    <CommentHeader>
      <CommentText>{c.content}</CommentText>
      <CommentDate>{c.createdAt.slice(0, 10)}</CommentDate>
    </CommentHeader>
     <CommentAuthor>{c.nickname}</CommentAuthor>
  </Comment>
))}


              <CommentInputWrapper>
                <CommentInput
                  placeholder="댓글을 입력해주세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <SubmitButton onClick={handleSubmitComment}>등록</SubmitButton>
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