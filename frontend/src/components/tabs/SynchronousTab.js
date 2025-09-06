import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Users, MessageCircle, Activity, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const SynchronousTab = ({ teamId }) => {
  const [todayScore, setTodayScore] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extra live metrics (optional, derived from activities)
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 0,
    totalTeam: 0,
    messagesCount: 0,
    meetingsToday: 0,
    currentMood: "neutral",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/performance/synchronous`);
        const data = await res.json();

        if (!data.error) {
          setTodayScore(data.todayScore);
          setRecentActivities(data.recentActivities);

          // Simple derived metrics
          const uniqueUsers = new Set(data.recentActivities.map((a) => a.user));
          const sentimentCounts = data.recentActivities.reduce(
            (acc, a) => {
              acc[a.sentiment] = (acc[a.sentiment] || 0) + 1;
              return acc;
            },
            {}
          );
          let currentMood = "neutral";
          if ((sentimentCounts["positive"] || 0) > (sentimentCounts["negative"] || 0)) {
            currentMood = "positive";
          } else if ((sentimentCounts["negative"] || 0) > (sentimentCounts["positive"] || 0)) {
            currentMood = "negative";
          }

          setLiveMetrics({
            activeUsers: uniqueUsers.size,
            totalTeam: data.teamSize || 12, // fallback
            messagesCount: data.recentActivities.length,
            meetingsToday: 0, // can be extended if backend adds meeting logs
            currentMood,
          });
        }
      } catch (err) {
        console.error("Error fetching synchronous data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "text-success";
      case "constructive":
        return "text-warning";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getSentimentBg = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-success/10";
      case "constructive":
        return "bg-warning/10";
      case "negative":
        return "bg-destructive/10";
      default:
        return "bg-muted/20";
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading live team pulse...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Live Team Pulse</h2>
          <p className="text-muted-foreground">Real-time psychological safety monitoring</p>
        </div>
        <Badge variant="default" className="bg-success text-success-foreground">
          <Activity className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      {/* Today's Score */}
      <Card className="card-professional p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Today's Safety Score</h3>
              <p className="text-sm text-muted-foreground">Based on real-time interactions</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-success">
              {todayScore ?? "N/A"}
            </div>
            <div className="text-xs text-muted-foreground">Live Score</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-xl font-semibold text-primary">
              {liveMetrics.activeUsers}/{liveMetrics.totalTeam}
            </div>
            <div className="text-xs text-muted-foreground">Active Now</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-xl font-semibold text-foreground">
              {liveMetrics.messagesCount}
            </div>
            <div className="text-xs text-muted-foreground">Messages Today</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-xl font-semibold text-foreground">
              {liveMetrics.meetingsToday}
            </div>
            <div className="text-xs text-muted-foreground">Meetings</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-xl font-semibold text-success capitalize">
              {liveMetrics.currentMood}
            </div>
            <div className="text-xs text-muted-foreground">Team Mood</div>
          </div>
        </div>
      </Card>

      {/* Live Activity Feed */}
      <Card className="card-professional p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Live Activity Stream</h3>
              <p className="text-sm text-muted-foreground">Recent team interactions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live Updates</span>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivities.length === 0 ? (
            <p className="text-muted-foreground">No recent activity found.</p>
          ) : (
            recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:bg-card-hover transition-colors"
              >
                <div className="text-xs text-muted-foreground min-w-[60px]">
                  {activity.time}
                </div>
                <div className="flex-1 flex items-center space-x-3">
                  <div className="font-medium text-sm text-foreground min-w-[80px]">
                    {activity.user}
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.action}</div>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    getSentimentBg(activity.sentiment),
                    getSentimentColor(activity.sentiment)
                  )}
                >
                  {activity.sentiment}
                </Badge>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Alerts (Static for now) */}
      <Card className="card-professional p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-warning/10 rounded-lg">
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
            <p className="text-sm text-muted-foreground">Items requiring attention</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-warning" />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Low participation detected
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Some team members haven’t contributed today
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="border-warning/50 text-warning">
                Medium Priority
              </Badge>
            </div>
          </div>

          <div className="p-4 bg-muted/20 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Meeting sentiment analysis
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last meeting showed slightly elevated stress levels
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-muted-foreground">
                Monitor
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SynchronousTab;
