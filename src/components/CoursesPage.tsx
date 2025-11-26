import { BookOpen, Users, Calendar, TrendingUp } from 'lucide-react';

export function CoursesPage() {
  const courses = [
    {
      code: 'CS301',
      name: 'Data Structures',
      students: 45,
      lectures: 24,
      avgAttendance: 87,
      schedule: 'Mon, Wed 10:00 AM',
      room: 'Hall A',
    },
    {
      code: 'CS302',
      name: 'Algorithms',
      students: 38,
      lectures: 22,
      avgAttendance: 82,
      schedule: 'Tue, Thu 2:00 PM',
      room: 'Hall B',
    },
    {
      code: 'CS401',
      name: 'Machine Learning',
      students: 32,
      lectures: 20,
      avgAttendance: 91,
      schedule: 'Mon, Wed 8:00 AM',
      room: 'Lab 1',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Courses you are teaching this semester</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.code}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-gray-900 mb-1">{course.name}</h2>
                <p className="text-sm text-gray-500">{course.code}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{course.students} Students Enrolled</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{course.schedule}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Room {course.room}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Average Attendance</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    course.avgAttendance >= 90
                      ? 'bg-green-50 text-green-700'
                      : course.avgAttendance >= 75
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {course.avgAttendance}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    course.avgAttendance >= 90
                      ? 'bg-green-500'
                      : course.avgAttendance >= 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${course.avgAttendance}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl text-gray-900">{course.lectures}</div>
                  <div className="text-xs text-gray-600">Total Lectures</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div className="text-xl text-gray-900">+5%</div>
                  </div>
                  <div className="text-xs text-gray-600">vs Last Month</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
