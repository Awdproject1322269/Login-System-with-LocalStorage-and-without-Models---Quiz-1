import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Report() {
  const [reports, setReports] = useState([
    { id: 1, student: "Ayesha Khan", quiz: "Quiz 1", score: 18, total: 20, date: "2025-10-05", timeSpent: "25:30", status: "completed" },
    { id: 2, student: "Ali Raza", quiz: "Quiz 1", score: 15, total: 20, date: "2025-10-05", timeSpent: "32:15", status: "completed" },
    { id: 3, student: "Sara Ahmed", quiz: "Quiz 1", score: 20, total: 20, date: "2025-10-05", timeSpent: "18:45", status: "completed" },
    { id: 4, student: "Bilal Hassan", quiz: "Quiz 1", score: 12, total: 20, date: "2025-10-05", timeSpent: "45:20", status: "completed" },
    { id: 5, student: "Ayesha Khan", quiz: "Quiz 2", score: 16, total: 20, date: "2025-10-08", timeSpent: "28:10", status: "completed" },
    { id: 6, student: "Ali Raza", quiz: "Quiz 2", score: 14, total: 20, date: "2025-10-08", timeSpent: "35:45", status: "completed" },
    { id: 7, student: "Fatima Noor", quiz: "Quiz 2", score: 19, total: 20, date: "2025-10-08", timeSpent: "22:30", status: "completed" },
  ]);

  const quizzes = [...new Set(reports.map((r) => r.quiz))];
  const [selectedQuiz, setSelectedQuiz] = useState(quizzes[0]);
  const [downloading, setDownloading] = useState(false);
  const [timeRange, setTimeRange] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter reports
  const filtered = reports.filter((r) => {
    const matchesQuiz = r.quiz === selectedQuiz;
    const matchesSearch = r.student.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesQuiz && matchesSearch;
  });

  // Calculate analytics
  const average = (filtered.reduce((a, b) => a + b.score, 0) / filtered.length).toFixed(1);
  const highest = Math.max(...filtered.map((r) => r.score));
  const lowest = Math.min(...filtered.map((r) => r.score));
  const completionRate = ((filtered.length / reports.filter(r => r.quiz === selectedQuiz).length) * 100).toFixed(0);
  const averagePercentage = ((filtered.reduce((a, b) => a + (b.score / b.total * 100), 0) / filtered.length)).toFixed(1);

  const topPerformers = filtered
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const handleDownload = (format = 'pdf') => {
    setDownloading(true);
    setTimeout(() => {
      alert(`${format.toUpperCase()} report for ${selectedQuiz} downloaded successfully!`);
      setDownloading(false);
    }, 1500);
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'from-green-500 to-emerald-600';
    if (percentage >= 75) return 'from-blue-500 to-cyan-500';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'C+';
    if (percentage >= 60) return 'C';
    return 'F';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800">

      {/* Spacer for header */}
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Controls Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/60 mb-8 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Performance Analytics</h2>
              <p className="text-gray-600">Comprehensive insights into student performance and quiz effectiveness</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Quiz</label>
                  <select
                    value={selectedQuiz}
                    onChange={(e) => setSelectedQuiz(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  >
                    {quizzes.map((quiz, i) => (
                      <option key={i} value={quiz}>{quiz}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 items-end">
                <button
                  onClick={() => handleDownload('pdf')}
                  disabled={downloading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {downloading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Exporting...
                    </div>
                  ) : (
                    "Export PDF"
                  )}
                </button>
                <button
                  onClick={() => handleDownload('csv')}
                  className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  CSV
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Summary */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: "Average Score", 
              value: average, 
              total: filtered[0]?.total || 20,
              icon: "📊",
              color: "from-blue-500 to-cyan-500",
              change: "+2.3"
            },
            { 
              title: "Highest Score", 
              value: highest, 
              total: filtered[0]?.total || 20,
              icon: "🏆",
              color: "from-green-500 to-emerald-600",
              change: "+5"
            },
            { 
              title: "Lowest Score", 
              value: lowest, 
              total: filtered[0]?.total || 20,
              icon: "📉",
              color: "from-orange-500 to-red-500",
              change: "-1.2"
            },
            { 
              title: "Completion Rate", 
              value: `${completionRate}%`, 
              icon: "✅",
              color: "from-purple-500 to-pink-500",
              change: "+8%"
            },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              {stat.total && <p className="text-sm text-gray-500 mt-1">out of {stat.total}</p>}
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2">
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedQuiz} - Student Performance
                </h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {filtered.length} students
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Student</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Score</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Grade</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Time</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filtered.map((report, index) => {
                      const percentage = (report.score / report.total * 100).toFixed(0);
                      return (
                        <tr 
                          key={report.id} 
                          className="hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-800">{report.student}</p>
                              <p className="text-sm text-gray-500">{report.date}</p>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <p className="font-semibold text-gray-800">{report.score}/{report.total}</p>
                            <p className="text-sm text-gray-500">{percentage}%</p>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              percentage >= 90 ? 'bg-green-100 text-green-700' :
                              percentage >= 75 ? 'bg-blue-100 text-blue-700' :
                              percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {getGrade(percentage)}
                            </span>
                          </td>
                          <td className="p-4 text-center text-gray-600 text-sm">
                            {report.timeSpent}
                          </td>
                          <td className="p-4 text-center">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${getPerformanceColor(percentage)}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg">No reports found</p>
                  <p className="text-gray-400">Try adjusting your search criteria</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Performers */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>🏆</span> Top Performers
              </h3>
              <div className="space-y-4">
                {topPerformers.map((top, i) => {
                  const percentage = (top.score / top.total * 100).toFixed(0);
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                        i === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        'bg-gradient-to-r from-orange-400 to-red-500'
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{top.student}</p>
                        <p className="text-sm text-gray-600">{top.score}/{top.total} points</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-indigo-600">{percentage}%</p>
                        <p className="text-xs text-gray-500">{getGrade(percentage)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Performance Distribution */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>📈</span> Performance Distribution
              </h3>
              <div className="space-y-3">
                {[
                  { range: "90-100% (A)", count: filtered.filter(r => (r.score / r.total * 100) >= 90).length, color: "bg-green-500" },
                  { range: "75-89% (B)", count: filtered.filter(r => (r.score / r.total * 100) >= 75 && (r.score / r.total * 100) < 90).length, color: "bg-blue-500" },
                  { range: "60-74% (C)", count: filtered.filter(r => (r.score / r.total * 100) >= 60 && (r.score / r.total * 100) < 75).length, color: "bg-yellow-500" },
                  { range: "Below 60% (F)", count: filtered.filter(r => (r.score / r.total * 100) < 60).length, color: "bg-red-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.range}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${(item.count / filtered.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-8">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center gap-3">
                  <span>📧</span>
                  <span>Email Report to Students</span>
                </button>
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center gap-3">
                  <span>🔄</span>
                  <span>Compare with Previous Quiz</span>
                </button>
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center gap-3">
                  <span>📋</span>
                  <span>Generate Class Summary</span>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Insights Section */}
        <section className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/60 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span>💡</span> Performance Insights & Recommendations
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-lg">Key Observations</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Average score improved by 5% compared to last assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>85% of students completed the quiz within allocated time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">⚠</span>
                  <span>Questions 7-10 showed higher difficulty - consider review</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-lg">Recommendations</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">🎯</span>
                  <span>Provide additional practice on object-oriented concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">📚</span>
                  <span>Schedule a review session for struggling students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">🚀</span>
                  <span>Consider advanced topics for high-performing students</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 QuizQuest-3 | Designed by Muhammad Abdullah, Hassan Shah & Farhan Butt
          </p>
          <p className="text-indigo-300 mt-2 text-sm">Empowering teachers with data-driven insights for smarter assessments</p>
        </div>
      </footer>
    </div>
  );
}

export default Report;