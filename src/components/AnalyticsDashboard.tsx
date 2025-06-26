
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Clock, Target, Brain, Zap } from 'lucide-react';

interface AnalyticsDashboardProps {
  focusTime?: number;
  focusScore?: number;
}

export const AnalyticsDashboard = ({ focusTime = 0, focusScore = 0 }: AnalyticsDashboardProps) => {
  // Generate realistic starting data
  const weeklyData = focusTime > 0 ? [
    { day: 'Mon', focus: 0, distractions: 0 },
    { day: 'Tue', focus: 0, distractions: 0 },
    { day: 'Wed', focus: 0, distractions: 0 },
    { day: 'Thu', focus: 0, distractions: 0 },
    { day: 'Fri', focus: 0, distractions: 0 },
    { day: 'Sat', focus: 0, distractions: 0 },
    { day: 'Today', focus: focusTime / 60, distractions: 0 },
  ] : [
    { day: 'Mon', focus: 0, distractions: 0 },
    { day: 'Tue', focus: 0, distractions: 0 },
    { day: 'Wed', focus: 0, distractions: 0 },
    { day: 'Thu', focus: 0, distractions: 0 },
    { day: 'Fri', focus: 0, distractions: 0 },
    { day: 'Sat', focus: 0, distractions: 0 },
    { day: 'Sun', focus: 0, distractions: 0 },
  ];

  const productivityData = focusTime > 0 ? [
    { name: 'Deep Work', value: 60, color: '#3B82F6' },
    { name: 'Planning', value: 20, color: '#10B981' },
    { name: 'Breaks', value: 15, color: '#F59E0B' },
    { name: 'Distractions', value: 5, color: '#EF4444' },
  ] : [
    { name: 'Getting Started', value: 100, color: '#94A3B8' },
  ];

  const monthlyTrends = [
    { week: 'Week 1', focusScore: 0, productivity: 0 },
    { week: 'Week 2', focusScore: 0, productivity: 0 },
    { week: 'Week 3', focusScore: 0, productivity: 0 },
    { week: 'This Week', focusScore: focusScore, productivity: focusScore > 0 ? focusScore - 5 : 0 },
  ];

  const weeklyFocusHours = Math.round((focusTime / 60) * 10) / 10;
  const streak = focusTime > 0 ? 1 : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Focus</p>
                <p className="text-2xl font-bold">{weeklyFocusHours}h</p>
                <Badge variant="secondary" className="text-blue-700 bg-blue-100 mt-1">
                  {focusTime > 0 ? 'Great start!' : 'Ready to begin'}
                </Badge>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Focus Score</p>
                <p className="text-2xl font-bold">{focusScore}%</p>
                <Badge variant="secondary" className="text-purple-700 bg-purple-100 mt-1">
                  {focusScore === 0 ? 'Start tracking' : 'Building momentum'}
                </Badge>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Productivity</p>
                <p className="text-2xl font-bold">{focusScore}%</p>
                <Badge variant="secondary" className="text-green-700 bg-green-100 mt-1">
                  {focusTime > 0 ? 'On track' : 'Start your journey'}
                </Badge>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak</p>
                <p className="text-2xl font-bold">{streak} {streak === 1 ? 'day' : 'days'}</p>
                <Badge variant="secondary" className="text-orange-700 bg-orange-100 mt-1">
                  {streak === 0 ? 'Begin today!' : 'Keep it up!'}
                </Badge>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Focus vs Distractions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Weekly Focus Progress</span>
            </CardTitle>
            <CardDescription>
              {focusTime > 0 ? 'Your focus journey this week' : 'Complete your first session to see data'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="focus" fill="#3B82F6" name="Focus Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Time Distribution</span>
            </CardTitle>
            <CardDescription>
              {focusTime > 0 ? 'How you spend your focused time' : 'Start tracking to see your patterns'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {productivityData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Trends</CardTitle>
          <CardDescription>
            {focusTime > 0 ? 'Your improvement over time' : 'Your progress will appear here as you use FocusFlow'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="focusScore" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Focus Score"
              />
              <Line 
                type="monotone" 
                dataKey="productivity" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Productivity"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Getting Started Guide */}
      {focusTime === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>
              Welcome to FocusFlow! Here's how to begin your productivity journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">1. Start Your First Focus Session</h4>
              <p className="text-sm text-blue-700">
                Go to the Focus Session tab and click "Start" to begin a 25-minute deep work session.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">2. Track Your Progress</h4>
              <p className="text-sm text-green-700">
                Complete sessions to build your streak, level up, and see detailed analytics.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">3. Join the Community</h4>
              <p className="text-sm text-purple-700">
                Connect with others in the Social Hub to stay motivated and compete on leaderboards.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
