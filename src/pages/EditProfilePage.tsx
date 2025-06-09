import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BackSvg from "../assets/community/Back.svg";
import { FaUserCircle } from "react-icons/fa";

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 20px;
  color: black;
  font-weight: bold;
  font-family: Bold;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-family: Regular;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const ProfileImage = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  svg {
    width: 100%;
    height: 100%;
    color: #aaa;
  }

  input {
    display: none;
  }
`;


const Label = styled.label`
  font-size: 14px;
  margin-bottom: 0.3rem;
  color: black;
  display: block;
  font-family: Medium;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  color: black;
  padding: 0.7rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 14px;
  font-family: Regular;
  background: white;
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveBtn = styled.button`
  flex: 1;
  background: #9FC9FF;
  color: white;
  font-size: 15px;
  padding: 0.7rem;
  border: none;
  font-family: Regular;
  border-radius: 10px;
  cursor: pointer;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const CancelBtn = styled.button`
  flex: 1;
  background: #fff;
  border: 1px solid #aaa;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
    font-family: Regular;
    color: black;
    
  &:focus,
  &:focus-visible {
    outline: none;
  }
     &:hover {
    background: #fff;
    border: 1px solid #aaa;
    color: inherit;
  }
`;

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [original, setOriginal] = useState({
    email: "",
    nickname: "",
    profileImage: "",
  });

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/members/profile");
        const data = res.data.result;
        setOriginal(data);
        setNickname(data.nickname);
        setEmail(data.email);
        setProfileImagePreview(data.profileImage);
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageFile(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname || original.nickname);
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      const res = await axiosInstance.put("/members/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("프로필 수정 성공:", res.data);
      alert("프로필이 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Header>
            <Title>프로필 수정</Title>
            <BackBtn onClick={() => navigate("/mypage")}>
              <img src={BackSvg} alt="뒤로가기" width={18} />
              뒤로가기
            </BackBtn>
          </Header>

          <ProfileImageWrapper>
            <ProfileImage>
  {profileImagePreview ? (
    <img src={profileImagePreview} alt="프로필 이미지" />
  ) : (
    <FaUserCircle />
  )}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />
</ProfileImage>

            <div style={{ fontSize: "13px", color: "#999", marginTop: "0.5rem" }}>
              프로필 사진 변경
            </div>
          </ProfileImageWrapper>

          <Label>이름</Label>
          <InputWrapper>
            <Input
              placeholder="이름을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </InputWrapper>

          <Label>이메일</Label>
          <InputWrapper>
            <Input value={email} readOnly />
          </InputWrapper>

          <Label>비밀번호</Label>
          <InputWrapper>
            <Input value="********" readOnly />
          </InputWrapper>

          <ButtonRow>
            <SaveBtn onClick={handleSave}>저장하기</SaveBtn>
            <CancelBtn onClick={() => navigate("/mypage")}>취소</CancelBtn>
          </ButtonRow>
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default EditProfilePage;