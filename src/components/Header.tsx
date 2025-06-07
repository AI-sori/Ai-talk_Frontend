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

const HeaderInner = styled.header<{ isDiagnosis: boolean }>`
   width: 100%;
  max-width: ${({ isDiagnosis }) => (isDiagnosis ? '100%' : '400px')};
  margin: ${({ isDiagnosis }) => (isDiagnosis ? '0 auto' : '0')};
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
  padding: 0 1rem;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: ${({ isDiagnosis }) => (isDiagnosis ? '0 1rem' : '0 0.5rem')};
  }
`;


const LeftSection = styled.div<{ isDiagnosis: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ isDiagnosis }) => (isDiagnosis ? '100%' : '100%')};
`;


const LogoImg = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
`;

const Brand = styled.span<{ isDiagnosis: boolean }>`
  font-size: ${({ isDiagnosis }) => (isDiagnosis ? '26px' : '18px')};
  font-weight: bold;
  color: #9FC9FF;
  white-space: nowrap;
  font-family: SemiBold;
`;

const Nav = styled.nav<{ isDiagnosis: boolean }>`
  display: flex;
  gap: ${({ isDiagnosis }) => (isDiagnosis ? '2rem' : '1.6rem')};
 
`;


const NavItem = styled.span<{ active?: boolean; isDiagnosis?: boolean }>`
  font-size: ${({ isDiagnosis }) => (isDiagnosis ? '19px' : '16px')};
  white-space: nowrap;
  font-weight: ${({ active }) => (active ? 800 : 600)};
  color: ${({ active }) => (active ? '#6485CF' : '#222')};
  cursor: pointer;
  padding: 6px 0;
  margin-top: 8px;
  font-family: SemiBold;

  &:hover {
    color: #6485CF;
  }
`;
const HeaderContent = styled.div<{ isDiagnosis: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.1rem;
`;

const LogoArea = styled.div<{ isDiagnosis: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  margin-left: ${({ isDiagnosis }) => (isDiagnosis ? '0.1rem' : '0')};
`;


const UserAvatar = styled.img<{ isDiagnosis?: boolean }>`
  width: ${({ isDiagnosis }) => (isDiagnosis ? '32px' : '25px')};
  height: ${({ isDiagnosis }) => (isDiagnosis ? '32px' : '25px')};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDiagnosis = location.pathname.startsWith('/diagnosis');
return (
  <HeaderOuter>
    <HeaderInner isDiagnosis={isDiagnosis}>
      {isDiagnosis ? (
        <HeaderContent isDiagnosis={true}>
          <LogoArea onClick={() => navigate('/home')} isDiagnosis={true}>
            <LogoImg src={MainLogo} alt="Ai-Talk 로고" />
            <Brand isDiagnosis={true}>Ai-Talk</Brand>
          </LogoArea>
          <Nav isDiagnosis={true}>
            <NavItem
              active={location.pathname.startsWith('/learning')}
              onClick={() => navigate('/learning')}
              isDiagnosis={true}
            >
              학습
            </NavItem>
            <NavItem
              active={location.pathname.startsWith('/diagnosis')}
              onClick={() => navigate('/diagnosis')}
              isDiagnosis={true}
            >
              발달진단
            </NavItem>
            <NavItem
              active={location.pathname.startsWith('/community')}
              onClick={() => navigate('/community')}
              isDiagnosis={true}
            >
              커뮤니티
            </NavItem>
            <NavItem onClick={() => navigate('/mypage')}>
              <UserAvatar src={UserIcon} alt="마이페이지" isDiagnosis={true} />
            </NavItem>
          </Nav>
        </HeaderContent>
      ) : (
        <LeftSection isDiagnosis={false}>
          <LogoArea onClick={() => navigate('/home')} isDiagnosis={false}>
            <LogoImg src={MainLogo} alt="Ai-Talk 로고" />
            <Brand isDiagnosis={false}>Ai-Talk</Brand>
          </LogoArea>
          <Nav isDiagnosis={false}>
            <NavItem
              active={location.pathname.startsWith('/learning')}
              onClick={() => navigate('/learning')}
              isDiagnosis={false}
            >
              학습
            </NavItem>
            <NavItem
              active={location.pathname.startsWith('/diagnosis')}
              onClick={() => navigate('/diagnosis')}
              isDiagnosis={false}
            >
              발달진단
            </NavItem>
            <NavItem
              active={location.pathname.startsWith('/community')}
              onClick={() => navigate('/community')}
              isDiagnosis={false}
            >
              커뮤니티
            </NavItem>
            <NavItem onClick={() => navigate('/mypage')}>
              <UserAvatar src={UserIcon} alt="마이페이지" isDiagnosis={false} />
            </NavItem>
          </Nav>
        </LeftSection>
      )}
    </HeaderInner>
  </HeaderOuter>
);

};

export default Header;
