import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Settings() {
  const [settings, setSettings] = useState({
    questionsPerPage: 5,
    shuffleQuestions: true,
    shuffleOptions: false,
    marksPerQuestion: 1,
    timeLimit: 30,
    allowReview: true,
    autoSubmit: false,
    showResults: true,
    difficulty: "medium",
    theme: "light",
    notifications: true,
  });

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSaved(true);
      setIsLoading(false);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setSettings({
      questionsPerPage: 5,
      shuffleQuestions: true,
      shuffleOptions: false,
      marksPerQuestion: 1,
      timeLimit: 30,
      allowReview: true,
      autoSubmit: false,
      showResults: true,
      difficulty: "medium",
      theme: "light",
      notifications: true,
    });
    setSaved(false);
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "display", name: "Display", icon: "🎨" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
  ];

  if (isLoading && !saved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800">

      {/* Spacer for header */}
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 animate-in slide-in-from-top">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <p className="font-semibold text-green-800">Settings saved successfully!</p>
                <p className="text-green-600 text-sm">Your preferences have been updated</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings Categories</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>🔄</span>
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden">
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">⚙️</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">General Settings</h2>
                      <p className="text-gray-600">Configure basic quiz behavior and defaults</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Questions Per Page
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="1"
                            max="20"
                            value={settings.questionsPerPage}
                            onChange={(e) => handleChange("questionsPerPage", Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="w-12 text-center font-semibold text-gray-800">
                            {settings.questionsPerPage}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Number of questions displayed per page during quiz</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Default Marks Per Question
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={settings.marksPerQuestion}
                          onChange={(e) => handleChange("marksPerQuestion", Number(e.target.value))}
                          className="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Default Time Limit (minutes)
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="180"
                          value={settings.timeLimit}
                          onChange={(e) => handleChange("timeLimit", Number(e.target.value))}
                          className="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-gray-800">Shuffle Questions</p>
                          <p className="text-sm text-gray-600">Randomize question order</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.shuffleQuestions}
                            onChange={(e) => handleChange("shuffleQuestions", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-6 transition-all duration-300"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-gray-800">Shuffle Options</p>
                          <p className="text-sm text-gray-600">Randomize MCQ options</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.shuffleOptions}
                            onChange={(e) => handleChange("shuffleOptions", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-6 transition-all duration-300"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-gray-800">Allow Review</p>
                          <p className="text-sm text-gray-600">Students can review answers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.allowReview}
                            onChange={(e) => handleChange("allowReview", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-6 transition-all duration-300"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeTab === "display" && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Display Settings</h2>
                      <p className="text-gray-600">Customize the visual appearance and interface</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Theme</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: "light", name: "Light", icon: "☀️" },
                            { value: "dark", name: "Dark", icon: "🌙" },
                            { value: "auto", name: "Auto", icon: "⚡" },
                          ].map((theme) => (
                            <button
                              key={theme.value}
                              onClick={() => handleChange("theme", theme.value)}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                                settings.theme === theme.value
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span className="text-2xl">{theme.icon}</span>
                              <span className="font-medium text-gray-800">{theme.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-gray-800">Show Results Immediately</p>
                          <p className="text-sm text-gray-600">Display scores after submission</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.showResults}
                            onChange={(e) => handleChange("showResults", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-6 transition-all duration-300"></div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Default Difficulty</label>
                        <select
                          value={settings.difficulty}
                          onChange={(e) => handleChange("difficulty", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                          <option value="mixed">Mixed</option>
                        </select>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Preview Mode</h4>
                        <p className="text-sm text-blue-600 mb-3">See how your settings affect the student experience</p>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200">
                          Launch Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Security Settings</h2>
                      <p className="text-gray-600">Configure security and integrity features</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">Auto-Submit on Timeout</p>
                        <p className="text-sm text-gray-600">Automatically submit when time expires</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoSubmit}
                          onChange={(e) => handleChange("autoSubmit", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-6 transition-all duration-300"></div>
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Data Encryption</h4>
                        <p className="text-sm text-green-600">All quiz data is encrypted for security</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-green-500">✅</span>
                          <span className="text-sm text-green-700">Enabled</span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Session Security</h4>
                        <p className="text-sm text-blue-600">Automatic logout after inactivity</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-blue-500">⏰</span>
                          <span className="text-sm text-blue-700">30 minutes</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">Security Recommendations</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Enable auto-submit to prevent time exploitation</li>
                        <li>• Use question shuffling to discourage cheating</li>
                        <li>• Consider disabling review mode for high-stakes tests</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🔔</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Notification Settings</h2>
                      <p className="text-gray-600">Manage alerts and communication preferences</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications}
                          onChange={(e) => handleChange("notifications", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-6 transition-all duration-300"></div>
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-3">Notification Types</h4>
                        <div className="space-y-3">
                          {[
                            { name: "Quiz Submissions", enabled: true },
                            { name: "Student Questions", enabled: true },
                            { name: "System Updates", enabled: false },
                            { name: "Performance Reports", enabled: true },
                          ].map((type, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{type.name}</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked={type.enabled}
                                  className="sr-only peer"
                                />
                                <div className="w-8 h-4 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                                <div className="absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full peer-checked:translate-x-4 transition-all duration-300"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                        <h4 className="font-semibold text-indigo-800 mb-2">Delivery Schedule</h4>
                        <p className="text-sm text-indigo-600 mb-3">Choose when to receive notifications</p>
                        <select className="w-full px-3 py-2 border border-indigo-200 rounded-lg bg-white text-indigo-700">
                          <option>Immediately</option>
                          <option>Daily Digest</option>
                          <option>Weekly Summary</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Apply Settings</p>
                    <p className="text-sm text-gray-600">Save your preferences across all quizzes</p>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      "Save All Settings"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 QuizQuest-3 | Designed by Muhammad Abdullah, Hassan Shah & Farhan Butt
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Settings;