"use client";

import { useState } from "react";
import { Target, Zap, RotateCcw, BarChart3, Trophy } from "lucide-react";
import { mockPlayers, mockPitches } from "@/data/mockTrackManData";
import { PlayerStats } from "@/types/baseball";

export function TrackManLeaderboards() {
  const [selectedMetric, setSelectedMetric] = useState("velocity");

  // Calculate leaderboard data from TrackMan data
  const velocityLeaders = mockPlayers
    .filter(p => p.position === "Pitcher")
    .sort((a, b) => (b.avgVelocity || 0) - (a.avgVelocity || 0));

  const spinRateLeaders = mockPlayers
    .filter(p => p.position === "Pitcher")
    .sort((a, b) => (b.spinRate || 0) - (a.spinRate || 0));

  const battingLeaders = mockPlayers
    .filter(p => p.position === "Hitter")
    .sort((a, b) => (b.battingAverage || 0) - (a.battingAverage || 0));

  const strikeoutLeaders = mockPlayers
    .filter(p => p.position === "Hitter")
    .sort((a, b) => (b.strikeouts || 0) - (a.strikeouts || 0));

  const metrics = [
    { id: "velocity", label: "Pitching Velocity", icon: Zap, data: velocityLeaders },
    { id: "spinrate", label: "Spin Rate", icon: RotateCcw, data: spinRateLeaders },
    { id: "batting", label: "Batting Average", icon: Target, data: battingLeaders },
    { id: "strikeouts", label: "Strikeouts", icon: Trophy, data: strikeoutLeaders },
  ];

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0];

  const getValueDisplay = (player: PlayerStats, metric: string) => {
    switch (metric) {
      case "velocity":
        return `${player.avgVelocity || 0} mph`;
      case "spinrate":
        return `${player.spinRate || 0} rpm`;
      case "batting":
        return `${(player.battingAverage || 0).toFixed(3)}`;
      case "strikeouts":
        return `${player.strikeouts || 0}`;
      default:
        return "N/A";
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 1: return "bg-gray-100 text-gray-800 border-gray-300";
      case 2: return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-white text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with SDSU Colors */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 lg:p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-8 w-8 mr-3 text-red-200" />
          <h1 className="text-2xl lg:text-3xl font-bold">SDSU Performance Leaderboards</h1>
        </div>
        <p className="text-red-100 text-sm lg:text-base">
          TrackMan data from 10/17/25 Intrasquad game
        </p>
        <div className="h-1 bg-red-500 mt-2"></div>
        <div className="h-1 bg-black mt-1"></div>
      </div>

      {/* Metric Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Performance Metric</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedMetric === metric.id
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <metric.icon className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-medium">{metric.label}</div>
                  <div className="text-sm text-gray-500">
                    {metric.data.length} players
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <currentMetric.icon className="h-5 w-5 mr-2 text-blue-600" />
            {currentMetric.label} Leaderboard
          </h2>
          <div className="text-sm text-gray-500">
            Based on TrackMan data
          </div>
        </div>

        <div className="space-y-3">
          {currentMetric.data.map((player, index) => (
            <div
              key={player.playerId}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${getRankColor(index)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{player.playerName}</h3>
                  <p className="text-sm text-gray-600">{player.position}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {getValueDisplay(player, selectedMetric)}
                </div>
                {selectedMetric === "velocity" && (
                  <div className="text-sm text-gray-500">
                    Max: {player.maxVelocity || 0} mph
                  </div>
                )}
                {selectedMetric === "batting" && (
                  <div className="text-sm text-gray-500">
                    {player.hits || 0} hits
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Game Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Pitching Performance</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {mockPitches.length} total pitches tracked</li>
              <li>• Average velocity: {Math.round(mockPitches.reduce((sum, p) => sum + p.relSpeed, 0) / mockPitches.length * 10) / 10} mph</li>
              <li>• Max velocity: {Math.round(Math.max(...mockPitches.map(p => p.relSpeed)) * 10) / 10} mph</li>
              <li>• Average spin rate: {Math.round(mockPitches.reduce((sum, p) => sum + p.spinRate, 0) / mockPitches.length)} rpm</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Hitting Performance</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {mockPlayers.filter(p => p.position === "Hitter").length} batters tracked</li>
              <li>• Team batting average: .167</li>
              <li>• Total strikeouts: {mockPlayers.filter(p => p.position === "Hitter").reduce((sum, p) => sum + (p.strikeouts || 0), 0)}</li>
              <li>• Total hits: {mockPlayers.filter(p => p.position === "Hitter").reduce((sum, p) => sum + (p.hits || 0), 0)}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Game Context</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Date: 10/17/25</li>
              <li>• Location: Tony Gwynn Stadium</li>
              <li>• Type: Intrasquad game</li>
              <li>• Duration: Full game tracked</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
