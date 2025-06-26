
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Crown, Zap, Brain, Users, BarChart, Shield, Smartphone } from 'lucide-react';

export const PremiumFeatures = () => {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'team'>('pro');

  const freeFeatures = [
    'Basic Pomodoro timer',
    'Simple distraction blocking',
    'Basic analytics',
    'Community leaderboard access',
  ];

  const proFeatures = [
    'AI-powered focus insights',
    'Advanced distraction patterns',
    'Custom session types',
    'Detailed productivity analytics',
    'Priority support',
    'Mobile app access',
    'Calendar integration',
    'Export data & reports',
  ];

  const teamFeatures = [
    'Everything in Pro',
    'Team dashboards',
    'Manager insights',
    'Custom challenges',
    'Team productivity metrics',
    'Slack/Teams integration',
    'Admin controls',
    'Bulk user management',
  ];

  const premiumComponents = [
    { 
      title: 'AI Focus Coach', 
      description: 'Personal AI assistant that learns your patterns and provides tailored recommendations',
      icon: Brain,
      color: 'text-purple-600'
    },
    { 
      title: 'Advanced Blocking', 
      description: 'Smart website blocking with context awareness and productivity scoring',
      icon: Shield,
      color: 'text-blue-600'
    },
    { 
      title: 'Team Collaboration', 
      description: 'Shared workspaces, team challenges, and collaborative focus sessions',
      icon: Users,
      color: 'text-green-600'
    },
    { 
      title: 'Deep Analytics', 
      description: 'Advanced reporting with predictive insights and performance optimization',
      icon: BarChart,
      color: 'text-orange-600'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Premium Components Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {premiumComponents.map((component, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <component.icon className={`w-6 h-6 ${component.color}`} />
                <span>{component.title}</span>
              </CardTitle>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                <Crown className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upgrade to Pro to unlock this feature</p>
                <Button size="sm" className="mt-2">
                  Try Premium Free
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing Plans */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Focus Journey</CardTitle>
          <CardDescription>
            Unlock your full potential with advanced focus management tools
          </CardDescription>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <span className={selectedPlan === 'pro' ? 'font-semibold' : 'text-gray-600'}>Pro</span>
            <Switch 
              checked={selectedPlan === 'team'}
              onCheckedChange={(checked) => setSelectedPlan(checked ? 'team' : 'pro')}
            />
            <span className={selectedPlan === 'team' ? 'font-semibold' : 'text-gray-600'}>Team</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Free</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <p className="text-sm text-gray-600">Perfect for getting started</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className={`border-2 ${selectedPlan === 'pro' ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-lg flex items-center justify-center space-x-2">
                  <span>Pro</span>
                  <Crown className="w-5 h-5 text-yellow-500" />
                </CardTitle>
                <div className="text-3xl font-bold">$9.99</div>
                <p className="text-sm text-gray-600">per month, billed annually</p>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                  Most Popular
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {[...freeFeatures, ...proFeatures].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className={`text-sm ${index >= freeFeatures.length ? 'font-medium' : ''}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  14-day free trial • Cancel anytime
                </p>
              </CardContent>
            </Card>

            {/* Team Plan */}
            <Card className={`border-2 ${selectedPlan === 'team' ? 'border-green-500 shadow-lg scale-105' : ''}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-lg flex items-center justify-center space-x-2">
                  <span>Team</span>
                  <Users className="w-5 h-5 text-green-500" />
                </CardTitle>
                <div className="text-3xl font-bold">$19.99</div>
                <p className="text-sm text-gray-600">per user/month, billed annually</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Best for Teams
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {teamFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                  <Users className="w-4 h-4 mr-2" />
                  Start Team Trial
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  30-day free trial • Minimum 3 users
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your ROI</CardTitle>
          <CardDescription>
            See how much FocusFlow Pro can increase your productivity value
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">+2.5 hours</div>
              <p className="text-sm text-gray-600">Additional focused work per day</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">+$127</div>
              <p className="text-sm text-gray-600">Extra value created daily*</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-600">12.7x</div>
              <p className="text-sm text-gray-600">Return on investment</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            *Based on average knowledge worker hourly rate of $50
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
