import { Camera, Wifi, WifiOff, AlertCircle } from 'lucide-react';

export function CameraStatus() {
  const cameras = [
    {
      id: 1,
      name: 'Camera 01',
      location: 'Lecture Hall A',
      status: 'online',
      ipAddress: '192.168.1.101',
      rtspUrl: 'rtsp://192.168.1.101:554/stream1',
      lastSeen: '2 min ago',
    },
    {
      id: 2,
      name: 'Camera 02',
      location: 'Lecture Hall B',
      status: 'online',
      ipAddress: '192.168.1.102',
      rtspUrl: 'rtsp://192.168.1.102:554/stream1',
      lastSeen: '1 min ago',
    },
    {
      id: 3,
      name: 'Camera 03',
      location: 'Lecture Hall B',
      status: 'offline',
      ipAddress: '192.168.1.103',
      rtspUrl: 'rtsp://192.168.1.103:554/stream1',
      lastSeen: '12 min ago',
    },
    {
      id: 4,
      name: 'Camera 04',
      location: 'Lab 1',
      status: 'online',
      ipAddress: '192.168.1.104',
      rtspUrl: 'rtsp://192.168.1.104:554/stream1',
      lastSeen: '3 min ago',
    },
    {
      id: 5,
      name: 'Camera 05',
      location: 'Lab 2',
      status: 'online',
      ipAddress: '192.168.1.105',
      rtspUrl: 'rtsp://192.168.1.105:554/stream1',
      lastSeen: '1 min ago',
    },
    {
      id: 6,
      name: 'Camera 06',
      location: 'Room 305',
      status: 'online',
      ipAddress: '192.168.1.106',
      rtspUrl: 'rtsp://192.168.1.106:554/stream1',
      lastSeen: '2 min ago',
    },
    {
      id: 7,
      name: 'Camera 07',
      location: 'Room 306',
      status: 'online',
      ipAddress: '192.168.1.107',
      rtspUrl: 'rtsp://192.168.1.107:554/stream1',
      lastSeen: '4 min ago',
    },
    {
      id: 8,
      name: 'Camera 08',
      location: 'Corridor A',
      status: 'online',
      ipAddress: '192.168.1.108',
      rtspUrl: 'rtsp://192.168.1.108:554/stream1',
      lastSeen: '1 min ago',
    },
    {
      id: 9,
      name: 'Camera 09',
      location: 'Entrance',
      status: 'offline',
      ipAddress: '192.168.1.109',
      rtspUrl: 'rtsp://192.168.1.109:554/stream1',
      lastSeen: '25 min ago',
    },
    {
      id: 10,
      name: 'Camera 10',
      location: 'Library',
      status: 'online',
      ipAddress: '192.168.1.110',
      rtspUrl: 'rtsp://192.168.1.110:554/stream1',
      lastSeen: '1 min ago',
    },
  ];

  const onlineCameras = cameras.filter((c) => c.status === 'online').length;
  const offlineCameras = cameras.filter((c) => c.status === 'offline').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Camera Status</h1>
        <p className="text-gray-600">Monitor camera connectivity and status</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl text-gray-900">{cameras.length}</div>
              <div className="text-sm text-gray-600">Total Cameras</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl text-gray-900">{onlineCameras}</div>
              <div className="text-sm text-gray-600">Online</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
              <WifiOff className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl text-gray-900">{offlineCameras}</div>
              <div className="text-sm text-gray-600">Offline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className={`bg-white rounded-xl border p-6 ${
              camera.status === 'online'
                ? 'border-gray-200'
                : 'border-red-200 bg-red-50/30'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{camera.name}</h3>
                <p className="text-sm text-gray-500">{camera.location}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  camera.status === 'online'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {camera.status === 'online' ? (
                  <Wifi className="w-3 h-3" />
                ) : (
                  <WifiOff className="w-3 h-3" />
                )}
                {camera.status}
              </div>
            </div>

            {/* Camera Preview */}
            <div className="bg-gray-900 rounded-lg mb-4 aspect-video flex items-center justify-center">
              {camera.status === 'online' ? (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Live Feed</p>
                </div>
              ) : (
                <div className="text-center">
                  <WifiOff className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No Signal</p>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">IP Address:</span>
                <span className="text-gray-900">{camera.ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Seen:</span>
                <span className="text-gray-900">{camera.lastSeen}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-gray-500">RTSP URL:</span>
                <p className="text-xs text-gray-900 font-mono mt-1 break-all">
                  {camera.rtspUrl}
                </p>
              </div>
            </div>

            {camera.status === 'offline' && (
              <div className="mt-4 pt-4 border-t border-red-200">
                <div className="flex items-start gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Camera disconnected. Please check network connection.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
