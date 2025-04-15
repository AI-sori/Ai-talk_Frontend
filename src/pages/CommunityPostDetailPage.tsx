import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";

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

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1.2rem;
   margin-left: -20px;
  cursor: pointer;
  font-weight: bold;
  color: #333; 
  font-family: ExtraBold;
`;

const Meta = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 13px;
  color: #888;
  font-family: Regular;
`;

const Tag = styled.span`
  background: #d7e5ff;
  color: #4171d6;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  font-family: Regular;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: Bold;
`;

const Content = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  background: #ececff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 20px;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 14px;
  color: #777;
  padding: 0.8rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const CommentTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const Comment = styled.div`
  margin-bottom: 1rem;
  font-family: Regular;
`;

const CommentAuthor = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 0.2rem;
  font-family: Regular;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #444;
  font-family: Regular;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #aaa;
  font-family: Regular;
`;

const CommentInputWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.7rem 1rem;
  font-size: 14px;
  border-radius: 10px;
  font-family: Regular;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background: #94b5e9;
  color: white;
  padding: 0.7rem 1.2rem;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  font-family: Regular;
  cursor: pointer;
`;

const CommunityPostDetailPage = () => {
  const navigate = useNavigate();

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Back onClick={() => navigate(-1)}>
            <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
            커뮤니티
          </Back>

          <Meta>
            <Tag>질문</Tag>
            <span>익명</span>
            <span>2024.01.15</span>
          </Meta>

          <Title>아이가 그림을 잘 안그리는데 어떻게 하면 좋을까요?</Title>
          <Content>
            우리 아이가 그림 그리는 걸 좋아하지 않아요. 어떻게 흥미를 가질 수 있게 할 수 있을까요?
            다른 부모님들은 어떻게 하시나요?
          </Content>

          <ImageBox>400 × 400</ImageBox>

          <StatusRow>
            <span>🤍 좋아요 12</span>
            <span>👁 조회 45</span>
          </StatusRow>

          <CommentTitle>댓글 2</CommentTitle>

          <Comment>
            <CommentAuthor>초등맘</CommentAuthor>
            <CommentText>저희 아이도 처음엔 그랬어요. 아이가 좋아하는 캐릭터부터 시작해보세요.</CommentText>
            <CommentDate>2024.01.15</CommentDate>
          </Comment>

          <Comment>
            <CommentAuthor>미술쌤</CommentAuthor>
            <CommentText>색연필보다 크레파스나 물감으로 시작하면 더 재미있어 할 수 있어요.</CommentText>
            <CommentDate>2024.01.15</CommentDate>
          </Comment>

          <CommentInputWrapper>
            <CommentInput placeholder="댓글을 입력해주세요" />
            <SubmitButton>등록</SubmitButton>
          </CommentInputWrapper>
        </Container>
      </Wrapper>
    </Outer>
  );
};

export default CommunityPostDetailPage;
