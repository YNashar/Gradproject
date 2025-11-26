import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { LecturePage } from './components/LecturePage';
import { AttendanceRecords } from './components/AttendanceRecords';
import { StudentList } from './components/StudentList';
import { CoursesPage } from './components/CoursesPage';
import { CameraStatus } from './components/CameraStatus';
import { DoctorProfile } from './components/DoctorProfile';
import { LoginPage } from './components/LoginPage';

type Page = 'dashboard' | 'lecture' | 'attendance' | 'students' | 'courses' | 'cameras' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentUser(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'lecture':
        return <LecturePage />;
      case 'attendance':
        return <AttendanceRecords />;
      case 'students':
        return <StudentList />;
      case 'courses':
        return <CoursesPage />;
      case 'cameras':
        return <CameraStatus />;
      case 'profile':
        return <DoctorProfile />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}