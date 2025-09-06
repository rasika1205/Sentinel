import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
    return null;
  }
  return res;
};
const ScoreCard = ({ teamId = "T001", className }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/performance/scorecard`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scorecard:", err);
        setLoading(false);
      });
  }, [teamId]);

  if (loading) {
    return (
      <Card className={cn("card-professional p-6", className)}>
        <div className="flex items-center justify-center h-40 text-muted-foreground">
          Loading...
        </div>
      </Card>
    );
  }

  if (!data || data.error) {
    return (
      <Card className={cn("card-professional p-6", className)}>
        <div className="flex items-center justify-center h-40 text-destructive">
          No data available
        </div>
      </Card>
    );
  }

  const { score, previous_score, participation, team_size, avg_rating } = data;

  const difference = score - previous_score;
  const isImproving = difference > 0;
  const isStable = Math.abs(difference) <= 2;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return Shield;
    if (score >= 60) return AlertTriangle;
    return AlertTriangle;
  };

  const ScoreIcon = getScoreIcon(score);

  return (
    <Card className={cn("card-professional p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ScoreIcon className={cn("h-6 w-6", getScoreColor(score))} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Psychological Safety Score</h3>
            <p className="text-sm text-muted-foreground">Team wellness indicator</p>
          </div>
        </div>

        {!isStable && (
          <Badge
            variant={isImproving ? "default" : "destructive"}
            className={cn(
              "flex items-center space-x-1",
              isImproving ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            {isImproving ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(difference)}</span>
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {/* Main Score Display */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${score * 2.827} 282.7`}
                className={cn("transition-all duration-1000", getScoreColor(score))}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-3xl font-bold", getScoreColor(score))}>
                {score}
              </span>
              <span className="text-xs text-muted-foreground font-medium">/ 100</span>
            </div>
          </div>
        </div>

        {/* Score Interpretation */}
        <div className="text-center space-y-2">
          <div className={cn("text-sm font-medium", getScoreColor(score))}>
            {score >= 80 && "Excellent psychological safety"}
            {score >= 60 && score < 80 && "Good psychological safety"}
            {score < 60 && "Needs improvement"}
          </div>

          {previous_score !== undefined && (
            <div className="text-xs text-muted-foreground">
              {isImproving ? "↗" : isStable ? "→" : "↘"} 
              {isImproving ? "+" : ""}{difference} from last period
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-success">
              {participation}%
            </div>
            <div className="text-xs text-muted-foreground">Participation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">{team_size}</div>
            <div className="text-xs text-muted-foreground">Team Size</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">{avg_rating}</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScoreCard;
