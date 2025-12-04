import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BackSvg from "../../assets/community/Back.svg";

interface Post {
  postId: number;
  title: string;
  category: string;
  createdAt: string;
}

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/community/my-posts");
      console.log("내 게시글 조회:", response.data.data);
      setPosts(response.data.data);
    } catch (error) {
      console.error("내 게시글 불러오기 실패:", error);
    }
  };

  fetchPosts();
}, []);

  return (
    <Outer>
      <Wrapper>
        <Header>
          <BackIcon src={BackSvg} onClick={() => navigate("/mypage")} />
          <PageTitle>내 게시글</PageTitle>
        </Header>

        <Card>
          {posts.map((post) => (
            <PostCard key={post.postId}>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.category}</span>
              </PostMeta>
            </PostCard>
          ))}
        </Card>
      </Wrapper>
    </Outer>
  );
};

export default MyPosts;


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
   color: black;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
`;
