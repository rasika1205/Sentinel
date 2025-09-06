import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Shield, BarChart3, Users, MessageSquare, Bot, Zap, Target, Award } from 'lucide-react';

const AboutTab = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Performance Dashboard",
      description: "Real-time psychological safety scoring with comprehensive analytics and trend visualization."
    },
    {
      icon: Users,
      title: "Synchronous Monitoring", 
      description: "Live team pulse tracking based on daily interactions and communication patterns."
    },
    {
      icon: MessageSquare,
      title: "Vertex News Feed",
      description: "Curated business and HR industry insights to keep you informed of latest trends."
    },
    {
      icon: Zap,
      title: "AI Suggestions",
      description: "Machine learning-powered recommendations for improving team dynamics and safety."
    },
    {
      icon: Bot,
      title: "Intelligent Chatbot",
      description: "24/7 support for HR queries and guidance on implementing safety improvements."
    }
  ];

  const stats = [
    { label: "Teams Monitored", value: "10,000+", icon: Users },
    { label: "Safety Score Accuracy", value: "94.2%", icon: Target },
    { label: "Improvement Rate", value: "87%", icon: Award },
    { label: "Response Time", value: "<2s", icon: Zap }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-4 bg-gradient-primary rounded-2xl">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold text-foreground">Sentinel</h1>
            <p className="text-lg text-muted-foreground">HR Performance Analytics Platform</p>
          </div>
        </div>
        
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Sentinel is an advanced HR analytics platform designed to help managers track, understand, and improve team psychological safety through data-driven insights and AI-powered recommendations.
        </p>
      </div>

      {/* Purpose Section */}
      <Card className="card-professional p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Purpose</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              In today's dynamic workplace, psychological safety is the foundation of high-performing teams. 
              Sentinel empowers HR managers with the tools and insights needed to create environments where 
              team members feel safe to speak up, take risks, and contribute their best work.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By analyzing communication patterns, team interactions, and engagement metrics, Sentinel provides 
              actionable intelligence that transforms how organizations approach team wellness and performance.
            </p>
          </div>
        </div>
      </Card>

      {/* Platform Statistics */}
      <Card className="card-professional p-6">
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">Platform Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-2">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Features Overview */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground text-center">Platform Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-professional p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="card-professional p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Technology & Security</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">AI & Analytics</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Machine Learning</Badge>
              <Badge variant="secondary">Natural Language Processing</Badge>
              <Badge variant="secondary">Sentiment Analysis</Badge>
              <Badge variant="secondary">Predictive Analytics</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Security & Compliance</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">GDPR Compliant</Badge>
              <Badge variant="secondary">SOC 2 Type II</Badge>
              <Badge variant="secondary">End-to-End Encryption</Badge>
              <Badge variant="secondary">ISO 27001</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact & Support */}
      <Card className="card-professional p-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-foreground">Get Started</h3>
          <p className="text-muted-foreground">
            Ready to transform your team's psychological safety? Our platform is designed to be intuitive 
            and powerful, helping you make data-driven decisions that improve team performance.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <span>📧 support@sentinel-hr.com</span>
            <span>📞 1-800-SENTINEL</span>
            <span>🌐 www.sentinel-hr.com</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutTab;