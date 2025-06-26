
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Clock, Target, Brain, Zap } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const weeklyData = [
    { day: 'Mon', focus: 4.5, distractions: 12 },
    { day: 'Tue', focus: 6.2, distractions: 8 },
    { day: 'Wed', focus: 5.8, distractions: 15 },
    { day: 'Thu', focus: 7.1, distractions: 6 },
    { day: 'Fri', focus: 5.2, distractions: 18 },
    { day: 'Sat', focus: 3.8, distractions: 22 },
    { day: 'Sun', focus: 4.1, distractions: 14 },
  ];

  const productivityData = [
    { name: 'Deep Work', value: 45, color: '#3B82F6' },
    { name: 'Communication', value: 25, color: '#10B981' },
    { name: 'Breaks', value: 15, color: '#F59E0B' },
    { name: 'Distractions', value: 15, color: '#EF4444' },
  ];

  const monthlyTrends = [
    { week: 'Week 1', focusScore: 72, productivity: 68 },
    { week: 'Week 2', focusScore: 78, productivity: 75 },
    { week: 'Week 3', focusScore: 85, productivity: 82 },
    { week: 'Week 4', focusScore: 87, productivity: 89 },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Focus</p>
                <p className="text-2xl font-bold">36.7h</p>
                <Badge variant="secondary" className="text-green-700 bg-green-100 mt-1">
                  +12% vs last week
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
                <p className="text-2xl font-bold">87%</p>
                <Badge variant="secondary" className="text-green-700 bg-green-100 mt-1">
                  Excellent
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
                <p className="text-2xl font-bold">89%</p>
                <Badge variant="secondary" className="text-green-700 bg-green-100 mt-1">
                  +5% this month
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
                <p className="text-2xl font-bold">7 days</p>
                <Badge variant="secondary" className="text-orange-700 bg-orange-100 mt-1">
                  Personal best!
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
              <span>Weekly Focus vs Distractions</span>
            </CardTitle>
            <CardDescription>
              Daily focus hours and distraction events
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
                <Bar dataKey="distractions" fill="#EF4444" name="Distractions" />
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
              How you spend your work hours
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
          <CardTitle>Monthly Progress Trends</CardTitle>
          <CardDescription>
            Your focus and productivity scores over the past month
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

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
          <CardDescription>
            AI-powered recommendations based on your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🎯 Optimal Focus Window</h4>
            <p className="text-sm text-blue-700">
              Your best focus occurs between 9:00-11:30 AM. Schedule your most important work during this window for maximum productivity.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">🚀 Improvement Opportunity</h4>
            <p className="text-sm text-green-700">
              You're 23% more productive on days when you complete a morning focus session. Try starting each day with a 25-minute deep work block.
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">⚠️ Distraction Pattern</h4>
            <p className="text-sm text-orange-700">
              Social media distractions peak at 2:30 PM. Consider scheduling a break at 2:15 PM to proactively manage this pattern.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
