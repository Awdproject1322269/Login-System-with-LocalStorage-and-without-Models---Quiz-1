import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TeacherControl() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ayesha Khan", email: "ayesha@student.uog.edu.pk", attendance: false, allowed: false, course: "CS-101" },
    { id: 2, name: "Ali Raza", email: "ali@student.uog.edu.pk", attendance: false, allowed: false, course: "CS-101" },
    { id: 3, name: "Sara Ahmed", email: "sara@student.uog.edu.pk", attendance: true, allowed: true, course: "CS-101" },
    { id: 4, name: "Bilal Hassan", email: "bilal@student.uog.edu.pk", attendance: true, allowed: false, course: "CS-201" },
    { id: 5, name: "Fatima Noor", email: "fatima@student.uog.edu.pk", attendance: true, allowed: true, course: "CS-201" },
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState("Quiz 1");
  const [statusMessage, setStatusMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter students based on search and course
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "All" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, attendance: !s.attendance, allowed: !s.attendance ? false : s.allowed } : s
      )
    );
  };

  const toggleAllow = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, allowed: !s.allowed } : s
      )
    );
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStatusMessage("✅ Attendance and quiz permissions updated successfully!");
      setIsLoading(false);
      setTimeout(() => setStatusMessage(""), 4000);
    }, 1000);
  };

  const handleBulkAction = (action) => {
    setIsLoading(true);
    setTimeout(() => {
      setStudents(prev => prev.map(student => ({
        ...student,
        attendance: action === 'markAllPresent' ? true : student.attendance,
        allowed: action === 'allowAllPresent' ? student.attendance : student.allowed
      })));
      setStatusMessage(`✅ ${action === 'markAllPresent' ? 'All students marked present' : 'All present students allowed for quiz'}!`);
      setIsLoading(false);
      setTimeout(() => setStatusMessage(""), 4000);
    }, 1000);
  };

  const stats = [
    { 
      title: "Total Students", 
      value: students.length, 
      icon: "👥",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Present Today", 
      value: students.filter((s) => s.attendance).length,
      icon: "✅",
      color: "from-green-500 to-teal-500"
    },
    { 
      title: "Allowed for Quiz", 
      value: students.filter((s) => s.allowed).length,
      icon: "🎯",
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Pending Attendance", 
      value: students.filter((s) => !s.attendance).length,
      icon: "⏳",
      color: "from-orange-500 to-red-500"
    },
  ];

  const courses = ["All", "CS-101", "CS-201", "CS-301"];

  if (isLoading && !statusMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800">

      {/* Spacer for header */}
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Quiz Selection Card */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/60 mb-8 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Attendance & Permissions</h2>
              <p className="text-gray-600">Manage student access and attendance for upcoming quizzes</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Quiz</label>
                <select
                  value={selectedQuiz}
                  onChange={(e) => setSelectedQuiz(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                >
                  <option value="Quiz 1">Quiz 1 - Fundamentals of Programming</option>
                  <option value="Quiz 2">Quiz 2 - Object-Oriented Concepts</option>
                  <option value="Quiz 3">Quiz 3 - Data Structures</option>
                </select>
              </div>
              
              <div className="flex gap-3 items-end">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>

          {statusMessage && (
            <div className={`mt-4 p-4 rounded-xl ${
              statusMessage.includes('✅') ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className={`font-medium ${statusMessage.includes('✅') ? 'text-green-700' : 'text-blue-700'}`}>
                {statusMessage}
              </p>
            </div>
          )}
        </section>

        {/* Student Management Card */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/60 mb-8 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Management</h2>
              <p className="text-gray-600">Manage attendance and quiz permissions for individual students</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('markAllPresent')}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium hover:bg-green-100 transition-colors duration-200"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => handleBulkAction('allowAllPresent')}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-medium hover:bg-purple-100 transition-colors duration-200"
                >
                  Allow All Present
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Students</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Student</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Course</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Attendance</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Quiz Access</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className="hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {student.course}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          student.attendance 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                        }`}
                      >
                        {student.attendance ? '✅' : '❌'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleAllow(student.id)}
                        disabled={!student.attendance}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          student.allowed 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : student.attendance 
                            ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' 
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {student.allowed ? '🎯' : '⏸️'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.allowed 
                          ? 'bg-green-100 text-green-700' 
                          : student.attendance 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {student.allowed ? 'Allowed' : student.attendance ? 'Present' : 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">No students found</p>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-700 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Only students marked <strong>present</strong> can be allowed to take the quiz. Attendance must be marked before granting quiz access.
            </p>
          </div>
        </section>

        {/* Activity and Info Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Activity Logs */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📅</span> Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { date: "10 Oct 2025", action: "Attendance updated for Quiz 3", icon: "📊" },
                { date: "8 Oct 2025", action: "2 students allowed to attempt Quiz 2", icon: "✅" },
                { date: "5 Oct 2025", action: "Teacher settings saved successfully", icon: "⚙️" },
                { date: "3 Oct 2025", action: "Reports generated for Batch 2022-CS", icon: "📈" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Help Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>❓</span> How This Works
            </h3>
            <ul className="space-y-3 text-indigo-100">
              <li className="flex items-start gap-2">
                <span className="text-lg">📚</span>
                <span>Each quiz is linked with registered courses and topics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">✅</span>
                <span>Mark attendance before activating any quiz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🔒</span>
                <span>Absent students cannot access quiz links</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">⚖️</span>
                <span>Ensures assessment integrity and fairness</span>
              </li>
            </ul>
            
            <div className="mt-6 pt-4 border-t border-indigo-400">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <span>💬</span>
                Contact Support
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 QuizQuest-3 | Designed by Muhammad Abdullah, Hassan Shah & Farhan Butt
          </p>
          <p className="text-indigo-300 mt-2 text-sm">Empowering smart assessments for future innovators</p>
        </div>
      </footer>
    </div>
  );
}

export default TeacherControl;