import styled from "styled-components";

const List = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  margin-right: 40px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  background: #f9faff;
  border-radius: 14px;
  padding: 0.8rem ;
  gap: 1rem;
  width: 290px;
   
  height: 50px;
`;

const NumberCircle = styled.div`
  width: 36px;
  height: 36px;
  background: #e6f0ff;
  border-radius: 50%;
  color: #6495cf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const Address = styled.div`
  font-size: 13px;
  color: #777;
  margin-top: 2px;
`;
const ListWrapper = styled.div`
  display: flex;
  justify-content: center;  
`;
type Hospital = {
  id: string;
  name: string;
  address: string;
};

const HospitalList = ({ hospitals }: { hospitals: Hospital[] }) => {
  return (
    <ListWrapper>
    <List>
      {hospitals.map((h, i) => (
        <Item key={h.id}>
          <NumberCircle>{i + 1}</NumberCircle>
          <Info>
            <Name>{h.name}</Name>
            <Address>{h.address}</Address>
          </Info>
        </Item>
      ))}
    </List>
    </ListWrapper>
  );
};

export default HospitalList;
