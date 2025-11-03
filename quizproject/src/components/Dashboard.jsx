import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ AUTO LOGOUT TIMER COMPONENT
function AutoLogoutTimer() {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (!loginTime) return '';
      
      const timeoutDuration = 30 * 60 * 1000; // 30 minutes
      const elapsedTime = Date.now() - parseInt(loginTime);
      const remainingTime = timeoutDuration - elapsedTime;
      
      if (remainingTime <= 0) {
        return 'Session expired';
      }
      
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      
      return `Auto logout in: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!timeLeft) return null;
  
  return (
    <div className="text-sm text-orange-600 font-medium bg-orange-100 px-3 py-1 rounded-full">
      ⏰ {timeLeft}
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
const navigate = useNavigate();
const initialRole = location.state?.role || localStorage.getItem("role") || "Teacher";
const [userRole] = useState(initialRole); // notice: no setUserRole anymore

// Prevent manual access to opposite role dashboard
useEffect(() => {
  if (!location.state?.role) {
    navigate("/registration"); // redirect if accessed directly without login
  }
  localStorage.setItem("role", initialRole); // save for persistence
}, [initialRole, location.state, navigate]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const recentActivities =
    userRole === "Teacher"
      ? [
          { title: "Quiz Created: Data Structures", date: "Oct 6, 2025", type: "creation", score: null },
          { title: "Report Generated for SE Quiz", date: "Oct 4, 2025", type: "report", score: null },
          { title: "Allowed Students for CN Quiz", date: "Oct 2, 2025", type: "management", score: null },
        ]
      : [
          { title: "Attempted: Database Systems Quiz", date: "Oct 7, 2025", type: "quiz", score: 92 },
          { title: "Scored 85% in Software Engg Quiz", date: "Oct 4, 2025", type: "quiz", score: 85 },
          { title: "Viewed Report: CN Quiz", date: "Oct 1, 2025", type: "report", score: 78 },
        ];

  const upcoming =
    userRole === "Teacher"
      ? [
          { course: "Operating Systems", date: "Oct 10, 2025", type: "Scheduled Quiz", students: 45 },
          { course: "Software Engineering", date: "Oct 13, 2025", type: "Grading Pending", students: 38 },
        ]
      : [
          { course: "Operating Systems", date: "Oct 10, 2025", type: "Quiz Scheduled", duration: "30 min" },
          { course: "Data Structures", date: "Oct 14, 2025", type: "Assignment Due", duration: "45 min" },
        ];

  const stats = userRole === "Teacher" 
    ? [
        { value: "12", label: "Quizzes Created", change: "+2", trend: "up" },
        { value: "85%", label: "Average Class Score", change: "+5%", trend: "up" },
        { value: "45", label: "Active Students", change: "+3", trend: "up" },
        { value: "98%", label: "Completion Rate", change: "+2%", trend: "up" },
      ]
    : [
        { value: "15", label: "Quizzes Attempted", change: "+3", trend: "up" },
        { value: "87%", label: "Average Score", change: "+2%", trend: "up" },
        { value: "5", label: "Pending Quizzes", change: "-1", trend: "down" },
        { value: "92%", label: "Attendance", change: "+1%", trend: "up" },
      ];

  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1087/1087927.png",
      title: userRole === "Teacher" ? "Create Quiz" : "Attempt Quiz",
      description: userRole === "Teacher" 
        ? "Upload PDF or type questions to generate interactive quizzes." 
        : "Join available quizzes assigned by your teacher.",
      link: userRole === "Teacher" ? "/quizcreation" : "/attemptquiz",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
      title: userRole === "Teacher" ? "Reports" : "Performance",
      description: userRole === "Teacher" 
        ? "View, analyze, and export quiz reports for your students." 
        : "Track your scores and see your improvement over time.",
      link: userRole === "Teacher" ? "/reports" : "/performance",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
      title: userRole === "Teacher" ? "Settings" : "Profile",
      description: userRole === "Teacher" 
        ? "Adjust quiz parameters, shuffle questions, and set marks." 
        : "Update your personal info and preferences.",
      link: userRole === "Teacher" ? "/settings" : "/profile",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800">
      {/* Header Section */}
      <section className="pt-8 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Welcome back, {userRole}! 👋
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                {userRole === "Teacher" 
                  ? "Manage your classes, create engaging quizzes, and track student progress." 
                  : "Continue your learning journey, attempt quizzes, and monitor your performance."}
              </p>
              <AutoLogoutTimer />
            </div>
            
            {/* Role Display with Logout Button */}
  <div className="flex items-center gap-4">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3 border border-white/60 text-center font-semibold">
      {userRole === "Teacher" ? "👨‍🏫 Teacher Dashboard" : "👨‍🎓 Student Dashboard"}
    </div>
    
    {/* Logout Button */}
    <button 
      onClick={() => {
        localStorage.removeItem("role");
        navigate("/login");
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200"
    >
      Logout
    </button>
  </div>
</div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, parseInt(stat.value) * (stat.value.includes('%') ? 1 : 4))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <img src={feature.icon} alt={feature.title} className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 group-hover:translate-x-1 transition-transform duration-300"
                >
                  Get Started <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📈 Recent Activities
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {recentActivities.length}
                </span>
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="p-6 hover:bg-gray-50/50 transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'report' ? 'bg-purple-100 text-purple-600' :
                        activity.type === 'creation' ? 'bg-green-100 text-green-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'quiz' ? '📝' :
                         activity.type === 'report' ? '📊' :
                         activity.type === 'creation' ? '🆕' : '👥'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {activity.score}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                ⏰ Upcoming Tasks
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {upcoming.length}
                </span>
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {upcoming.map((task, index) => (
                <div 
                  key={index}
                  className="p-6 hover:bg-gray-50/50 transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                      {task.course}
                    </h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {task.date}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{task.type}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {userRole === "Teacher" 
                        ? `👥 ${task.students} students` 
                        : `⏱️ ${task.duration}`}
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Performance Overview</h3>
              <p className="text-gray-600">
                {userRole === "Teacher" 
                  ? "Class performance across different subjects" 
                  : "Your progress across attempted quizzes"}
              </p>
            </div>
            <div className="flex gap-2 mt-4 lg:mt-0">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-200">
                Weekly
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200">
                Monthly
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
            <div className="flex justify-around items-end h-64 mb-8">
              {[65, 80, 50, 90, 70, 85, 75].map((height, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-12 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-xl transition-all duration-1000 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-sm text-gray-600 mt-2">W{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                *Interactive progress chart showing {userRole === "Teacher" ? "class average scores" : "your quiz performance"} over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;