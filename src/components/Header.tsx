import styled from 'styled-components';
import UserIcon from '../assets/User.svg';
import MainLogo from '../assets/Mainlogo.svg';
import { useNavigate, useLocation } from 'react-router-dom';


const HeaderOuter = styled.div`
  width: 100vw;
  background: #f9f9f9; // 홈 배경과 동일하게
  display: flex;
  justify-content: center;
`;

const HeaderInner = styled.header`
  width: 100%;
  max-width: 400px;
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
  padding: 0 1rem;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;



const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
`;

const LogoImg = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
`;

const Brand = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #9FC9FF;
   white-space: nowrap;
   font-family: SemiBold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.6rem;
  margin-left: 1.5rem;
`;

const NavItem = styled.span`
  font-size: 16px; 
   white-space: nowrap;
  font-weight: ${props => (props.active ? 800 : 600)};
  color: ${props => (props.active ? '#6485CF' : '#222')};
  cursor: pointer;
  padding: 6px 0; // 높이 정렬에 도움
 font-family: SemiBold;
  &:hover {
    color: #6485CF;
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <HeaderOuter>
      <HeaderInner>
        <LeftSection>
        <LogoArea onClick={() => navigate('/home')}>
            <LogoImg src={MainLogo} alt="Ai-Talk 로고" />
            <Brand>Ai-Talk</Brand>
          </LogoArea>
          <Nav>
            <NavItem
              active={location.pathname.startsWith('/learning')}
              onClick={() => navigate('/learning')}
            >
              학습
            </NavItem>
            <NavItem
              active={location.pathname.startsWith('/diagnosis')}
              onClick={() => navigate('/diagnosis')}
            >
              발달진단
            </NavItem>
            <NavItem
              active={location.pathname.startsWith('/community')}
              onClick={() => navigate('/community')}
            >
              커뮤니티
            </NavItem>
            <NavItem onClick={() => navigate('/mypage')}>
              <UserAvatar src={UserIcon} alt="마이페이지" />
            </NavItem>
          </Nav>
        </LeftSection>
      </HeaderInner>
      </HeaderOuter>
  );
};

export default Header;
