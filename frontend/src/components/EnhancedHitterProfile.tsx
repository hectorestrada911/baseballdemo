"use client";

import { useState } from "react";
import { Target, TrendingUp, Zap, BarChart3, MapPin } from "lucide-react";
import { mockPlayers, mockPitches } from "@/data/mockTrackManData";

interface EnhancedHitterProfileProps {
  playerId: string;
}

export function EnhancedHitterProfile({ playerId }: EnhancedHitterProfileProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Find hitter data
  const hitter = mockPlayers.find(p => p.playerId === playerId);
  const hitterAtBats = mockPitches.filter(p => p.batterId === playerId);

  if (!hitter) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hitter Not Found</h1>
          <p className="text-gray-600">The requested hitter could not be found.</p>
        </div>
      </div>
    );
  }

  // Calculate advanced metrics
  const totalAtBats = hitterAtBats.length;
  const hits = hitter.hits || 0;
  const strikeouts = hitter.strikeouts || 0;
  const walks = hitter.walks || 0;
  const battingAverage = hits / Math.max(totalAtBats, 1);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "batting", label: "Batting Stats" },
    { id: "performance", label: "Performance" },
    { id: "situations", label: "Game Situations" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 lg:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{hitter.playerName}</h1>
            <p className="text-gray-300">Hitter • TrackMan Data</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">{battingAverage.toFixed(3)}</div>
            <div className="text-sm text-gray-400">Batting Average</div>
          </div>
        </div>
        <div className="h-1 bg-orange-500 mt-2"></div>
        <div className="h-1 bg-blue-500 mt-1"></div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{hits}</div>
          <div className="text-sm text-gray-600">Hits</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalAtBats}</div>
          <div className="text-sm text-gray-600">At Bats</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <Zap className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{strikeouts}</div>
          <div className="text-sm text-gray-600">Strikeouts</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{walks}</div>
          <div className="text-sm text-gray-600">Walks</div>
        </div>
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
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800">Batting Average</span>
                      <span className="font-semibold text-green-600">{battingAverage.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-800">At Bats</span>
                      <span className="font-semibold text-blue-600">{totalAtBats}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-800">Hits</span>
                      <span className="font-semibold text-purple-600">{hits}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-800">Strikeouts</span>
                      <span className="font-semibold text-red-600">{strikeouts}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-orange-800">Walks</span>
                      <span className="font-semibold text-orange-600">{walks}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-800">On-Base %</span>
                      <span className="font-semibold text-gray-600">
                        {((hits + walks) / Math.max(totalAtBats + walks, 1)).toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Batting Stats Tab */}
          {selectedTab === "batting" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Batting Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Batting Average</span>
                      <span className="text-2xl font-bold text-green-600">{battingAverage.toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800 font-medium">On-Base Percentage</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {((hits + walks) / Math.max(totalAtBats + walks, 1)).toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-800 font-medium">Hit Rate</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {totalAtBats > 0 ? Math.round((hits / totalAtBats) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-800 font-medium">Strikeout Rate</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {totalAtBats > 0 ? Math.round((strikeouts / totalAtBats) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {selectedTab === "performance" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Positive Performance</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• {hits} hits in {totalAtBats} at-bats</li>
                      <li>• {walks} walks drawn</li>
                      <li>• {battingAverage.toFixed(3)} batting average</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• {strikeouts} strikeouts</li>
                      <li>• Strikeout rate: {totalAtBats > 0 ? Math.round((strikeouts / totalAtBats) * 100) : 0}%</li>
                      <li>• Contact rate: {totalAtBats > 0 ? Math.round(((totalAtBats - strikeouts) / totalAtBats) * 100) : 0}%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Game Situations Tab */}
          {selectedTab === "situations" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Situations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">At-Bat Breakdown</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Total At-Bats:</span>
                      <span className="font-semibold ml-2">{totalAtBats}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Hits:</span>
                      <span className="font-semibold ml-2">{hits}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Strikeouts:</span>
                      <span className="font-semibold ml-2">{strikeouts}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Walks:</span>
                      <span className="font-semibold ml-2">{walks}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">Success Rate:</span>
                      <span className="font-semibold ml-2">
                        {totalAtBats > 0 ? Math.round((hits / totalAtBats) * 100) : 0}%
                      </span>
                    </div>
                    <div>
                      <span className="text-green-700">On-Base Rate:</span>
                      <span className="font-semibold ml-2">
                        {Math.round(((hits + walks) / Math.max(totalAtBats + walks, 1)) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Context */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-gray-600" />
          Game Context
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <strong>Date:</strong> 10/17/25
          </div>
          <div>
            <strong>Location:</strong> Tony Gwynn Stadium
          </div>
          <div>
            <strong>Game Type:</strong> Intrasquad
          </div>
        </div>
      </div>
    </div>
  );
}
