import { Users, UserCheck, UserX, Video, Camera, AlertCircle } from 'lucide-react';

export function DashboardOverview() {
  const stats = [
    { label: 'Total Students', value: '248', icon: Users, color: 'blue' },
    { label: 'Present Today', value: '186', icon: UserCheck, color: 'green' },
    { label: 'Absences Today', value: '62', icon: UserX, color: 'red' },
    { label: 'Ongoing Lectures', value: '2', icon: Video, color: 'purple' },
    { label: 'Active Cameras', value: '8/10', icon: Camera, color: 'orange' },
  ];

  const liveAttendance = [
    { time: '10:32 AM', student: 'Ahmed Hassan', id: 'CS20210145', status: 'present' },
    { time: '10:31 AM', student: 'Sara Mohamed', id: 'CS20210167', status: 'present' },
    { time: '10:30 AM', student: 'Omar Khaled', id: 'CS20210189', status: 'present' },
    { time: '10:29 AM', student: 'Mona Ali', id: 'CS20210123', status: 'present' },
    { time: '10:28 AM', student: 'Unknown Person', id: 'N/A', status: 'unknown' },
  ];

  const notifications = [
    { type: 'warning', message: 'Camera #3 disconnected - Lecture Hall B', time: '5 min ago' },
    { type: 'info', message: 'Unknown face detected in CS301 lecture', time: '12 min ago' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, Dr. Ahmed Ibrahim</p>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map((notif, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                notif.type === 'warning'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  notif.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                }`}
              />
              <div className="flex-1">
                <p className="text-gray-900">{notif.message}</p>
                <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            red: 'bg-red-50 text-red-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
          };

          return (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Live Attendance Feed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Live Attendance Feed</h2>
        <div className="space-y-3">
          {liveAttendance.map((entry, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  {entry.student.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">{entry.student}</div>
                  <div className="text-sm text-gray-500">{entry.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{entry.time}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    entry.status === 'present'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {entry.status === 'present' ? 'Present' : 'Unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
