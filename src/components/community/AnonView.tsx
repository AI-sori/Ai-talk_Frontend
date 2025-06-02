import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axiosInstance"; 
import SearchSvg from '../../assets/community/Search.svg';
import LikeSvg from '../../assets/community/Like.svg';
import { useNavigate } from "react-router-dom";

const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#7595D3" : "#eee")};
  color: ${({ active }) => (active ? "white" : "#333")};
  font-size: 14px;
  border: none;
  height: 37px;
  font-family: Regular;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background: #F5F5F5;
  color: #999;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.7rem 1rem;
  font-size: 14px;
  outline: none;
  background: #F5F5F5;
`;

const SearchIcon = styled.button`
  background: #F5F5F5;
  border: none;
  padding: 0 1rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const PostCard = styled.div`
  position: relative;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1.1rem;
  margin-top: 1rem;
  border-left: 5px solid #C9E6FF; 

  display: flex;
  flex-direction: column;
`;


const PostMeta = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 0.5rem;
  font-family: Regular;
`;

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: ExtraBold;
`;

const PostContent = styled.p`
   font-size: 14px;
  color: #424242;
  line-height: 1.4;
  font-family: Regular;
`;

const PostFooter = styled.div`
  margin-top: 0.8rem;
  display: flex;
  gap: 1.2rem;
  font-size: 12px;
  color: #777;
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

const AnonView = () => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axiosInstance.get("/community", {
          params: {
            sortBy: "id",
            direction: "desc",
          },
        });

        const allData: Post[] = response.data;
          console.log("전체 게시글 불러오기 성공:", allData);
        setAllPosts(allData);
      } catch (error) {
        console.error("커뮤니티 글 불러오기 실패:", error);
      }
    };

    fetchAllPosts();
  }, []);

  const totalPages = Math.ceil(allPosts.length / pageSize);
  const paginatedPosts = allPosts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <>
      <CategoryRow>
        {["전체", "질문", "정보공유", "일상", "후기"].map((label, idx) => (
          <CategoryButton key={label} active={idx === 0}>
            {label}
          </CategoryButton>
        ))}
      </CategoryRow>

      <SearchBox>
        <SearchInput placeholder="검색어를 입력하세요" />
        <SearchIcon>
          <img src={SearchSvg} alt="검색" width={20} height={20} />
        </SearchIcon>
      </SearchBox>

      {paginatedPosts.map((post) => (
        <PostCard
          key={post.postId}
          onClick={() => navigate(`/community/${post.postId}`)}
          style={{ cursor: "pointer" }}
        >
          <PostMeta>{post.category} · {post.nickname}</PostMeta>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <PostFooter>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <img src={LikeSvg} alt="좋아요" width={14} height={14} />
              {post.likeCount}
            </span>
          </PostFooter>
        </PostCard>
      ))}

      {/* 숫자 페이지 버튼 */}
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: currentPage === i ? "2px solid #7595D3" : "1px solid #ccc",
              backgroundColor: currentPage === i ? "#7595D3" : "#fff",
              color: currentPage === i ? "white" : "#333",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default AnonView;
