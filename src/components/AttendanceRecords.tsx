import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Search, Filter } from 'lucide-react';

export function AttendanceRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const attendanceData = [
    { date: '2025-11-26', course: 'CS301', student: 'Ahmed Hassan', id: 'CS20210145', status: 'Present', time: '10:32 AM' },
    { date: '2025-11-26', course: 'CS301', student: 'Sara Mohamed', id: 'CS20210167', status: 'Present', time: '10:31 AM' },
    { date: '2025-11-26', course: 'CS301', student: 'Omar Khaled', id: 'CS20210189', status: 'Absent', time: '-' },
    { date: '2025-11-25', course: 'CS302', student: 'Mona Ali', id: 'CS20210123', status: 'Present', time: '2:15 PM' },
    { date: '2025-11-25', course: 'CS302', student: 'Ahmed Hassan', id: 'CS20210145', status: 'Present', time: '2:12 PM' },
    { date: '2025-11-25', course: 'CS301', student: 'Yasmine Tarek', id: 'CS20210134', status: 'Late', time: '10:45 AM' },
    { date: '2025-11-24', course: 'CS401', student: 'Karim Samir', id: 'CS20210156', status: 'Present', time: '8:10 AM' },
    { date: '2025-11-24', course: 'CS401', student: 'Sara Mohamed', id: 'CS20210167', status: 'Absent', time: '-' },
  ];

  const courses = ['all', 'CS301', 'CS302', 'CS401'];

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || record.course === selectedCourse;
    const matchesDate = !selectedDate || record.date === selectedDate;
    return matchesSearch && matchesCourse && matchesDate;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Attendance Records</h1>
        <p className="text-gray-600">View and export attendance history</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Courses</option>
              {courses.slice(1).map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Date</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Course</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Student Name</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Student ID</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 text-gray-900">{record.course}</td>
                  <td className="px-6 py-4 text-gray-900">{record.student}</td>
                  <td className="px-6 py-4 text-gray-600">{record.id}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        record.status === 'Present'
                          ? 'bg-green-50 text-green-700'
                          : record.status === 'Absent'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No records found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
