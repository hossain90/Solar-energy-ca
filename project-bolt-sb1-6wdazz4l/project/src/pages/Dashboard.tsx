import React, { Suspense, lazy, useState } from 'react';
import { BarChart3, Download, FileText, Users, Cloud } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import Notification from '../components/Notification';
import { ExportUtils } from '../utils/exportUtils';
import type { SolarCalculation } from '../services/googleSheets';

// Lazy load charts
const Charts = lazy(() => import('../components/Charts'));

// Loading skeleton component
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const Dashboard: React.FC = () => {
  const {
    projects,
    weatherData,
    teamMembers,
    loading,
    error,
    filters,
    setFilters,
    projectStats,
    weatherStats
  } = useDashboard();

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string; } | null>(null);

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    try {
      // Convert projects to SolarCalculation format
      const calculationData: SolarCalculation[] = projects.map(project => ({
        id: project.id,
        timestamp: project.lastUpdated.toISOString(),
        systemSize: 0,
        numberOfPanels: 0,
        dailyProduction: 0,
        batterySize: 0,
        totalCost: 0,
        currency: 'USD',
        location: '',
      }));

      switch (format) {
        case 'csv':
          await ExportUtils.exportToCSV(calculationData);
          break;
        case 'pdf':
          await ExportUtils.exportToPDF(calculationData);
          break;
        case 'excel':
          await ExportUtils.exportToExcel(calculationData);
          break;
      }
      
      setNotification({
        type: 'success',
        message: `Data exported successfully as ${format.toUpperCase()}`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: `Failed to export data as ${format.toUpperCase()}`
      });
    }
    setShowExportMenu(false);
  };

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-narrow">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">Dashboard</h1>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="btn btn-outline flex items-center space-x-2"
              disabled={loading}
            >
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {['csv', 'pdf', 'excel'].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleExport(format as 'csv' | 'pdf' | 'excel')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as {format.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <h2 className="text-lg font-medium mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-medium">Projects Overview</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-light">{projectStats?.totalProjects || 0}</p>
                  <p className="text-sm text-gray-500">
                    {projectStats?.completedProjects || 0} completed
                  </p>
                  <p className="text-sm text-gray-500">
                    {projectStats?.averageProgress || 0}% avg. progress
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-medium">Team Members</h3>
                </div>
                <p className="text-3xl font-light">{teamMembers.length}</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Cloud className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-medium">Weather Overview</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-light">
                    {weatherStats?.averageTemperature || 'N/A'}°C
                  </p>
                  <p className="text-sm text-gray-500">
                    {weatherStats?.averageSolarIrradiance || 'N/A'} W/m²
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Charts Section */}
        <Suspense fallback={<Skeleton className="h-96" />}>
          <Charts
            weatherData={weatherData}
            projects={projects}
            loading={loading}
          />
        </Suspense>

        {/* Projects List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl mb-4">Recent Projects</h2>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated: {project.lastUpdated.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;