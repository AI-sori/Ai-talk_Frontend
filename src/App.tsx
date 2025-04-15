import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import LearningPage from './pages/LearningPage';
import DiagnosisPage from './pages/DiagnosisPage';
import CommunityPage from './pages/CommunityPage';
import Mypage from './pages/Mypage';
import WritePage from "./pages/WritePage";
import ConsultDetailPage from "./pages/ConsultDetailPage"; 
import CommunityPostDetailPage from "./pages/CommunityPostDetailPage";
import EditProfilePage from "./pages/EditProfilePage";
import NoticePage from "./pages/NoticePage";
import InquiryPage from "./pages/InquiryPage";

function AppLayout() {
  const location = useLocation();
  const isPublic = location.pathname === '/' || location.pathname === '/onboarding';

  return (
    <>
      {!isPublic && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/community/write" element={<WritePage type="anon" />} />
        <Route path="/consult/write" element={<WritePage type="expert" />} />
        <Route path="/consult/1" element={<ConsultDetailPage hasReply={false} />} />
        <Route path="/consult/2" element={<ConsultDetailPage hasReply={true} />} />
        <Route path="/community/1" element={<CommunityPostDetailPage />} />
        <Route path="/mypage/edit" element={<EditProfilePage />} />
        <Route path="/mypage/notice" element={<NoticePage />} />
        <Route path="/mypage/inquiry" element={<InquiryPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout /> {/* ✅ useLocation은 Router 안에서만 호출 가능 */}
    </Router>
  );
}

export default App;
