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

const ExpertView = () => {
  const navigate = useNavigate();
  const dummyIds = [1, 2];
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

      {dummyIds.map((id) => (
  <PostCard
    key={id}
    onClick={() => navigate(`/consult/${id}`)} //  임시로 ID 기반 상세 페이지 이동
    style={{ cursor: "pointer" }} // 클릭 가능한 커서
  >
    <BadgeRow>
      <Badge bg="#E9DFFF" color="#6A4CA4">발달지연</Badge>
      <Badge bg="#F0F0F0" color="#666">단답형</Badge>
      <Badge bg="#E1F8EA" color="#27854D">답변완료</Badge>
    </BadgeRow>
    <PostMeta>2024.01.15</PostMeta>
    <PostTitle>언어발달이 또래보다 느린 것 같아요</PostTitle>
    <PostContent>
      36개월 아이인데 또래보다 언어발달이 느린 것 같아 걱정입니다. 전문가 상담이 필요할까요?
    </PostContent>
    <PostFooter>
      <span>👁 45</span>
      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img src={LikeSvg} alt="좋아요" width={14} height={14} />
        12
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img src={WriteSvg} alt="댓글" width={14} height={14} />
        8
      </span>
    </PostFooter>
  </PostCard>
))}

    </>
  );
};

export default ExpertView;
