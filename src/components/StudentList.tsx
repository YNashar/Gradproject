import { useState } from 'react';
import { Search, X, Mail, Phone, Calendar } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  attendanceRate: number;
  totalLectures: number;
  attended: number;
  enrollmentDate: string;
}

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const students: Student[] = [
    {
      id: 'CS20210145',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@university.edu',
      phone: '+20 100 123 4567',
      course: 'Computer Science',
      attendanceRate: 92,
      totalLectures: 48,
      attended: 44,
      enrollmentDate: '2021-09-15',
    },
    {
      id: 'CS20210167',
      name: 'Sara Mohamed',
      email: 'sara.mohamed@university.edu',
      phone: '+20 101 234 5678',
      course: 'Computer Science',
      attendanceRate: 88,
      totalLectures: 48,
      attended: 42,
      enrollmentDate: '2021-09-15',
    },
    {
      id: 'CS20210189',
      name: 'Omar Khaled',
      email: 'omar.khaled@university.edu',
      phone: '+20 102 345 6789',
      course: 'Computer Science',
      attendanceRate: 75,
      totalLectures: 48,
      attended: 36,
      enrollmentDate: '2021-09-15',
    },
    {
      id: 'CS20210123',
      name: 'Mona Ali',
      email: 'mona.ali@university.edu',
      phone: '+20 103 456 7890',
      course: 'Computer Science',
      attendanceRate: 95,
      totalLectures: 48,
      attended: 46,
      enrollmentDate: '2021-09-15',
    },
    {
      id: 'CS20210134',
      name: 'Yasmine Tarek',
      email: 'yasmine.tarek@university.edu',
      phone: '+20 104 567 8901',
      course: 'Computer Science',
      attendanceRate: 82,
      totalLectures: 48,
      attended: 39,
      enrollmentDate: '2021-09-15',
    },
    {
      id: 'CS20210156',
      name: 'Karim Samir',
      email: 'karim.samir@university.edu',
      phone: '+20 105 678 9012',
      course: 'Computer Science',
      attendanceRate: 90,
      totalLectures: 48,
      attended: 43,
      enrollmentDate: '2021-09-15',
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Student List</h1>
        <p className="text-gray-600">Manage and view student information</p>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className={`flex-1 ${selectedStudent ? 'lg:w-2/3' : 'w-full'}`}>
          {/* Search */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Student Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate">{student.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{student.id}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Attendance</span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          student.attendanceRate >= 90
                            ? 'bg-green-50 text-green-700'
                            : student.attendanceRate >= 75
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {student.attendanceRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Profile Sidebar */}
        {selectedStudent && (
          <div className="hidden lg:block w-96">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-gray-900">Student Profile</h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  {selectedStudent.name.charAt(0)}
                </div>
                <h3 className="text-gray-900 mb-1">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500">{selectedStudent.id}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Enrolled: {selectedStudent.enrollmentDate}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-gray-900 mb-4">Attendance Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Rate</span>
                      <span className="text-gray-900">{selectedStudent.attendanceRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedStudent.attendanceRate >= 90
                            ? 'bg-green-500'
                            : selectedStudent.attendanceRate >= 75
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedStudent.attendanceRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl text-gray-900">{selectedStudent.attended}</div>
                      <div className="text-sm text-gray-600">Attended</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl text-gray-900">
                        {selectedStudent.totalLectures - selectedStudent.attended}
                      </div>
                      <div className="text-sm text-gray-600">Missed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
