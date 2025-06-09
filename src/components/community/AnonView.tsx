import { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axiosInstance";
import SearchSvg from "../../assets/community/Search.svg";
import LikeSvg from "../../assets/community/Like.svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  &:focus {
    outline: none;
    box-shadow: none;
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
  &:focus {
    outline: none;
    box-shadow: none;
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
   color: black;
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
const PaginationButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: Regular;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? "#7595D3" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    box-shadow: none;
    border: 1px solid #ccc; 
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

const fetchAllPosts = async () => {
  const res = await axiosInstance.get("/community", {
    params: { sortBy: "id", direction: "desc" },
  });
  return res.data;
};

const fetchSearchPosts = async (keyword: string) => {
  const res = await axiosInstance.get("/community/search", {
    params: { keyword },
  });
  return res.data;
};

const AnonView = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchText, setSearchText] = useState("");

  const pageSize = 5;

  const { data: allPosts = [] } = useQuery({
    queryKey: ["allPosts"],
    queryFn: fetchAllPosts,
  });

  const { data: searchedPosts = [], refetch } = useQuery({
    queryKey: ["search", searchText],
    queryFn: () => fetchSearchPosts(searchText),
    enabled: !!searchText,
  });

const filteredPosts = (searchText ? searchedPosts : allPosts).filter(
  (post: Post) => selectedCategory === "전체" ? true : post.category === selectedCategory
);


  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = filteredPosts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleSearch = () => {
    setSearchText(keyword);
    setCurrentPage(0);
    refetch();
  };

  return (
    <>
      <CategoryRow>
        {["전체", "질문", "정보공유", "일상", "후기"].map((label) => (
          <CategoryButton
            key={label}
            active={selectedCategory === label}
            onClick={() => {
              setSelectedCategory(label);
              setCurrentPage(0);
            }}
          >
            {label}
          </CategoryButton>
        ))}
      </CategoryRow>

      <SearchBox>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="검색어를 입력하세요"
        />
        <SearchIcon onClick={handleSearch}>
          <img src={SearchSvg} alt="검색" width={20} height={20} />
        </SearchIcon>
      </SearchBox>

      {paginatedPosts.map((post: Post) => (
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
<div
      style={{
        marginTop: "1.5rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationButton
          key={i}
          onClick={() => setCurrentPage(i)}
          active={currentPage === i}
        >
          {i + 1}
        </PaginationButton>
      ))}

      </div>
      </>
  );
};

export default AnonView;
