'use client'
import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { FiSun, FiMoon } from 'react-icons/fi';

const Dashboard = () => {
    // State for dark mode
    const [darkMode, setDarkMode] = useState(false);

    // State for metrics
    const [metrics, setMetrics] = useState({
        totalLogs: 12000,
        activeProjects: 35,
        totalAlerts: 58,
        crashIncidents: 12,
    });

    // Mock data for charts
    const [logsOverview, setLogsOverview] = useState([
        { date: 'Jan', logs: 400 },
        { date: 'Feb', logs: 300 },
        { date: 'Mar', logs: 500 },
        { date: 'Apr', logs: 200 },
        { date: 'May', logs: 700 },
        { date: 'Jun', logs: 600 },
        { date: 'Jul', logs: 800 },
        { date: 'Aug', logs: 500 },
        { date: 'Sep', logs: 900 },
        { date: 'Oct', logs: 750 },
        { date: 'Nov', logs: 650 },
        { date: 'Dec', logs: 850 },
    ]);

    const [crashFrequency, setCrashFrequency] = useState([
        { platform: 'Mobile', crashes: 7 },
        { platform: 'Web', crashes: 3 },
        { platform: 'API', crashes: 2 },
    ]);

    const [activeUsers, setActiveUsers] = useState([
        { name: 'Project A', value: 400 },
        { name: 'Project B', value: 300 },
        { name: 'Project C', value: 300 },
        { name: 'Project D', value: 200 },
    ]);

    // Colors for pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // State for date filtering
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });

    // Handle theme toggle
    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // On component mount, check localStorage for theme preference
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Handle date range change
    const handleDateChange = (e:any) => {
        const { name, value } = e.target;
        setDateRange((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Here, you can implement filtering logic based on the selected date range
        // For now, we'll just log the selected range
        console.log('Selected Date Range:', { ...dateRange, [name]: value });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
                <h1 className="text-2xl font-bold">LogShark Dashboard</h1>
                <button
                    onClick={handleThemeToggle}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                    {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
            </header>

            {/* Main Content */}
            <main className="p-4">
                {/* Top Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <MetricCard
                        title="Total Logs Recorded"
                        value={metrics.totalLogs}
                        icon="📄"
                    />
                    <MetricCard
                        title="Active Projects"
                        value={metrics.activeProjects}
                        icon="📁"
                    />
                    <MetricCard
                        title="Alerts Triggered"
                        value={metrics.totalAlerts}
                        icon="🚨"
                    />
                    <MetricCard
                        title="Crash Incidents"
                        value={metrics.crashIncidents}
                        icon="💥"
                    />
                </div>

                {/* Date Filter */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold mb-4 md:mb-0">Logs Overview</h2>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            name="startDate"
                            value={dateRange.startDate}
                            onChange={handleDateChange}
                            className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={dateRange.endDate}
                            onChange={handleDateChange}
                            className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                            Apply
                        </button>
                    </div>
                </div>

                {/* Logs Overview Line Chart */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={logsOverview}>
                            <XAxis dataKey="date" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip />
                            <Line type="monotone" dataKey="logs" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Crash Frequency Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">Crash Frequency by Platform</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={crashFrequency}>
                            <XAxis dataKey="platform" stroke="#82ca9d" />
                            <YAxis stroke="#82ca9d" />
                            <Tooltip />
                            <Bar dataKey="crashes" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Active Users & Sessions Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Active Users & Sessions</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={activeUsers}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {activeUsers.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </div>
    );
};

// MetricCard Component within the same file for simplicity
const MetricCard = ({ title, value, icon }:any) => {
    return (
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mr-4">{icon}</div>
            <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{value}</p>
            </div>
        </div>
    );
};

export default Dashboard;
