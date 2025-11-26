import { useState } from 'react';
import { Play, Square, Users, Clock } from 'lucide-react';

export function LecturePage() {
  const [isLectureActive, setIsLectureActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('CS301');
  const [selectedRoom, setSelectedRoom] = useState('Hall A');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const courses = ['CS301 - Data Structures', 'CS302 - Algorithms', 'CS401 - Machine Learning'];
  const rooms = ['Hall A', 'Hall B', 'Lab 1', 'Lab 2', 'Room 305'];
  const times = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  const recognizedStudents = [
    { name: 'Ahmed Hassan', id: 'CS20210145', time: '10:32:15', confidence: 98 },
    { name: 'Sara Mohamed', id: 'CS20210167', time: '10:31:42', confidence: 96 },
    { name: 'Omar Khaled', id: 'CS20210189', time: '10:30:28', confidence: 99 },
    { name: 'Mona Ali', id: 'CS20210123', time: '10:29:55', confidence: 97 },
    { name: 'Yasmine Tarek', id: 'CS20210134', time: '10:29:12', confidence: 95 },
    { name: 'Karim Samir', id: 'CS20210156', time: '10:28:45', confidence: 98 },
  ];

  const handleStartLecture = () => {
    setIsLectureActive(true);
  };

  const handleEndLecture = () => {
    if (confirm('Are you sure you want to end this lecture? Attendance will be finalized.')) {
      setIsLectureActive(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Lecture Control</h1>
        <p className="text-gray-600">Start and manage your lectures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Lecture Settings</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLectureActive}
                >
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Room</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLectureActive}
                >
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLectureActive}
                >
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!isLectureActive ? (
              <button
                onClick={handleStartLecture}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Lecture
              </button>
            ) : (
              <button
                onClick={handleEndLecture}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Square className="w-5 h-5" />
                End Lecture
              </button>
            )}

            {isLectureActive && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-700">Lecture Active</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: 32 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Students: {recognizedStudents.length}/45</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recognition List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Live Student Recognition</h2>
              {isLectureActive && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  Scanning...
                </span>
              )}
            </div>

            {!isLectureActive ? (
              <div className="text-center py-12">
                <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Start a lecture to begin recognition</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recognizedStudents.map((student, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-900">{student.time}</div>
                        <div className="text-xs text-gray-500">{student.confidence}% match</div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
