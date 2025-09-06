import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, MessageSquare, Heart, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';

const TeamSummary = ({ teamId, className }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/performance/summary`);
        const data = await res.json();
        setSummaryData(data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [teamId]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading team summary...</p>;
  if (!summaryData) return <p className="text-sm text-destructive">Failed to load summary</p>;

  const { title, description, highlights, sentiment, action_item } = summaryData;

  const iconMap = {
    excellent: Heart,
    good: Users,
    "needs-attention": Brain
  };
  const colorMap = {
    excellent: "text-success",
    good: "text-warning",
    "needs-attention": "text-destructive"
  };

  const SummaryIcon = iconMap[sentiment] || Users;

  return (
    <Card className={cn("card-professional p-6", className)}>
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-card rounded-xl shadow-sm">
          <SummaryIcon className={cn("h-6 w-6", colorMap[sentiment])} />
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <Badge 
              variant={sentiment === 'excellent' ? 'default' : 
                      sentiment === 'good' ? 'secondary' : 'destructive'}
              className={cn(
                sentiment === 'excellent' && "bg-success/10 text-success",
                sentiment === 'good' && "bg-warning/10 text-warning",
                sentiment === 'needs-attention' && "bg-destructive/10 text-destructive"
              )}
            >
              {sentiment === 'excellent' && "Excellent"}
              {sentiment === 'good' && "Good"}
              {sentiment === 'needs-attention' && "Needs Attention"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Key Indicators:</h4>
            <div className="grid grid-cols-2 gap-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    sentiment === 'excellent' && "bg-success",
                    sentiment === 'good' && "bg-warning",
                    sentiment === 'needs-attention' && "bg-destructive"
                  )} />
                  <span className="text-xs text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="pt-3 border-t">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">{action_item}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamSummary;
