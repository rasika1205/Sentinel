import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Calendar, TrendingUp, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

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

const PerformanceChart = ({ teamId, className }) => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch weekly data from backend
  useEffect(() => {
    if (timeFilter === "week") {
      const fetchWeekly = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://localhost:8000/api/team/performance/weekly`
          );
          setWeeklyData(res.data);
        } catch (err) {
          console.error("Error fetching weekly data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchWeekly();
    }
  }, [timeFilter, teamId]);

  // Hardcoded monthly + yearly
  const monthlyData = [
    { name: "Week 1", score: 68, participation: 82, engagement: 75 },
    { name: "Week 2", score: 72, participation: 85, engagement: 78 },
    { name: "Week 3", score: 75, participation: 88, engagement: 82 },
    { name: "Week 4", score: 78, participation: 87, engagement: 85 },
  ];

  const yearlyData = [
    { name: "Jan", score: 65, participation: 80, engagement: 72 },
    { name: "Feb", score: 68, participation: 82, engagement: 75 },
    { name: "Mar", score: 70, participation: 85, engagement: 77 },
    { name: "Apr", score: 72, participation: 83, engagement: 78 },
    { name: "May", score: 75, participation: 88, engagement: 82 },
    { name: "Jun", score: 78, participation: 87, engagement: 85 },
    { name: "Jul", score: 76, participation: 89, engagement: 83 },
    { name: "Aug", score: 79, participation: 91, engagement: 86 },
    { name: "Sep", score: 81, participation: 88, engagement: 88 },
    { name: "Oct", score: 78, participation: 85, engagement: 85 },
    { name: "Nov", score: 80, participation: 90, engagement: 87 },
    { name: "Dec", score: 82, participation: 92, engagement: 90 },
  ];

  const getChartData = () => {
    switch (timeFilter) {
      case "week":
        return weeklyData;
      case "month":
        return monthlyData;
      case "year":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const data = getChartData();
  const averageScore =
    data.length > 0
      ? Math.round(data.reduce((acc, item) => acc + item.score, 0) / data.length)
      : 0;

  return (
    <Card className={cn("card-professional p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Performance Trends
            </h3>
            <p className="text-sm text-muted-foreground">
              Psychological safety over time
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
            {["week", "month", "year"].map((filter) => (
              <Button
                key={filter}
                variant={timeFilter === filter ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter(filter)}
                className={cn(
                  "capitalize text-xs px-3 py-1",
                  timeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Chart */}
        <div className="h-64">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} className="text-xs" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#scoreGradient)"
                  name="Safety Score"
                />
                <Line
                  type="monotone"
                  dataKey="participation"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 3 }}
                  name="Participation %"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Chart Summary */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">{averageScore}</div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">+12%</div>
            <div className="text-xs text-muted-foreground">Growth</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{data.length}</div>
            <div className="text-xs text-muted-foreground">Data Points</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceChart;
