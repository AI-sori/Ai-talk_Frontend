import styled from "styled-components";
import SearchSvg from '../../assets/community/Search.svg';
import LikeSvg from '../../assets/community/Like.svg';
import WriteSvg from '../../assets/community/Write.svg';
import { useNavigate } from "react-router-dom";

const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#C48DEF" : "#F3F4F6")};
  color: ${({ active }) => (active ? "white" : "#666666")};
  font-size: 14px;
  border: none;
  font-family: Regular;
  height: 37px;
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
  background: #f5f5f5;
  color: #999;
  
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.7rem 1rem;
  font-size: 14px;
  outline: none;
  background: #f5f5f5;
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
  border-left: 5px solid #F0EFFF; 

  display: flex;
  flex-direction: column;
`;


const PostMeta = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 0.5rem;
  font-family: Regular;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 0.5rem;
`;

const Badge = styled.span<{ bg: string; color: string }>`
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  font-size: 12px;
  font-family: Regular;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
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

const dummyPosts = [
  {
    id: 1,
    category: "발달지연",
    status: "답변완료",
    date: "2024.01.15",
    title: "언어발달이 또래보다 느린 것 같아요",
    content: "36개월 아이인데 또래보다 언어발달이 느린 것 같아 걱정입니다. 전문가 상담이 필요할까요?",
    views: 45,
    likes: 12,
    comments: 8,
  },
  {
    id: 2,
    category: "심리상담",
    status: "답변대기",
    date: "2024.02.03",
    title: "아이의 분리불안이 심한 편이에요",
    content: "어린이집에 등원할 때마다 아이가 격하게 울고 불안 증세를 보여 걱정입니다.",
    views: 62,
    likes: 9,
    comments: 5,
  },
  {
    id: 3,
    category: "교육",
    status: "답변완료",
    date: "2024.03.10",
    title: "집중력이 너무 짧은 것 같아요",
    content: "아이의 집중력이 매우 짧아 놀이나 활동을 5분 이상 지속하기 어려워요.",
    views: 31,
    likes: 7,
    comments: 2,
  },
  {
    id: 4,
    category: "발달지연",
    status: "답변대기",
    date: "2024.04.01",
    title: "걸음마가 너무 늦어요",
    content: "18개월이 되었는데 아직도 걷지 못하고 기기만 해서 걱정입니다.",
    views: 50,
    likes: 11,
    comments: 4,
  }
];

const ExpertView = () => {
  const navigate = useNavigate();

  return (
    <>
      <CategoryRow>
        {["전체", "심리상담", "발달지연", "교육"].map((label, idx) => (
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

      {dummyPosts.map((post) => (
        <PostCard
          key={post.id}
          onClick={() => navigate(`/consult/${post.id}`)}
          style={{ cursor: "pointer" }}
        >
          <BadgeRow>
            <Badge bg="#E9DFFF" color="#6A4CA4">{post.category}</Badge>
    
            <Badge bg={post.status === "답변완료" ? "#E1F8EA" : "#FFF6DA"} color={post.status === "답변완료" ? "#27854D" : "#B39B00"}>
              {post.status}
            </Badge>
          </BadgeRow>
          <PostMeta>{post.date}</PostMeta>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <PostFooter>
            <span>👁 {post.views}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <img src={LikeSvg} alt="좋아요" width={14} height={14} />
              {post.likes}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <img src={WriteSvg} alt="댓글" width={14} height={14} />
              {post.comments}
            </span>
          </PostFooter>
        </PostCard>
      ))}
    </>
  );
};

export default ExpertView;
