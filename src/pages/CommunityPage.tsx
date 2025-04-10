import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const WriteButton = styled.button`
  background-color: #94b5e9;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #7ca9e0;
  }
`;

const CardRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const InfoCard = styled.div<{ primary?: boolean }>`
  flex: 1;
  background-color: ${({ primary }) => (primary ? '#e4f0ff' : '#f9f9f9')};
  padding: 1rem;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? '#6485CF' : '#eee')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  font-size: 13px;
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.7rem 1rem;
  font-size: 14px;
  outline: none;
`;

const SearchIcon = styled.button`
  background: white;
  border: none;
  padding: 0 1rem;
  font-size: 16px;
  cursor: pointer;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  margin-top: 1rem;
`;

const PostMeta = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: #555;
`;

const PostFooter = styled.div`
  margin-top: 0.8rem;
  display: flex;
  gap: 1.2rem;
  font-size: 12px;
  color: #777;
`;

const CommunityPage = () => {
  return (
    <PageWrapper>
      <TitleRow>
        <Title>커뮤니티</Title>
        <WriteButton>글쓰기</WriteButton>
      </TitleRow>

      <CardRow>
        <InfoCard primary>익명 커뮤니티<br />자유롭게 이야기를 나눌 수 있는 공간입니다</InfoCard>
        <InfoCard>전문가 상담<br />전문가와 상담할 수 있는 공간입니다</InfoCard>
      </CardRow>

      <CategoryRow>
        {['전체', '질문', '정보공유', '일상', '후기'].map((label, idx) => (
          <CategoryButton key={label} active={idx === 0}>
            {label}
          </CategoryButton>
        ))}
      </CategoryRow>

      <SearchBox>
        <SearchInput placeholder="검색어를 입력하세요" />
        <SearchIcon>🔍</SearchIcon>
      </SearchBox>

      <PostCard>
        <PostMeta>질문 · 익명 · 2024.01.15</PostMeta>
        <PostTitle>아이가 그림을 잘 안그리는데 어떻게 하면 좋을까요?</PostTitle>
        <PostContent>
          우리 아이가 그림 그리는 걸 좋아하지 않아요. 어떻게 흥미를 가질 수 있게 할 수 있을까요?
        </PostContent>
        <PostFooter>
          <span>👁 45</span>
          <span>❤️ 12</span>
          <span>💬 8</span>
        </PostFooter>
      </PostCard>
    </PageWrapper>
  );
};

export default CommunityPage;
