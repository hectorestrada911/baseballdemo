"use client";

import { useState } from "react";
import { Upload, BarChart3 } from "lucide-react";
import { Pitch, PlayerStats } from "@/types/baseball";

interface DataProcessorProps {
  onDataProcessed: (data: { players: PlayerStats[]; pitches: Pitch[] }) => void;
}

export function DataProcessor({ onDataProcessed }: DataProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedStats, setProcessedStats] = useState<{
    totalPitches: number;
    totalPlayers: number;
    gamesProcessed: number;
  } | null>(null);

  const processCSVData = (csvText: string) => {
    setIsProcessing(true);
    
    // Parse CSV data
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const dataRows = lines.slice(1).filter(line => line.trim());
    
    const pitches: Pitch[] = [];
    const playerStatsMap = new Map<string, PlayerStats>();
    
    dataRows.forEach((row) => {
      const values = row.split(',');
      if (values.length < headers.length) return;
      
      // Create pitch object
      const pitch: Pitch = {
        pitchNo: parseInt(values[0]) || 0,
        date: values[1] || '',
        time: values[2] || '',
        pitcher: values[4] || '',
        pitcherId: values[5] || '',
        batter: values[9] || '',
        batterId: values[10] || '',
        inning: parseInt(values[14]) || 0,
        topBottom: values[15] as 'Top' | 'Bottom',
        outs: parseInt(values[16]) || 0,
        balls: parseInt(values[17]) || 0,
        strikes: parseInt(values[18]) || 0,
        taggedPitchType: values[19] || '',
        autoPitchType: values[20] || '',
        pitchCall: values[21] || '',
        korBB: values[22] || undefined,
        taggedHitType: values[23] || undefined,
        playResult: values[24] || undefined,
        relSpeed: parseFloat(values[29]) || 0,
        spinRate: parseFloat(values[33]) || 0,
        vertBreak: parseFloat(values[37]) || 0,
        horzBreak: parseFloat(values[38]) || 0,
        plateLocHeight: parseFloat(values[39]) || 0,
        plateLocSide: parseFloat(values[40]) || 0,
        exitSpeed: parseFloat(values[42]) || undefined,
        angle: parseFloat(values[43]) || undefined,
        direction: parseFloat(values[44]) || undefined,
        hitSpinRate: parseFloat(values[45]) || undefined,
        distance: parseFloat(values[48]) || undefined,
      };
      
      pitches.push(pitch);
      
      // Update pitcher stats
      if (pitch.pitcherId && pitch.pitcher) {
        const pitcherKey = pitch.pitcherId;
        if (!playerStatsMap.has(pitcherKey)) {
          playerStatsMap.set(pitcherKey, {
            playerId: pitch.pitcherId,
            playerName: pitch.pitcher,
            position: 'Pitcher',
            games: 0,
            atBats: 0,
            hits: 0,
            battingAverage: 0,
            homeRuns: 0,
            rbi: 0,
            strikeouts: 0,
            walks: 0,
            avgVelocity: 0,
            maxVelocity: 0,
            spinRate: 0,
          });
        }
        
        const pitcherStats = playerStatsMap.get(pitcherKey)!;
        pitcherStats.avgVelocity = ((pitcherStats.avgVelocity || 0) + pitch.relSpeed) / 2;
        pitcherStats.maxVelocity = Math.max(pitcherStats.maxVelocity || 0, pitch.relSpeed);
        pitcherStats.spinRate = ((pitcherStats.spinRate || 0) + pitch.spinRate) / 2;
      }
      
      // Update batter stats
      if (pitch.batterId && pitch.batter) {
        const batterKey = pitch.batterId;
        if (!playerStatsMap.has(batterKey)) {
          playerStatsMap.set(batterKey, {
            playerId: pitch.batterId,
            playerName: pitch.batter,
            position: 'Hitter',
            games: 0,
            atBats: 0,
            hits: 0,
            battingAverage: 0,
            homeRuns: 0,
            rbi: 0,
            strikeouts: 0,
            walks: 0,
          });
        }
        
        const batterStats = playerStatsMap.get(batterKey)!;
        if (pitch.playResult === 'Out' || pitch.playResult === 'Strikeout') {
          batterStats.strikeouts++;
        }
        if (pitch.korBB === 'Walk') {
          batterStats.walks++;
        }
      }
    });
    
    const players = Array.from(playerStatsMap.values());
    
    setProcessedStats({
      totalPitches: pitches.length,
      totalPlayers: players.length,
      gamesProcessed: 1, // For now, assuming one game per CSV
    });
    
    onDataProcessed({ players, pitches });
    setIsProcessing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      processCSVData(csvText);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">TrackMan Data Processor</h2>
      </div>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer block">
            <div className="flex flex-col items-center justify-center space-y-3">
              {isProcessing ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
              <p className="text-gray-600">
                {isProcessing ? 'Processing TrackMan data...' : 'Upload TrackMan CSV file'}
              </p>
              <p className="text-sm text-gray-400">Supports detailed pitch and hit data</p>
            </div>
          </label>
        </div>
        
        {processedStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{processedStats.totalPitches}</div>
              <div className="text-sm text-gray-600">Total Pitches</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{processedStats.totalPlayers}</div>
              <div className="text-sm text-gray-600">Players Tracked</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{processedStats.gamesProcessed}</div>
              <div className="text-sm text-gray-600">Games Processed</div>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          <p><strong>Supported Data:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Pitch velocity, spin rate, and movement</li>
            <li>Hit exit velocity and launch angle</li>
            <li>Player performance metrics</li>
            <li>Game situation data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
