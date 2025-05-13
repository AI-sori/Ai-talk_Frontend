import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import LearningPage from './pages/LearningPage';
import DiagnosisPage from './pages/DiagnosisPage';
import CommunityPage from './pages/CommunityPage';
import Mypage from './pages/MyPage';
import WritePage from "./pages/WritePage";
import ConsultDetailPage from "./pages/ConsultDetailPage"; 
import CommunityPostDetailPage from "./pages/CommunityPostDetailPage";
import EditProfilePage from "./pages/EditProfilePage";
import NoticePage from "./pages/NoticePage";
import InquiryPage from "./pages/InquiryPage";
import useAuthStore from "./stores/useAuthStore";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/" />;
};

function AppLayout() {
  const location = useLocation();
  const isPublic = location.pathname === '/' || location.pathname === '/onboarding';

  return (
    <>
      {!isPublic && <Header />}
      <Routes>
     
        <Route path="/" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* (로그인 필요) */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
        <Route path="/diagnosis" element={<ProtectedRoute><DiagnosisPage /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        <Route path="/mypage" element={<ProtectedRoute><Mypage /></ProtectedRoute>} />
        <Route path="/community/write" element={<ProtectedRoute><WritePage type="anon" /></ProtectedRoute>} />
        <Route path="/consult/write" element={<ProtectedRoute><WritePage type="expert" /></ProtectedRoute>} />
        <Route path="/consult/1" element={<ProtectedRoute><ConsultDetailPage hasReply={false} /></ProtectedRoute>} />
        <Route path="/consult/2" element={<ProtectedRoute><ConsultDetailPage hasReply={true} /></ProtectedRoute>} />
        <Route path="/community/1" element={<ProtectedRoute><CommunityPostDetailPage /></ProtectedRoute>} />
        <Route path="/mypage/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path="/mypage/notice" element={<ProtectedRoute><NoticePage /></ProtectedRoute>} />
        <Route path="/mypage/inquiry" element={<ProtectedRoute><InquiryPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;