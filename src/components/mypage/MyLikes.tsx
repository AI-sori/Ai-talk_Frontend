import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BackSvg from "../../assets/community/Back.svg";

interface LikePost {
  postId: number;
  nickname: string;
  category: string;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  comments: {
    id: number;
    nickname: string;
    content: string;
    createdAt: string;
  }[];
}

const MyLikes = () => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<LikePost[]>([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axiosInstance.get("/community/my-likes");
        setLikedPosts(response.data);
      } catch (error) {
        console.error("좋아요한 글 불러오기 실패:", error);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <Outer>
      <Wrapper>
        <Header>
          <BackIcon src={BackSvg} onClick={() => navigate("/mypage")} />
          <PageTitle>좋아요한 글</PageTitle>
        </Header>

        <Card>
          {likedPosts.map((post) => (
            <PostCard key={post.postId}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
             <PostMeta>
  <CategoryTag>{post.category}</CategoryTag>
  <span>좋아요 {post.likeCount}</span>
  <span>댓글 {post.comments?.length ?? 0}</span>
</PostMeta>

            </PostCard>
          ))}
        </Card>
      </Wrapper>
    </Outer>
  );
};

export default MyLikes;

// ---------------- 스타일 ----------------

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

const PostCard = styled.div`
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
`;

const PostContent = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0.8rem;
  line-height: 1.4;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #999;
  display: flex;
  flex-direction: row; 
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.6rem;
  font-family: Regular;
`;

const CategoryTag = styled.span`
  background: #d7e5ff;
  color: #4171d6;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 12px;
  font-weight: 500;
  font-family: Regular;
`;
