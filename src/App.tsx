import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import LearningPage from './pages/LearningPage';
import DiagnosisPage from './pages/DiagnosisPage';
import CommunityPage from './pages/CommunityPage';
import Mypage from './pages/Mypage';

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
