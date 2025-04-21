import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import { useNavigate } from "react-router-dom";

interface ConsultDetailProps {
  hasReply: boolean;
}

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
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;


const Tag = styled.span<{ bg: string; color: string }>`
background: ${({ bg }) => bg};
color: ${({ color }) => color};
font-size: 12px;
padding: 4px 8px;
border-radius: 15px;
font-weight: 500;
font-family: Regular;
`;

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.8rem;
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
  font-family: Regular;
`;

const ReplyBox = styled.div`
  margin-top: 2rem;
  background: #F0EFFF;
  padding: 1rem;
  border-radius: 12px;
`;

const Counselor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.6rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-family: Regular;
`;

const Footer = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 14px;
  padding: 1.2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
  font-family: Regular;
  font-size: 14px;
`;

const ButtonRow = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const Btn = styled.button<{ bg: string; color: string }>`
  flex: 1;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border: none;
  padding: 0.7rem;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Regular;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const ConsultDetailPage = ({ hasReply }: ConsultDetailProps) => {
  const navigate = useNavigate();

  return (
    <Outer>
      <Wrapper>
        <Container>
        <Back>
  <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
  상담 내역 
</Back>

<Meta>
  <Tag bg="#C8BFFF" color="#fff">발달치료</Tag>
  <Tag
    bg={hasReply ? "#EFFFE9" : "#FFF5F5"}
    color={hasReply ? "#126B00" : "#FF4646"} 
  >
    {hasReply ? "답변완료" : "답변대기"}
  </Tag>
  <span style={{ fontSize: "13px", color: "#999" }}>2024.01.15</span>
</Meta>


          <Title>언어발달이 또래보다 느린 것 같아요</Title>
          <Content>
            36개월 아이인데 또래보다 언어발달이 느린 것 같아 걱정입니다. 전문가의 상담이 필요할까요?
          </Content>

          {hasReply ? (
            <ReplyBox>
              <Counselor>
                <Avatar>80×80</Avatar>
                <NameBox>
                  <strong>김지원 상담사</strong>
                  <span>아동발달치료사</span>
                </NameBox>
              </Counselor>
              <Content style={{ fontSize: "14px", color: "#444", marginBottom: "0.8rem" }}>
                안녕하세요. 아이의 언어발달에 대해 걱정이 많으시군요. 36개월이면 일반적으로
                2~3단어로 된 문장을 사용하고, 간단한 대화가 가능한 시기입니다.
                하지만 모든 아이의 발달 속도가 다르기 때문에, 전문가의 발달 검사를 통해
                정확한 상황을 파악하는 것이 좋습니다. 현재 아이의 구체적인 언어 사용 상황을
                여쭤보고 싶습니다.
              </Content>
              <span style={{ fontSize: "12px", color: "#999" }}>2024.01.16</span>
            </ReplyBox>
          ) : (
            <Content style={{ marginTop: "2rem", color: "#aaa", textAlign: "center" }}>
              아직 상담사의 답변이 등록되지 않았습니다.
            </Content>
          )}
        </Container>

        <Footer>
          추가로 궁금하신 점이 있으신가요?
          <ButtonRow>
            <Btn bg="#F0EFFF" color="#C48DEF" onClick={() => navigate("/community")}>
              목록으로
            </Btn>
            <Btn bg="#C48DEF" color="white">추가 질문하기</Btn>
          </ButtonRow>
        </Footer>
      </Wrapper>
    </Outer>
  );
};

export default ConsultDetailPage;
