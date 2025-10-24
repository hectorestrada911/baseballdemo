"use client";

import { useState } from "react";
import { Users, Calendar, MapPin, Clock, Phone, Mail, Star, TrendingUp } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  specialty: string;
}

interface UpcomingGame {
  date: string;
  opponent: string;
  location: string;
  time: string;
  type: "Home" | "Away";
}

export function TeamInfoPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock team data
  const teamStats = {
    totalPlayers: 24,
    gamesPlayed: 12,
    wins: 8,
    losses: 4,
    winPercentage: 66.7,
    avgRunsPerGame: 5.2,
    teamEra: 3.45
  };

  const coachingStaff: TeamMember[] = [
    {
      name: "Coach Martinez",
      role: "Head Coach",
      experience: "15 years",
      specialty: "Strategy & Leadership"
    },
    {
      name: "Coach Johnson",
      role: "Pitching Coach",
      experience: "12 years",
      specialty: "Pitching Development"
    },
    {
      name: "Coach Williams",
      role: "Hitting Coach",
      experience: "10 years",
      specialty: "Batting Technique"
    },
    {
      name: "Coach Davis",
      role: "Strength & Conditioning",
      experience: "8 years",
      specialty: "Physical Training"
    }
  ];

  const upcomingGames: UpcomingGame[] = [
    {
      date: "2024-01-25",
      opponent: "Thunder Hawks",
      location: "Home Stadium",
      time: "7:00 PM",
      type: "Home"
    },
    {
      date: "2024-01-28",
      opponent: "Wild Cats",
      location: "Away Field",
      time: "2:00 PM",
      type: "Away"
    },
    {
      date: "2024-02-01",
      opponent: "Eagles",
      location: "Home Stadium",
      time: "6:30 PM",
      type: "Home"
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "stats", label: "Stats", icon: TrendingUp },
    { id: "roster", label: "Roster", icon: Users },
    { id: "coaching", label: "Coaching Staff", icon: Star },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "contact", label: "Contact", icon: Phone }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with SDSU Colors */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 lg:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center">
            <Users className="h-8 w-8 mr-3 text-red-200" />
            SDSU Aztecs Team Information
          </h1>
        </div>
        <div className="h-1 bg-red-500 mt-2"></div>
        <div className="h-1 bg-black mt-1"></div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === tab.id
                    ? "border-red-500 text-red-600 bg-red-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 lg:p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Season Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{teamStats.totalPlayers}</div>
                    <div className="text-sm text-gray-300">Total Players</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{teamStats.wins}-{teamStats.losses}</div>
                    <div className="text-sm text-gray-300">Win-Loss Record</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{teamStats.winPercentage}%</div>
                    <div className="text-sm text-gray-300">Win Percentage</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{teamStats.avgRunsPerGame}</div>
                    <div className="text-sm text-gray-300">Avg Runs/Game</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Performance</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                      <span className="text-sm text-gray-300">Team ERA</span>
                      <span className="text-sm font-semibold text-white">{teamStats.teamEra}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                      <span className="text-sm text-gray-300">Games Played</span>
                      <span className="text-sm font-semibold text-white">{teamStats.gamesPlayed}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                      <span className="text-sm text-gray-300">Current Streak</span>
                      <span className="text-sm font-semibold text-white flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        3 Wins
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                      <span className="text-sm text-gray-300">Season Status</span>
                      <span className="text-sm font-semibold text-white">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {selectedTab === "stats" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">.287</div>
                    <div className="text-sm text-gray-300">Team Batting Average</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">3.45</div>
                    <div className="text-sm text-gray-300">Team ERA</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">127</div>
                    <div className="text-sm text-gray-300">Total Strikeouts</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">89</div>
                    <div className="text-sm text-gray-300">Total RBIs</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">23</div>
                    <div className="text-sm text-gray-300">Home Runs</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">156</div>
                    <div className="text-sm text-gray-300">Total Hits</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Roster Tab */}
          {selectedTab === "roster" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Roster</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="bg-black p-4 rounded-lg">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{i + 1}</span>
                      </div>
                      <div className="text-white font-semibold">Player {i + 1}</div>
                      <div className="text-gray-300 text-sm">Position</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coaching Staff Tab */}
          {selectedTab === "coaching" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Coaching Staff</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coachingStaff.map((coach, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Star className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{coach.name}</h3>
                        <p className="text-sm text-gray-600">{coach.role}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {coach.experience} • {coach.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {selectedTab === "schedule" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Games</h2>
              <div className="space-y-3">
                {upcomingGames.map((game, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          game.type === "Home" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {game.type}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{game.opponent}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {game.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatDate(game.date)}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {game.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {selectedTab === "contact" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Main Office</p>
                        <p className="text-sm text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">info@baseballteam.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-sm text-gray-600">123 Baseball Stadium Dr<br />Sports City, SC 12345</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Office Hours</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
