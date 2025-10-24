"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Clock, BarChart3, Target } from "lucide-react";
import { DataProcessor } from "./DataProcessor";
import { PlayerStats, Pitch } from "@/types/baseball";

interface UploadRecord {
  id: string;
  filename: string;
  status: "processing" | "complete" | "error";
  uploadedAt: string;
  processedAt?: string;
  recordsProcessed?: number;
  errorMessage?: string;
  gameData?: {
    totalPitches: number;
    totalPlayers: number;
    avgVelocity: number;
    maxVelocity: number;
  };
}

export function EnhancedUploadPage() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "complete" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<{ players: PlayerStats[]; pitches: Pitch[] } | null>(null);
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([
    {
      id: "upload_1",
      filename: "10-17-2025 - Intrasquad 10-17.csv",
      status: "complete",
      uploadedAt: "2024-10-17T15:30:00Z",
      processedAt: "2024-10-17T15:35:00Z",
      recordsProcessed: 230,
      gameData: {
        totalPitches: 230,
        totalPlayers: 8,
        avgVelocity: 85.2,
        maxVelocity: 92.9
      }
    }
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("idle");
    }
  };

  const handleDataProcessed = (data: { players: PlayerStats[]; pitches: Pitch[] }) => {
    setProcessedData(data);
    
    // Calculate game statistics
    const avgVelocity = data.pitches.reduce((sum, pitch) => sum + pitch.relSpeed, 0) / data.pitches.length;
    const maxVelocity = Math.max(...data.pitches.map(p => p.relSpeed));
    
    // Add to upload history
    const newRecord: UploadRecord = {
      id: `upload_${Date.now()}`,
      filename: selectedFile?.name || "trackman_data.csv",
      status: "complete",
      uploadedAt: new Date().toISOString(),
      processedAt: new Date().toISOString(),
      recordsProcessed: data.pitches.length,
      gameData: {
        totalPitches: data.pitches.length,
        totalPlayers: data.players.length,
        avgVelocity: Math.round(avgVelocity * 10) / 10,
        maxVelocity: Math.round(maxVelocity * 10) / 10
      }
    };
    
    setUploadHistory(prev => [newRecord, ...prev]);
    setUploadStatus("complete");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploadStatus("uploading");
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus("processing");
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
        return <Clock className="h-6 w-6 animate-spin text-blue-500" />;
      case "processing":
        return <BarChart3 className="h-6 w-6 animate-pulse text-yellow-500" />;
      case "complete":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Upload className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with SDSU Colors */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 lg:p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Upload className="h-8 w-8 mr-3 text-red-200" />
          <h1 className="text-2xl lg:text-3xl font-bold">SDSU TrackMan Data Upload</h1>
        </div>
        <div className="h-1 bg-red-500 mt-2"></div>
        <div className="h-1 bg-black mt-1"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload TrackMan CSV</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center space-y-3">
                {getStatusIcon(uploadStatus)}
                <p className="text-gray-600 text-lg">
                  {selectedFile ? selectedFile.name : "Drag & drop your TrackMan CSV here"}
                </p>
                <p className="text-sm text-gray-400">Supports detailed pitch and hit data</p>
              </div>
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploadStatus === "uploading"}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-colors ${
              !selectedFile || uploadStatus === "uploading"
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload & Process"}
          </button>
        </div>

        {/* Data Processor */}
        <div>
          <DataProcessor onDataProcessed={handleDataProcessed} />
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-600" />
            Upload History
          </h2>
          <span className="text-sm text-gray-500">{uploadHistory.length} files</span>
        </div>

        <div className="space-y-3">
          {uploadHistory.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {record.status === "complete" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : record.status === "error" ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{record.filename}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(record.uploadedAt).toLocaleDateString()} at{" "}
                      {new Date(record.uploadedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {record.recordsProcessed} records
                  </p>
                  {record.gameData && (
                    <div className="text-xs text-gray-500 mt-1">
                      <div>Avg: {record.gameData.avgVelocity} mph</div>
                      <div>Max: {record.gameData.maxVelocity} mph</div>
                    </div>
                  )}
                </div>
              </div>
              
              {record.status === "complete" && record.gameData && (
                <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-sm font-semibold text-blue-600">{record.gameData.totalPitches}</div>
                    <div className="text-xs text-gray-600">Pitches</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-sm font-semibold text-green-600">{record.gameData.totalPlayers}</div>
                    <div className="text-xs text-gray-600">Players</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <div className="text-sm font-semibold text-purple-600">{record.gameData.avgVelocity} mph</div>
                    <div className="text-xs text-gray-600">Avg Speed</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Data Insights */}
      {processedData && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            Data Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{processedData.pitches.length}</div>
              <div className="text-sm text-gray-600">Total Pitches</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{processedData.players.length}</div>
              <div className="text-sm text-gray-600">Players Tracked</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(processedData.pitches.reduce((sum, p) => sum + p.relSpeed, 0) / processedData.pitches.length * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Avg Velocity (mph)</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(Math.max(...processedData.pitches.map(p => p.relSpeed)) * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Max Velocity (mph)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
