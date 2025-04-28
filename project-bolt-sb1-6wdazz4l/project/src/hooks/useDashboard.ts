import { useState, useEffect, useCallback, useMemo } from 'react';
import { Project, WeatherData, TeamMember, ActivityLog, ResourceUsage, UserPlan } from '../types/calculator';
import { debounce } from '../utils/debounce';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_KEY = 'dashboardData';
const DEBOUNCE_DELAY = 300;

interface CacheData {
  timestamp: number;
  data: {
    projects: Project[];
    weatherData: WeatherData[];
    teamMembers: TeamMember[];
    activityLogs: ActivityLog[];
    resourceUsage: ResourceUsage;
    userPlan: UserPlan | null;
  };
}

// Helper function to parse dates in cached data
const parseDatesInProject = (project: Project): Project => ({
  ...project,
  lastUpdated: new Date(project.lastUpdated)
});

const parseDatesInData = (data: CacheData['data']): CacheData['data'] => ({
  ...data,
  projects: data.projects.map(parseDatesInProject),
  weatherData: data.weatherData.map(w => ({ ...w, date: new Date(w.date) })),
  teamMembers: data.teamMembers.map(m => ({ ...m, lastActive: new Date(m.lastActive) })),
  activityLogs: data.activityLogs.map(log => ({ ...log, timestamp: new Date(log.timestamp) }))
});

interface DashboardFilters {
  dateFrom: string;
  dateTo: string;
  location: string;
}

export const useDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [resourceUsage, setResourceUsage] = useState<ResourceUsage>({
    projectsUsed: 0,
    teamMembersUsed: 0,
    storageUsed: 0
  });
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>({
    dateFrom: '',
    dateTo: '',
    location: ''
  });

  // Memoize expensive calculations
  const projectStats = useMemo(() => {
    if (!projects.length) return null;
    
    return {
      totalProjects: projects.length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      averageProgress: Math.round(
        projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
      )
    };
  }, [projects]);

  const weatherStats = useMemo(() => {
    if (!weatherData.length) return null;

    return {
      averageTemperature: Math.round(
        weatherData.reduce((sum, w) => sum + w.temperature, 0) / weatherData.length
      ),
      averageSolarIrradiance: Math.round(
        weatherData.reduce((sum, w) => sum + w.solarIrradiance, 0) / weatherData.length
      )
    };
  }, [weatherData]);

  // Debounced filter updates
  const debouncedFetchData = useCallback(
    debounce(async (filters) => {
      try {
        setLoading(true);
        
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CacheData = JSON.parse(cachedData);
          const now = Date.now();
          
          if (now - parsed.timestamp < CACHE_DURATION) {
            const parsedData = parseDatesInData(parsed.data);
            
            // Apply filters to cached data
            const filteredProjects = parsedData.projects.filter(project => {
              const projectDate = new Date(project.lastUpdated);
              return (!filters.dateFrom || projectDate >= new Date(filters.dateFrom)) &&
                     (!filters.dateTo || projectDate <= new Date(filters.dateTo));
            });

            setProjects(filteredProjects);
            setWeatherData(parsedData.weatherData);
            setTeamMembers(parsedData.teamMembers);
            setActivityLogs(parsedData.activityLogs);
            setResourceUsage(parsedData.resourceUsage);
            setUserPlan(parsedData.userPlan);
            setLoading(false);
            return;
          }
        }

        // Fetch all data in parallel if cache is invalid
        const [
          fetchedProjects,
          fetchedWeatherData,
          fetchedTeamMembers,
          fetchedActivityLogs,
          fetchedResourceUsage,
          fetchedUserPlan
        ] = await Promise.all([
          fetchProjects(filters),
          fetchWeatherData(),
          fetchTeamMembers(),
          fetchActivityLogs(),
          fetchResourceUsage(),
          fetchUserPlan()
        ]);

        // Update state with fetched data
        setProjects(fetchedProjects);
        setWeatherData(fetchedWeatherData);
        setTeamMembers(fetchedTeamMembers);
        setActivityLogs(fetchedActivityLogs);
        setResourceUsage(fetchedResourceUsage);
        setUserPlan(fetchedUserPlan);

        // Cache the new data
        const cacheData: CacheData = {
          timestamp: Date.now(),
          data: {
            projects: fetchedProjects,
            weatherData: fetchedWeatherData,
            teamMembers: fetchedTeamMembers,
            activityLogs: fetchedActivityLogs,
            resourceUsage: fetchedResourceUsage,
            userPlan: fetchedUserPlan
          }
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY),
    []
  );

  // Effect to fetch data when filters change
  useEffect(() => {
    debouncedFetchData(filters);
    return () => {
      // Cancel any pending debounced calls when component unmounts
      debouncedFetchData.cancel();
    };
  }, [debouncedFetchData, filters]);

  // Data fetching functions
  const fetchProjects = async (filters: DashboardFilters): Promise<Project[]> => {
    // Simulated API call with filter support
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Residential Solar Installation',
        status: 'in-progress' as const,
        progress: 65,
        lastUpdated: new Date()
      },
      {
        id: '2',
        name: 'Commercial Energy Audit',
        status: 'completed' as const,
        progress: 100,
        lastUpdated: new Date(Date.now() - 86400000)
      }
    ];

    // Apply filters
    return mockProjects.filter(project => {
      const projectDate = new Date(project.lastUpdated);
      return (!filters.dateFrom || projectDate >= new Date(filters.dateFrom)) &&
             (!filters.dateTo || projectDate <= new Date(filters.dateTo));
    });
  };

  const fetchWeatherData = async (): Promise<WeatherData[]> => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000),
      solarIrradiance: 800 + Math.random() * 200,
      temperature: 20 + Math.random() * 10,
      cloudCover: Math.random() * 100
    }));
  };

  const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    return [
      {
        id: '1',
        name: 'John Smith',
        role: 'Solar Engineer',
        lastActive: new Date()
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'Project Manager',
        lastActive: new Date(Date.now() - 3600000)
      }
    ];
  };

  const fetchActivityLogs = async (): Promise<ActivityLog[]> => {
    return [
      {
        id: '1',
        user: 'John Smith',
        action: 'updated project status',
        details: 'Residential Solar Installation progress updated to 65%',
        timestamp: new Date()
      },
      {
        id: '2',
        user: 'Sarah Johnson',
        action: 'completed energy audit',
        details: 'Commercial Energy Audit marked as completed',
        timestamp: new Date(Date.now() - 7200000)
      }
    ];
  };

  const fetchResourceUsage = async (): Promise<ResourceUsage> => {
    return {
      projectsUsed: 2,
      teamMembersUsed: 2,
      storageUsed: 5
    };
  };

  const fetchUserPlan = async (): Promise<UserPlan> => {
    return {
      name: 'Pro',
      maxProjects: 10,
      maxTeamMembers: 5,
      maxStorage: 50
    };
  };

  return {
    projects,
    weatherData,
    teamMembers,
    activityLogs,
    resourceUsage,
    userPlan,
    loading,
    error,
    filters,
    setFilters,
    projectStats,
    weatherStats
  };
};