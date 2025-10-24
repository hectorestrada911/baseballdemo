// Baseball data types based on TrackMan CSV structure

export interface Player {
  id: string;
  name: string;
  position: 'Pitcher' | 'Hitter' | 'Catcher';
  team: string;
  throws?: 'Left' | 'Right';
  bats?: 'Left' | 'Right';
  jersey?: string;
}

export interface Pitch {
  pitchNo: number;
  date: string;
  time: string;
  pitcher: string;
  pitcherId: string;
  batter: string;
  batterId: string;
  inning: number;
  topBottom: 'Top' | 'Bottom';
  outs: number;
  balls: number;
  strikes: number;
  taggedPitchType: string;
  autoPitchType: string;
  pitchCall: string;
  korBB?: string;
  taggedHitType?: string;
  playResult?: string;
  relSpeed: number;
  spinRate: number;
  vertBreak: number;
  horzBreak: number;
  plateLocHeight: number;
  plateLocSide: number;
  exitSpeed?: number;
  angle?: number;
  direction?: number;
  hitSpinRate?: number;
  distance?: number;
}

export interface Game {
  gameId: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  level: string;
  league: string;
  pitches: Pitch[];
}

export interface PlayerStats {
  playerId: string;
  playerName: string;
  position: string;
  games: number;
  atBats: number;
  hits: number;
  battingAverage: number;
  homeRuns: number;
  rbi: number;
  strikeouts: number;
  walks: number;
  avgVelocity?: number;
  maxVelocity?: number;
  spinRate?: number;
  era?: number;
  whip?: number;
}

export interface TeamStats {
  teamName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winPercentage: number;
  teamBattingAverage: number;
  teamEra: number;
  totalRuns: number;
  totalHits: number;
}
