import styled from "styled-components";

const Outer = styled.div`
  height: 100dvh;
  width: 100vw;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const HomePage = () => {
  return (
    <Outer>
      <Container>

        <Card>
          <h3>우리 아이 발달 그래프</h3>
          <div style={{ height: 160, background: "#f0f0ff", borderRadius: 12 }} />
        </Card>

        <Card>
          <h3>맞춤 학습 프로그램</h3>
          <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
            <div style={{ width: 160, height: 100, background: "#e0e0ff", borderRadius: 12 }} />
            <div style={{ width: 160, height: 100, background: "#e0e0ff", borderRadius: 12 }} />
          </div>
        </Card>

        <Card>
          <h3>주변 병원 찾기</h3>
          <div style={{ height: 160, background: "#eee", borderRadius: 12 }} />
          <ul style={{ marginTop: "1rem" }}>
            <li>1. 서울아이발달센터</li>
            <li>2. 키즈병원부리</li>
          </ul>
        </Card>
      </Container>
    </Outer>
  );
};

export default HomePage;
