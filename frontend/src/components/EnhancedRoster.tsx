"use client";

import { useState } from "react";
import { Users, Zap, Target, RotateCcw, BarChart3, Filter } from "lucide-react";
import { EnhancedPlayerCard } from "./EnhancedPlayerCard";
import { mockPlayers } from "@/data/mockTrackManData";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export function EnhancedRoster() {
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCharts, setShowCharts] = useState(true);

  const positions = ["all", "P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];

  const filteredPlayers = mockPlayers.filter((player) => {
    const matchesPosition = selectedPosition === "all" || player.position === selectedPosition;
    const matchesSearch = player.playerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  // Calculate team statistics
  const teamStats = {
    totalPlayers: mockPlayers.length,
    avgVelocity: mockPlayers.reduce((sum, p) => sum + (p.avgVelocity || 0), 0) / mockPlayers.length,
    avgSpinRate: mockPlayers.reduce((sum, p) => sum + (p.spinRate || 0), 0) / mockPlayers.length,
    totalStrikeouts: mockPlayers.reduce((sum, p) => sum + (p.strikeouts || 0), 0),
  };

  // Chart data for velocity distribution
  const velocityData = mockPlayers
    .filter(p => p.avgVelocity && p.avgVelocity > 0)
    .map(p => ({ name: p.playerName.split(' ')[0], velocity: p.avgVelocity! }))
    .sort((a, b) => (b.velocity || 0) - (a.velocity || 0))
    .slice(0, 8);

  // Position distribution data
  const positionData = positions.slice(1).map(pos => ({
    name: pos,
    value: mockPlayers.filter(p => p.position === pos).length,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const COLORS = ['#dc2626', '#000000', '#ef4444', '#7f1d1d', '#dc2626', '#374151', '#991b1b', '#6b7280'];

  return (
    <div className="space-y-6">
      {/* Enhanced Header with SDSU Colors */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-red-900/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">SDSU Aztecs Roster</h1>
              <p className="text-red-100">TrackMan data from 10/17/25 Intrasquad game at Tony Gwynn Stadium</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-200">{filteredPlayers.length}</div>
              <div className="text-sm text-red-300">Active Players</div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-1 bg-red-500 rounded-full flex-1"></div>
            <div className="h-1 bg-black rounded-full flex-1"></div>
            <div className="h-1 bg-red-400 rounded-full flex-1"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Team Stats with SDSU Colors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Total Players</p>
              <p className="text-3xl font-bold">{teamStats.totalPlayers}</p>
            </div>
            <Users className="h-8 w-8 text-red-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm font-medium">Avg Velocity</p>
              <p className="text-3xl font-bold">{teamStats.avgVelocity.toFixed(1)} mph</p>
            </div>
            <Zap className="h-8 w-8 text-gray-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Avg Spin Rate</p>
              <p className="text-3xl font-bold">{teamStats.avgSpinRate.toFixed(0)} rpm</p>
            </div>
            <RotateCcw className="h-8 w-8 text-red-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm font-medium">Total Strikeouts</p>
              <p className="text-3xl font-bold">{teamStats.totalStrikeouts}</p>
            </div>
            <Target className="h-8 w-8 text-gray-200" />
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      {showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Velocity Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Velocity Distribution</h3>
              <BarChart3 className="h-5 w-5 text-red-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value} mph`, 'Velocity']}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ 
                      backgroundColor: '#f9fafb', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="velocity" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Position Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Position Distribution</h3>
              <Users className="h-5 w-5 text-red-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={positionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {positionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search players by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setSelectedPosition(position)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPosition === position
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {position === "all" ? "All Positions" : position}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            {showCharts ? 'Hide Charts' : 'Show Charts'}
          </button>
        </div>
      </div>

      {/* Enhanced Player Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <EnhancedPlayerCard 
            key={player.playerId} 
            player={player}
            isPitcher={player.position === "Pitcher"}
          />
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No players found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
