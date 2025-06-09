import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import BackSvg from "../assets/community/Back.svg";

const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const BackgroundLayer = styled.div`
  width: 100%;
  max-width: 400px;
  background: #f8fafc;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1.2rem;
  cursor: pointer;
  color: #333;
  font-family: ExtraBold;
  margin-left: -20px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0.6rem;
  font-family: Bold;
  color: black;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#E9F0FF" : "#eee")};
  color: ${({ active }) => (active ? "#7595D3" : "#666666")};
  font-size: 14px;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  font-family: Regular;
`;

const Input = styled.input`
  width: 280px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  background: #f8f9fb;
  color: black;
  margin-bottom: 1.5rem;
  font-size: 14px;
  font-family: Regular;
`;

const Textarea = styled.textarea`
  width: 280px;
  height: 120px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  background: #f8f9fb;
  resize: none;
  color: black;
  margin-bottom: 1.5rem;
  font-size: 14px;
  font-family: Regular;
`;

const ImageUploadBox = styled.div`
  width: 60px;
  height: 60px;
  background: #f1f1f1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  color: black;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const CancelBtn = styled.button`
  flex: 1;
  background: #fff;
  color: black;
  border: 1px solid #aaa;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-family: Regular;
`;

const SubmitBtn = styled.button`
  flex: 1;
  background: #94b5e9;
  border: none;
  color: white;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-family: Regular;
  &:hover {
    background: #7ca9e0;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CommunityEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("질문");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axiosInstance.get(`/community/${id}`);
      const data = res.data;
      setCategory(data.category);
      setTitle(data.title);
      setContent(data.content);
      setPreviewUrl(data.image || "");
    };
    fetchPost();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("content", content);

    // 이미지 파일이 있으면 파일 첨부
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await axiosInstance.put(`/community/post/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    navigate(`/community/${id}`);
  } catch (error) {
    console.error("수정 실패:", error);
    alert("수정 중 오류가 발생했습니다.");
  }
};


  return (
    <>
     <Outer>
    <BackgroundLayer>
      <Container>
      <Back onClick={() => navigate(-1)}>
        <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
        글 수정
      </Back>

      <Label>카테고리 선택</Label>
      <CategoryRow>
        {["질문", "정보공유", "일상", "후기"].map((cat) => (
          <CategoryButton
            key={cat}
            active={cat === category}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryRow>

      <Label>제목</Label>
      <Input
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label>내용</Label>
      <Textarea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Label>사진 첨부</Label>
      <ImageUploadBox onClick={() => fileInputRef.current?.click()}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            style={{ width: "100%", height: "100%", borderRadius: "12px" }}
          />
        ) : (
          "+"
        )}
      </ImageUploadBox>
      <HiddenFileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <ButtonRow>
        <CancelBtn onClick={() => navigate(`/community/${id}`)}>
  취소
</CancelBtn>
        <SubmitBtn onClick={handleSubmit}>수정 완료</SubmitBtn>
      </ButtonRow>
      </Container>
    </BackgroundLayer>
  </Outer>
    </>
  );
};

export default CommunityEditPage;
