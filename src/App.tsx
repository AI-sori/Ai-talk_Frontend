import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import WriteInquiryPage from './components/write/WriteInquiryPage';
import InquiryDetailPage from './pages/InquiryDetailPage'; 
import MyPosts from './components/mypage/MyPosts';
import MyComments from './components/mypage/MyComments';
import MyLikes from './components/mypage/MyLikes';
import CommunityEditPage from './pages/CommunityEditPage'; 


const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isPublic = location.pathname === '/' || location.pathname === '/onboarding';

  return (
    <>
      {!isPublic && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* 로그인 없이도 접근 가능하도록 ProtectedRoute 제거 */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/community/write" element={<WritePage type="anon" />} />
        <Route path="/consult/write" element={<WritePage type="expert" />} />
        <Route path="/community/:id" element={<CommunityPostDetailPage />} />
         <Route path="/consult/1" element={<ConsultDetailPage hasReply={false} />} />
        <Route path="/mypage/edit" element={<EditProfilePage />} />
        <Route path="/mypage/notice" element={<NoticePage />} />
        <Route path="/mypage/inquiry" element={<InquiryPage />} />
        <Route path="/mypage/inquiry/:id" element={<InquiryDetailPage />} />
        <Route path="/mypage/inquiry/write" element={<WriteInquiryPage />} />
        <Route path="/mypage/myposts" element={<MyPosts />} />
        <Route path="/mypage/mycomments" element={<MyComments />} />
        <Route path="/mypage/mylikes" element={<MyLikes />} />
        <Route path="/community/edit/:id" element={<CommunityEditPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <AppLayout />
    </Router>
        </QueryClientProvider>
  );
}

export default App;