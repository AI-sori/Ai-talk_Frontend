import styled from "styled-components";
import BackSvg from "../../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  color: #333; 
  font-family: ExtraBold;
  margin-left: -20px;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0.6rem;
   font-family: Bold;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
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
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const Input = styled.input`
  width: 280px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  background: #f8f9fb;
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
    font-family: Regular;
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
  border: 1px solid #aaa;
  padding: 0.7rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
    font-family: Regular;
    
  &:focus,
  &:focus-visible {
    outline: none;
  }
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

    &:focus,
    &:focus-visible {
      outline: none;
    }
  &:hover {
    background: #7ca9e0;
  }
`;
const HiddenFileInput = styled.input`
  display: none;
`;
const CommunityWriteForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("질문");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // base64 string
  const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기용

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);
      setPreviewUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/community/post", {
        category,
        title,
        content,
        image,
      });
      console.log("등록 성공:", response.data);
      navigate("/community", { state: { tab: "anon" } });
    } catch (error) {
      console.error("등록 실패:", error);
      alert("글 등록에 실패했습니다.");
    }
  };
  

  return (
    <>
      <Back onClick={() => navigate("/community", { state: { tab: "anon" } })}>
        <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
        글쓰기
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

      <Label>
        사진 첨부{" "}
        <span style={{ fontWeight: "normal", color: "#888" }}>
          ({image ? "1" : "0"}/5)
        </span>
      </Label>
      <ImageUploadBox onClick={() => fileInputRef.current?.click()}>
        {previewUrl ? (
          <img src={previewUrl} alt="preview" style={{ width: "100%", height: "100%", borderRadius: "12px" }} />
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
        <CancelBtn onClick={() => navigate("/community", { state: { tab: "anon" } })}>
          취소
        </CancelBtn>
        <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
      </ButtonRow>
    </>
  );
};

export default CommunityWriteForm;
