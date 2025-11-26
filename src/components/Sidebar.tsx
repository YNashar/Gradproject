import { LayoutDashboard, Play, ClipboardList, Users, BookOpen, Camera, User, Bell, LogOut } from 'lucide-react';

type Page = 'dashboard' | 'lecture' | 'attendance' | 'students' | 'courses' | 'cameras' | 'profile';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lecture', label: 'Lecture Control', icon: Play },
    { id: 'attendance', label: 'Attendance Records', icon: ClipboardList },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'cameras', label: 'Camera Status', icon: Camera },
  ] as const;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-gray-900">Attendance System</h1>
        <p className="text-sm text-gray-500 mt-1">Doctor Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            currentPage === 'profile'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}