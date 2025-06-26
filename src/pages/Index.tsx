
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timer, Brain, Users, TrendingUp, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { FocusTimer } from '@/components/FocusTimer';
import { DistractionMonitor } from '@/components/DistractionMonitor';
import { SocialLeaderboard } from '@/components/SocialLeaderboard';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { PremiumFeatures } from '@/components/PremiumFeatures';
import { AIVoiceCoach } from '@/components/AIVoiceCoach';

const Index = () => {
  const [activeTab, setActiveTab] = useState('focus');
  const [focusStreak, setFocusStreak] = useState(0); // Start from 0
  const [todayFocusTime, setTodayFocusTime] = useState(0); // Start from 0 minutes
  const [weeklyGoal] = useState(300); // 5 hours per week - realistic starting goal
  const [currentLevel, setCurrentLevel] = useState(1); // Start from level 1
  const [focusScore, setFocusScore] = useState(0); // Start from 0%

  // Function to update today's focus time (called from FocusTimer)
  const updateFocusTime = (minutes) => {
    setTodayFocusTime(prev => prev + minutes);
    // Update focus score based on time spent
    const newScore = Math.min(100, Math.round((todayFocusTime + minutes) / (weeklyGoal / 7) * 100));
    setFocusScore(newScore);
    
    // Level up logic
    const newLevel = Math.floor((todayFocusTime + minutes) / 60) + 1;
    setCurrentLevel(newLevel);
  };

  const weeklyProgress = Math.round((todayFocusTime * 7) / weeklyGoal * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FocusFlow
                </h1>
                <p className="text-sm text-gray-600">Deep work, amplified</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-green-700 bg-green-100">
                {focusStreak === 0 ? 'Start your streak!' : `${focusStreak} day streak 🔥`}
              </Badge>
              <Badge variant="outline" className="text-blue-700">
                Level {currentLevel}
              </Badge>
              <Button variant="outline">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Today's Focus</p>
                  <p className="text-3xl font-bold">
                    {todayFocusTime === 0 ? '0m' : `${Math.floor(todayFocusTime / 60)}h ${todayFocusTime % 60}m`}
                  </p>
                </div>
                <Timer className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Focus Score</p>
                  <p className="text-3xl font-bold">{focusScore}%</p>
                </div>
                <Brain className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Rank</p>
                  <p className="text-3xl font-bold">--</p>
                  <p className="text-green-100 text-xs">Complete first session</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Weekly Goal</p>
                  <p className="text-3xl font-bold">{weeklyProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="focus">Focus Session</TabsTrigger>
            <TabsTrigger value="voice">AI Coach</TabsTrigger>
            <TabsTrigger value="monitor">Monitor</TabsTrigger>
            <TabsTrigger value="social">Social Hub</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="focus" className="space-y-6">
            <FocusTimer onSessionComplete={updateFocusTime} />
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <AIVoiceCoach />
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <DistractionMonitor />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <SocialLeaderboard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard focusTime={todayFocusTime} focusScore={focusScore} />
          </TabsContent>

          <TabsContent value="premium" className="space-y-6">
            <PremiumFeatures />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
