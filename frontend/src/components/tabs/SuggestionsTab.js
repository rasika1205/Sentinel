import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Lightbulb, Target, Users, MessageSquare, Award, Calendar, Zap, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const iconMap = { MessageSquare, Award, Users, Lightbulb, Target, Calendar };

const SuggestionsTab = ({ teamId }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/performance/suggestions`);
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [teamId]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Communication': 'bg-blue-50 text-blue-700',
      'Recognition': 'bg-green-50 text-green-700',  
      'Team Development': 'bg-purple-50 text-purple-700',
      'Learning Culture': 'bg-orange-50 text-orange-700',
      'Goal Setting': 'bg-teal-50 text-teal-700',
      'Work-Life Balance': 'bg-pink-50 text-pink-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };

  const highPriority = suggestions.filter(s => s.priority === 'high');
  const otherSuggestions = suggestions.filter(s => s.priority !== 'high');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI-Powered Suggestions</h2>
          <p className="text-muted-foreground">Personalized recommendations to improve team psychological safety</p>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">{suggestions.length} suggestions</span>
        </div>
      </div>

      {/* High Priority Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Priority Actions</h3>
          <Badge variant="destructive" className="bg-destructive/10 text-destructive">
            High Impact
          </Badge>
        </div>
        
        <div className="grid gap-4">
          {highPriority.map((suggestion) => {
            const Icon = iconMap[suggestion.icon] || Lightbulb;
            
            return (
              <Card key={suggestion.id} className="card-professional p-6 border-l-4 border-l-destructive">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-destructive/10 rounded-xl">
                        <Icon className={cn("h-5 w-5", suggestion.color)} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{suggestion.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className={getCategoryColor(suggestion.category)}>
                            {suggestion.category}
                          </Badge>
                          <Badge variant="destructive" className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
                      Implement
                    </Button>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed pl-14">
                    {suggestion.description}
                  </p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-4 pl-14">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-success" />
                      <span className="text-sm text-foreground">{suggestion.impact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{suggestion.timeToImplement}</span>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="pl-14 space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Action Steps:</h5>
                    <div className="grid grid-cols-2 gap-1">
                      {suggestion.actionItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Other Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Additional Recommendations</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {otherSuggestions.map((suggestion) => {
            const Icon = iconMap[suggestion.icon] || Lightbulb;
            
            return (
              <Card key={suggestion.id} className="card-professional p-4 hover:shadow-hover transition-all duration-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-muted/20 rounded-lg">
                        <Icon className={cn("h-4 w-4", suggestion.color)} />
                      </div>
                      <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                    </div>
                    <Badge variant="secondary" className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {suggestion.description}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-success">{suggestion.impact}</span>
                    <span className="text-muted-foreground">{suggestion.timeToImplement}</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsTab;
