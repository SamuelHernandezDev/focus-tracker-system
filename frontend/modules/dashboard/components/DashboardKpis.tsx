//frontend\modules\dashboard\components\DashboardKpis.tsx
import {
    Clock,
    PauseCircle,
    Activity,
    Brain,
    TrendingUp,
    TrendingDown,
    Minus,
  } from "lucide-react";
  
  type Props = {
    data: {
      focusTime: number;
      idleTime: number;
      interruptions: number;
      score: number;
    };
  };
  
  function getScoreColor(score: number) {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  }
  
  function getTrendIcon(score: number) {
    if (score >= 80) return <TrendingUp size={16} className="text-green-500" />;
    if (score >= 60) return <Minus size={16} className="text-yellow-500" />;
    return <TrendingDown size={16} className="text-red-500" />;
  }
  
  export function DashboardKpis({ data }: Props) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
  
        {/* FOCUS TIME */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Focus Time</span>
  
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
              <Clock size={16} className="text-gray-500" />
            </div>
          </div>
  
          <p className="text-2xl font-semibold text-gray-900">
            {data.focusTime} min
          </p>
        </div>
  
        {/* IDLE TIME */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Idle Time</span>
  
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
              <PauseCircle size={16} className="text-gray-500" />
            </div>
          </div>
  
          <p className="text-2xl font-semibold text-gray-900">
            {data.idleTime} min
          </p>
        </div>
  
        {/* INTERRUPTIONS */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Interruptions</span>
  
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
              <Activity size={16} className="text-gray-500" />
            </div>
          </div>
  
          <p className="text-2xl font-semibold text-gray-900">
            {data.interruptions}
          </p>
        </div>
  
        {/* FOCUS SCORE */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Focus Score</span>
  
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
              <Brain size={16} className="text-gray-500" />
            </div>
          </div>
  
          <div className="flex items-center gap-2">
            {getTrendIcon(data.score)}
  
            <p className={`text-2xl font-semibold ${getScoreColor(data.score)}`}>
              {data.score}%
            </p>
          </div>
        </div>
  
      </div>
    );
  }