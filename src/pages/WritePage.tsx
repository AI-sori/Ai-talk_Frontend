import CommunityWriteForm from "../components/write/CommunityWriteForm";
import ConsultWriteForm from "../components/write/ConsultWriteForm";
import styled from "styled-components";

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

const WritePage = ({ type }: { type: "anon" | "expert" }) => {
  return (
    <Outer>
      <BackgroundLayer>
        <Container>
          {type === "anon" ? <CommunityWriteForm /> : <ConsultWriteForm />}
        </Container>
      </BackgroundLayer>
    </Outer>
  );
};

export default WritePage;
