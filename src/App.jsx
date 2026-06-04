import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import StrandHome from './pages/StrandHome';
import UniversityPage from './pages/UniversityPage';
import CoursePage from './pages/CoursePage';
import CollegesPage from './pages/CollegesPage';
import CollegePage from './pages/CollegePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:strand" element={<StrandHome />} />
      <Route path="/:strand/university/:slug" element={<UniversityPage />} />
      <Route path="/:strand/university/:slug/colleges" element={<CollegesPage />} />
      <Route path="/:strand/college/:collegeSlug" element={<CollegePage />} />
      <Route path="/:strand/course/:courseId" element={<CoursePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
