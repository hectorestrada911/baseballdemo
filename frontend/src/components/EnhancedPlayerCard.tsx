"use client";

import Link from "next/link";
import { PlayerStats } from "@/types/baseball";
import { TrendingUp, Target, Zap, RotateCcw } from "lucide-react";

interface EnhancedPlayerCardProps {
  player: PlayerStats;
  isPitcher?: boolean;
}

export function EnhancedPlayerCard({ player, isPitcher = false }: EnhancedPlayerCardProps) {
  const profileUrl = isPitcher ? `/pitchers/${player.playerId}` : `/hitters/${player.playerId}`;

  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case 'pitcher':
        return 'bg-blue-100 text-blue-800';
      case 'hitter':
        return 'bg-green-100 text-green-800';
      case 'catcher':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStat = (value: number | undefined, suffix: string = '') => {
    if (value === undefined) return 'N/A';
    return `${Math.round(value * 10) / 10}${suffix}`;
  };

  return (
    <Link href={profileUrl} className="block group">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-red-500 cursor-pointer group-hover:scale-105">
        {/* Enhanced Header with SDSU Colors */}
        <div className="relative bg-gradient-to-r from-red-50 to-red-100 p-6">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Enhanced Player Avatar with SDSU Colors */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {player.playerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{player.playerName}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPositionColor(player.position)} shadow-sm`}>
                    {player.position}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="p-6">
          {isPitcher ? (
            // Enhanced Pitcher Stats
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-800">Velocity</span>
                </div>
                <div className="text-2xl font-bold text-red-900">
                  {formatStat(player.avgVelocity, ' mph')}
                </div>
                <div className="text-xs text-red-600 font-medium">Average</div>
              </div>
              
              <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">Max Speed</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatStat(player.maxVelocity, ' mph')}
                </div>
                <div className="text-xs text-gray-600 font-medium">Peak</div>
              </div>
              
              <div className="text-center bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <RotateCcw className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-800">Spin Rate</span>
                </div>
                <div className="text-2xl font-bold text-red-900">
                  {formatStat(player.spinRate, ' rpm')}
                </div>
                <div className="text-xs text-red-600 font-medium">Average</div>
              </div>
              
              <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">ERA</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatStat(player.era)}
                </div>
                <div className="text-xs text-gray-600 font-medium">Earned Runs</div>
              </div>
            </div>
          ) : (
            // Hitter Stats
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Target className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-gray-600">Batting Avg</span>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatStat(player.battingAverage)}
                </div>
                <div className="text-xs text-gray-500">Average</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-gray-600">Hits</span>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {player.hits || 0}
                </div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-gray-600">Home Runs</span>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {player.homeRuns || 0}
                </div>
                <div className="text-xs text-gray-500">HRs</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <RotateCcw className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-gray-600">RBI</span>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {player.rbi || 0}
                </div>
                <div className="text-xs text-gray-500">Runs Batted In</div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Performance Indicator with SDSU Colors */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-t border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Performance Status</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-semibold text-red-600">Active</span>
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-red-400 to-red-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
