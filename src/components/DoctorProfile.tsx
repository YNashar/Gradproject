import { useState } from 'react';
import { User, Mail, Phone, Building, Calendar, Lock } from 'lucide-react';

export function DoctorProfile() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const doctorInfo = {
    name: 'Dr. Ahmed Ibrahim',
    email: 'ahmed.ibrahim@university.edu',
    phone: '+20 100 987 6543',
    department: 'Computer Science',
    officeRoom: 'Building A, Room 305',
    employeeId: 'FAC20180425',
    joinDate: '2018-09-01',
    specialization: 'Artificial Intelligence & Machine Learning',
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Handle password change
    alert('Password changed successfully!');
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl mx-auto mb-4">
                {doctorInfo.name.split(' ')[1].charAt(0)}
              </div>
              <h2 className="text-gray-900 mb-1">{doctorInfo.name}</h2>
              <p className="text-sm text-gray-500">{doctorInfo.specialization}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{doctorInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{doctorInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{doctorInfo.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details and Password */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={doctorInfo.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={doctorInfo.employeeId}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={doctorInfo.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={doctorInfo.phone}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={doctorInfo.department}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Office Location</label>
                <input
                  type="text"
                  value={doctorInfo.officeRoom}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">Specialization</label>
                <input
                  type="text"
                  value={doctorInfo.specialization}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Security Settings</h2>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Last password change: October 15, 2025</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
