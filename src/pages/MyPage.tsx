import styled from 'styled-components';

const Page = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  background: #f7f9fb;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  background: #ddd;
  border-radius: 50%;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const Email = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 0.3rem;
`;

const EditBtn = styled.button`
  background: #abcfff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #94b5e9;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProgramBox = styled.div`
  margin-bottom: 1rem;
`;

const ProgramTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0.3rem;
`;

const ProgressBar = styled.div`
  background: #eee;
  border-radius: 10px;
  height: 8px;
  overflow: hidden;
`;

const Progress = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: #9fc9ff;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-top: 0.3rem;
`;

const ContinueBtn = styled.button`
  background: #abcfff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;

  &:hover {
    background: #94b5e9;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 0.7rem 0;
    border-top: 1px solid #eee;
    font-size: 14px;
    display: flex;
    justify-content: space-between;

    &:first-child {
      border-top: none;
    }
  }
`;

const RedText = styled.span`
  color: #f44;
  font-weight: 500;
`;

const Badge = styled.span`
  font-size: 12px;
  color: red;
  font-weight: bold;
`;

const Mypage = () => {
  return (
    <Page>
      <Card>
        <ProfileRow>
          <ProfileImg />
          <Info>
            <Name>김슈니</Name>
            <Email>suni@email.com</Email>
          </Info>
          <EditBtn>수정하기</EditBtn>
        </ProfileRow>
      </Card>

      <Card>
        <SectionTitle>학습중인 프로그램</SectionTitle>
        {[
          { title: '기초 수학', date: '2024-01-15', progress: 65 },
          { title: '한글 읽기', date: '2024-01-14', progress: 40 },
          { title: '영어 기초', date: '2024-01-13', progress: 25 },
        ].map(item => (
          <ProgramBox key={item.title}>
            <ProgramTitleRow>
              <span>{item.title}</span>
              <span>최근 학습일: {item.date}</span>
            </ProgramTitleRow>
            <ProgressBar>
              <Progress percent={item.progress} />
            </ProgressBar>
            <BottomRow>
              <span>진행률: {item.progress}%</span>
              <ContinueBtn>계속하기</ContinueBtn>
            </BottomRow>
          </ProgramBox>
        ))}
      </Card>

      <Card>
        <SectionTitle>커뮤니티 활동</SectionTitle>
        <List>
          <li>내 게시글</li>
          <li>내 댓글</li>
          <li>좋아요 게시글</li>
        </List>
      </Card>

      <Card>
        <SectionTitle>설정</SectionTitle>
        <List>
          <li>
            공지사항 <Badge>N</Badge>
          </li>
          <li>문의하기</li>
          <li>로그아웃</li>
          <li>
            <RedText>탈퇴하기</RedText>
          </li>
        </List>
      </Card>
    </Page>
  );
};

export default Mypage;
