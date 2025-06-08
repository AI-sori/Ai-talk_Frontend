import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/mypage/Modal"; 
import axiosInstance from "../api/axiosInstance";

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
  width: 60px;
  height: 60px;               
  border-radius: 50%;
  overflow: hidden;
  background-color: #ddd;
  flex-shrink: 0;             

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
    font-family: Bold;
`;

const Email = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 0.3rem;
    font-family: Regular;
`;

const EditBtn = styled.button`
  background: #abcfff;
  color: white;
  border: none;
  width: 95px;
  height: 35px;
  white-space: nowrap;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  font-size: 14px;
    font-family: Regular;
  cursor: pointer;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    background: #94b5e9;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: Bold;
`;

const ProgramBox = styled.div`
  margin-bottom: 1rem;
  font-family: Bold;
`;

const ProgramTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0.3rem;
`;
const ProgramCard = styled.div`
  background: #EEF6FF;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
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
  font-family: Regular;
  border: none;
  width: 80px;
  height: 35px;
  border-radius: 8px;
  font-size: 13px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;

  &:hover {
    background: #94b5e9;
  }
    &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  font-family: Regular;
  list-style: none;

  li {
    padding: 0.7rem 0;
    border-top: 1px solid #eee;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

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

interface Profile {
  email: string;
  nickname: string;
  profileImage: string;
}

const Mypage = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<null | 'logout' | 'withdraw'>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleLogout = () => {
    setModalType('logout');
  };

  const handleWithdraw = () => {
    setModalType('withdraw');
  };

  const handleCancel = () => setModalType(null);
  
  const handleConfirm = () => {
    if (modalType === 'logout') {
      // 로그아웃 로직
      console.log("로그아웃 완료");
      // navigate('/login');
    } else {
      // 탈퇴 로직
      console.log("탈퇴 완료");
      // navigate('/goodbye');
    }
    setModalType(null);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/members/profile");
        setProfile(res.data.result);
         console.log("프로필 조회:", res.data.result);
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Outer>
      <Wrapper>
        <Card>
          <ProfileRow>
            <ProfileImg>
  {profile?.profileImage ? (
    <img src={profile.profileImage} alt="프로필 이미지" />
  ) : (
    <span>이미지 없음</span>
  )}
</ProfileImg>

            <Info>
              <Name>{profile?.nickname ?? "닉네임"}</Name>
              <Email>{profile?.email ?? "이메일"}</Email>
            </Info>
            <EditBtn onClick={() => navigate("/mypage/edit")}>수정하기</EditBtn>
          </ProfileRow>
        </Card>

        <Card>
          <SectionTitle>학습중인 프로그램</SectionTitle>
          {[
            { title: "기초 수학", date: "2024-01-15", progress: 65 },
            { title: "한글 읽기", date: "2024-01-14", progress: 40 },
            { title: "영어 기초", date: "2024-01-13", progress: 25 },
          ].map((item) => (
            <ProgramCard key={item.title}>
              <ProgramBox>
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
            </ProgramCard>
          ))}
        </Card>

        <Card>
          <SectionTitle>커뮤니티 활동</SectionTitle>
          <List>
            <li onClick={() => navigate("/mypage/myposts")}>내 게시글</li>
            <li onClick={() => navigate("/mypage/mycomments")}>내 댓글</li>
            <li onClick={() => navigate("/mypage/mylikes")}>좋아요 게시글</li>
          </List>

        </Card>

        <Card>
          <SectionTitle>설정</SectionTitle>
          <List>
            <li onClick={() => navigate("/mypage/notice")}>
              공지사항 <Badge>N</Badge>
            </li>
            <li onClick={() => navigate("/mypage/inquiry")}>문의하기</li>
            <li onClick={handleLogout}>로그아웃</li>
            <li onClick={handleWithdraw}>
              <RedText>탈퇴하기</RedText>
            </li>
          </List>

          {modalType && (
            <Modal
              type={modalType}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          )}
        </Card>
      </Wrapper>
    </Outer>
  );
};

export default Mypage;
