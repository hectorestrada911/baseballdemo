"use client";

import { useState } from "react";
import { Zap, Target, RotateCcw, TrendingUp, MapPin } from "lucide-react";
import { mockPlayers, mockPitches } from "@/data/mockTrackManData";

interface EnhancedPitcherProfileProps {
  playerId: string;
}

export function EnhancedPitcherProfile({ playerId }: EnhancedPitcherProfileProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Find pitcher data
  const pitcher = mockPlayers.find(p => p.playerId === playerId);
  const pitcherPitches = mockPitches.filter(p => p.pitcherId === playerId);

  if (!pitcher) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pitcher Not Found</h1>
          <p className="text-gray-600">The requested pitcher could not be found.</p>
        </div>
      </div>
    );
  }

  // Calculate advanced metrics
  const avgVelocity = pitcherPitches.reduce((sum, p) => sum + p.relSpeed, 0) / pitcherPitches.length;
  const maxVelocity = Math.max(...pitcherPitches.map(p => p.relSpeed));
  const avgSpinRate = pitcherPitches.reduce((sum, p) => sum + p.spinRate, 0) / pitcherPitches.length;
  const pitchTypes = pitcherPitches.reduce((acc, p) => {
    acc[p.taggedPitchType] = (acc[p.taggedPitchType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "pitches", label: "Pitch Analysis" },
    { id: "velocity", label: "Velocity Trends" },
    { id: "movement", label: "Movement" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 lg:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{pitcher.playerName}</h1>
            <p className="text-gray-300">Pitcher • TrackMan Data</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">{avgVelocity.toFixed(1)} mph</div>
            <div className="text-sm text-gray-400">Average Velocity</div>
          </div>
        </div>
        <div className="h-1 bg-orange-500 mt-2"></div>
        <div className="h-1 bg-blue-500 mt-1"></div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{maxVelocity.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Max Velocity (mph)</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <RotateCcw className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Math.round(avgSpinRate)}</div>
          <div className="text-sm text-gray-600">Avg Spin Rate (rpm)</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{pitcherPitches.length}</div>
          <div className="text-sm text-gray-600">Total Pitches</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Object.keys(pitchTypes).length}</div>
          <div className="text-sm text-gray-600">Pitch Types</div>
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
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-800">Average Velocity</span>
                      <span className="font-semibold text-blue-600">{avgVelocity.toFixed(1)} mph</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800">Max Velocity</span>
                      <span className="font-semibold text-green-600">{maxVelocity.toFixed(1)} mph</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-800">Average Spin Rate</span>
                      <span className="font-semibold text-purple-600">{Math.round(avgSpinRate)} rpm</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-orange-800">Total Pitches</span>
                      <span className="font-semibold text-orange-600">{pitcherPitches.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-800">Pitch Types</span>
                      <span className="font-semibold text-gray-600">{Object.keys(pitchTypes).length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="text-indigo-800">Games Tracked</span>
                      <span className="font-semibold text-indigo-600">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pitch Analysis Tab */}
          {selectedTab === "pitches" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pitch Type Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(pitchTypes).map(([pitchType, count]) => (
                  <div key={pitchType} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{pitchType}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / pitcherPitches.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-12 text-right">
                        {count} ({Math.round((count / pitcherPitches.length) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Velocity Trends Tab */}
          {selectedTab === "velocity" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Velocity Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800 font-medium">Fastest Pitch</span>
                      <span className="text-2xl font-bold text-blue-600">{maxVelocity.toFixed(1)} mph</span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Average Velocity</span>
                      <span className="text-2xl font-bold text-green-600">{avgVelocity.toFixed(1)} mph</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-800 font-medium">Velocity Range</span>
                      <span className="text-lg font-bold text-purple-600">
                        {Math.min(...pitcherPitches.map(p => p.relSpeed)).toFixed(1)} - {maxVelocity.toFixed(1)} mph
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-800 font-medium">Consistency</span>
                      <span className="text-lg font-bold text-orange-600">
                        {((maxVelocity - Math.min(...pitcherPitches.map(p => p.relSpeed))) / avgVelocity * 100).toFixed(1)}% variance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Movement Tab */}
          {selectedTab === "movement" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pitch Movement Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800 font-medium">Avg Vertical Break</span>
                      <span className="text-lg font-bold text-blue-600">
                        {pitcherPitches.reduce((sum, p) => sum + p.vertBreak, 0) / pitcherPitches.length} inches
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Avg Horizontal Break</span>
                      <span className="text-lg font-bold text-green-600">
                        {pitcherPitches.reduce((sum, p) => sum + p.horzBreak, 0) / pitcherPitches.length} inches
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-800 font-medium">Avg Spin Rate</span>
                      <span className="text-lg font-bold text-purple-600">{Math.round(avgSpinRate)} rpm</span>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-800 font-medium">Release Point</span>
                      <span className="text-lg font-bold text-orange-600">
                        {pitcherPitches.reduce((sum, p) => sum + p.plateLocHeight, 0) / pitcherPitches.length} ft
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
