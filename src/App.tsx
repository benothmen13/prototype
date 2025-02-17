import React, { useState } from 'react';
import { X, Database, Cpu, Network, Activity, PlayCircle, StopCircle } from 'lucide-react';

interface Microservice {
  id: string;
  name: string;
  status: 'running' | 'stopped';
  type: 'service' | 'database' | 'gateway';
  description: string;
  metrics: {
    cpu: number;
    memory: number;
    requests: number;
  };
  endpoints: string[];
}

const sampleMicroservices: Microservice[] = [
  {
    id: '1',
    name: 'Auth Service',
    status: 'running',
    type: 'service',
    description: 'Handles user authentication and authorization',
    metrics: {
      cpu: 25,
      memory: 256,
      requests: 150
    },
    endpoints: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/verify'
    ]
  },
  {
    id: '2',
    name: 'User Service',
    status: 'stopped',
    type: 'service',
    description: 'Manages user profiles and preferences',
    metrics: {
      cpu: 0,
      memory: 0,
      requests: 0
    },
    endpoints: [
      '/api/users',
      '/api/users/:id',
      '/api/users/profile'
    ]
  }
];

function App() {
  const [selectedService, setSelectedService] = useState<Microservice | null>(null);

  const handleServiceClick = (service: Microservice) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Cpu className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-xl font-bold">MicroDesigner</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Command Input */}
        <div className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter microservice command..."
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Send
            </button>
          </div>
        </div>

        {/* Toolbox and Canvas */}
        <div className="flex gap-6">
          {/* Toolbox */}
          <div className="w-64 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Toolbox</h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md cursor-pointer hover:bg-blue-100 transition">
                <Cpu className="inline-block mr-2 h-5 w-5 text-blue-500" />
                Microservice
              </div>
              <div className="p-3 bg-green-50 rounded-md cursor-pointer hover:bg-green-100 transition">
                <Database className="inline-block mr-2 h-5 w-5 text-green-500" />
                Database
              </div>
              <div className="p-3 bg-purple-50 rounded-md cursor-pointer hover:bg-purple-100 transition">
                <Network className="inline-block mr-2 h-5 w-5 text-purple-500" />
                API Gateway
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
            <div className="min-h-[600px] relative bg-gray-50 rounded-lg">
              {sampleMicroservices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="absolute p-4 w-48 bg-white border-2 border-blue-500 rounded-lg cursor-pointer hover:shadow-lg transition"
                  style={{
                    top: service.id === '1' ? '50px' : '200px',
                    left: service.id === '1' ? '50px' : '250px'
                  }}
                >
                  <div className="font-semibold">{service.name}</div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    {service.status === 'running' ? (
                      <PlayCircle className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <StopCircle className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    {service.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status and Type */}
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedService.status === 'running'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedService.status.toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {selectedService.type.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedService.description}</p>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">CPU Usage</div>
                    <div className="text-xl font-semibold">{selectedService.metrics.cpu}%</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Memory</div>
                    <div className="text-xl font-semibold">{selectedService.metrics.memory} MB</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Requests/min</div>
                    <div className="text-xl font-semibold">{selectedService.metrics.requests}</div>
                  </div>
                </div>
              </div>

              {/* Endpoints */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Endpoints</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedService.endpoints.map((endpoint, index) => (
                      <li key={index} className="font-mono text-sm">
                        {endpoint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button className={`px-4 py-2 rounded-md ${
                  selectedService.status === 'running'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                } transition`}>
                  {selectedService.status === 'running' ? 'Stop Service' : 'Start Service'}
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  View Logs
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;