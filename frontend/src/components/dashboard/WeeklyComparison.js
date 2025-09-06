import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

const WeeklyComparison = ({ currentScore, className }) => {
  const weeklyData = [
    {
      week: 'Week 1',
      score: 68,
      change: -2,
      participation: 82,
      keyEvents: ['Project deadline stress', 'Team restructuring']
    },
    {
      week: 'Week 2', 
      score: 72,
      change: +4,
      participation: 85,
      keyEvents: ['Team building session', 'Open feedback meeting']
    },
    {
      week: 'Week 3',
      score: 75,
      change: +3,
      participation: 88,
      keyEvents: ['Recognition program launch', 'Process improvements']
    },
    {
      week: 'Week 4 (Current)',
      score: currentScore,
      change: currentScore - 75,
      participation: 87,
      keyEvents: ['New collaboration tools', 'Leadership workshop']
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive"; 
    return "text-muted-foreground";
  };

  const getChangeIcon = (change) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return BarChart3;
  };

  const totalImprovement = currentScore - weeklyData[0].score;
  const averageScore = Math.round(weeklyData.reduce((acc, week) => acc + week.score, 0) / weeklyData.length);

  return (
    <Card className={cn("card-professional p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weekly Performance</h3>
            <p className="text-sm text-muted-foreground">4-week comparison analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/5">
            <Calendar className="h-3 w-3 mr-1" />
            Monthly View
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className={cn("text-lg font-semibold", getChangeColor(totalImprovement))}>
              {totalImprovement > 0 ? '+' : ''}{totalImprovement}
            </div>
            <div className="text-xs text-muted-foreground">Total Change</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{averageScore}</div>
            <div className="text-xs text-muted-foreground">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">86%</div>
            <div className="text-xs text-muted-foreground">Avg Participation</div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-3">
          {weeklyData.map((week, index) => {
            const ChangeIcon = getChangeIcon(week.change);
            const isCurrentWeek = index === weeklyData.length - 1;
            
            return (
              <div 
                key={week.week}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  isCurrentWeek 
                    ? "bg-primary/5 border-primary/20 shadow-sm" 
                    : "bg-card border-border hover:bg-card-hover"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrentWeek ? "text-primary" : "text-foreground"
                    )}>
                      {week.week}
                    </span>
                    {isCurrentWeek && (
                      <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-semibold text-foreground">
                      {week.score}
                    </span>
                    
                    {week.change !== 0 && (
                      <div className={cn(
                        "flex items-center space-x-1 text-xs",
                        getChangeColor(week.change)
                      )}>
                        <ChangeIcon className="h-3 w-3" />
                        <span>{week.change > 0 ? '+' : ''}{week.change}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>Participation: {week.participation}%</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {week.keyEvents.map((event, eventIndex) => (
                      <Badge 
                        key={eventIndex}
                        variant="secondary"
                        className="text-xs bg-muted/50"
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-muted/50 rounded-full h-1.5">
                    <div 
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        week.score >= 80 ? "bg-success" :
                        week.score >= 60 ? "bg-warning" : "bg-destructive"
                      )}
                      style={{ width: `${week.score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default WeeklyComparison;