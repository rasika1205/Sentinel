import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Newspaper, ExternalLink, Clock, TrendingUp, Building2, Users2, Briefcase, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

// NewsItem type removed for JS compatibility

const VertexTab = () => {
  const newsItems = [
    {
      id: 1,
      title: "Microsoft Announces Major Acquisition of AI Startup for $2.1B",
      summary: "Microsoft's acquisition of DeepTech AI focuses on enhancing workplace collaboration tools and employee engagement platforms, signaling continued investment in HR technology.",
      category: "Acquisitions",
      source: "TechCrunch",
      publishedAt: "2 hours ago",
      readTime: "3 min read",
      relevance: "high",
      tags: ["Technology", "M&A", "AI"]
    },
    {
      id: 2,
      title: "New Labor Law Updates: Remote Work Rights Expanded Globally",
      summary: "Recent legislation in 15 countries now mandates employers to provide comprehensive remote work policies, affecting millions of workers and HR departments worldwide.",
      category: "Legal & Compliance",
      source: "HR Executive",
      publishedAt: "4 hours ago", 
      readTime: "5 min read",
      relevance: "high",
      tags: ["Legal", "Remote Work", "Policy"]
    },
    {
      id: 3,
      title: "Tech Sector Layoffs Continue: 50,000 Jobs Cut This Quarter",
      summary: "Major tech companies including Meta, Amazon, and Google announce significant workforce reductions, impacting talent acquisition strategies across the industry.",
      category: "Industry News",
      source: "Bloomberg",
      publishedAt: "6 hours ago",
      readTime: "4 min read", 
      relevance: "high",
      tags: ["Layoffs", "Tech", "Workforce"]
    },
    {
      id: 4,
      title: "AI-Powered Performance Reviews Show 40% Improvement in Employee Satisfaction",
      summary: "Companies implementing AI-driven performance management systems report higher employee engagement and more objective feedback processes.",
      category: "HR Technology",
      source: "People Management",
      publishedAt: "8 hours ago",
      readTime: "6 min read",
      relevance: "high",
      tags: ["AI", "Performance", "HR Tech"]
    },
    {
      id: 5,
      title: "Fortune 500 Study: Employee Engagement Strategies That Actually Work",
      summary: "Comprehensive analysis of 500 companies reveals the most effective approaches to boosting employee engagement, with psychological safety ranking as the top factor.",
      category: "Research",
      source: "Harvard Business Review",
      publishedAt: "12 hours ago",
      readTime: "8 min read",
      relevance: "high",
      tags: ["Engagement", "Research", "Best Practices"]
    },
    {
      id: 6,
      title: "Hybrid Work Models: The New Standard for 2024",
      summary: "Survey of 10,000 companies shows 78% plan to maintain hybrid work arrangements, requiring new approaches to team management and culture building.",
      category: "Workplace Trends",
      source: "McKinsey & Company",
      publishedAt: "1 day ago",
      readTime: "7 min read",
      relevance: "medium",
      tags: ["Hybrid Work", "Trends", "Culture"]
    },
    {
      id: 7,
      title: "Mental Health Support: $2.8B Investment Across Corporate America",
      summary: "Companies double their investment in employee mental health programs, driven by data showing positive ROI on psychological well-being initiatives.",
      category: "Wellness",
      source: "Wall Street Journal",
      publishedAt: "1 day ago",
      readTime: "5 min read",
      relevance: "medium",
      tags: ["Mental Health", "Investment", "Wellness"]
    },
    {
      id: 8,
      title: "Skills Gap Analysis: Critical Shortage in Digital Competencies",
      summary: "Global talent shortage in digital skills reaches critical levels, with HR departments scrambling to implement upskilling and reskilling programs.",
      category: "Skills & Training",
      source: "World Economic Forum",
      publishedAt: "2 days ago",
      readTime: "6 min read",
      relevance: "medium",
      tags: ["Skills Gap", "Training", "Digital"]
    },
    {
      id: 9,
      title: "Diversity & Inclusion Metrics: New Benchmarking Standards Released",
      summary: "Industry coalition releases comprehensive D&I measurement framework, providing HR leaders with standardized metrics for tracking progress.",
      category: "Diversity & Inclusion",
      source: "SHRM",
      publishedAt: "2 days ago",
      readTime: "4 min read",
      relevance: "medium",
      tags: ["D&I", "Metrics", "Standards"]
    },
    {
      id: 10,
      title: "Generation Z Workplace Preferences Reshape HR Policies",
      summary: "New research reveals how Gen Z's expectations around work-life balance, career development, and company values are driving policy changes across industries.",
      category: "Generational Trends",
      source: "Deloitte",
      publishedAt: "3 days ago",
      readTime: "7 min read",
      relevance: "low",
      tags: ["Gen Z", "Workplace", "Trends"]
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Acquisitions': return Building2;
      case 'Legal & Compliance': return Briefcase;
      case 'Industry News': return Globe;
      case 'HR Technology': return TrendingUp;
      case 'Research': return Users2;
      default: return Newspaper;
    }
  };
  
  const getRelevanceBadge = (relevance) => {
    switch (relevance) {
      case 'high': return { variant: 'default', color: 'bg-destructive/10 text-destructive' };
      case 'medium': return { variant: 'secondary', color: 'bg-warning/10 text-warning' };
      case 'low': return { variant: 'outline', color: 'bg-muted/10 text-muted-foreground' };
      default: return { variant: 'outline', color: 'bg-muted/10 text-muted-foreground' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-bold">Vertex News</h2>
        <Button variant="ghost" size="sm" className="flex items-center">
          <Newspaper className="h-4 w-4 mr-2" />
          Customize Feed
        </Button>
      </div>

      {/* News Grid */}
      <div className="grid gap-6">
        {newsItems.map((item) => {
          const CategoryIcon = getCategoryIcon(item.category);
          const relevanceBadge = getRelevanceBadge(item.relevance);
          
          return (
            <Card key={item.id} className="card-professional p-6 hover:shadow-hover transition-all duration-200">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CategoryIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <Badge variant="secondary" className="w-fit text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">{item.source}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{item.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={relevanceBadge.variant}
                    className={cn("text-xs", relevanceBadge.color)}
                  >
                    {item.relevance} priority
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.readTime}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs bg-muted/20 border-muted text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    <span className="text-xs">Read More</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg" className="w-48">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default VertexTab;