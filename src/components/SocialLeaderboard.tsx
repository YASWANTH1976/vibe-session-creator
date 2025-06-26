
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Users, MessageCircle, Heart, Mic, Volume2, Play } from 'lucide-react';

export const SocialLeaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
  
  // Empty state for new users
  const leaderboardEmpty = true;

  const challenges = [
    { title: 'First Focus', description: 'Complete your first 25-minute session', participants: 'Join to start', reward: '+50 XP' },
    { title: 'Morning Warrior', description: 'Start a session before 9 AM', participants: 'Join to start', reward: '+30 XP' },
    { title: 'Consistency Builder', description: 'Focus for 3 days in a row', participants: 'Join to start', reward: '+100 XP' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Leaderboard */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <span>Focus Leaderboard</span>
          </CardTitle>
          <CardDescription>
            Complete your first focus session to join the leaderboard
          </CardDescription>
          <div className="flex space-x-2">
            {(['today', 'week', 'month'] as const).map((period) => (
              <Button
                key={period}
                size="sm"
                variant={selectedPeriod === period ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {leaderboardEmpty ? (
            <div className="text-center py-12 space-y-4">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-600">Start Your Focus Journey</h3>
              <p className="text-gray-500">Complete focus sessions to appear on the leaderboard and compete with others</p>
              <Button className="mt-4">Start First Session</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* This will show actual data once users complete sessions */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Features */}
      <div className="space-y-6">
        {/* AI Voice Coach */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-6 h-6 text-purple-600" />
              <span>AI Focus Coach</span>
            </CardTitle>
            <CardDescription>
              Get personalized voice coaching and motivation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center space-x-2 h-auto py-3">
                <Play className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">Quick Pep Talk</div>
                  <div className="text-xs text-gray-500">2 min motivation</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 h-auto py-3">
                <Volume2 className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">Focus Sounds</div>
                  <div className="text-xs text-gray-500">Ambient audio</div>
                </div>
              </Button>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Mic className="w-4 h-4 mr-2" />
              Start Voice Session
            </Button>
          </CardContent>
        </Card>

        {/* Challenges - Updated for beginners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-green-600" />
              <span>Starter Challenges</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{challenge.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {challenge.reward}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {challenge.participants}
                  </span>
                  <Button size="sm" className="text-xs h-7">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community Stats - Realistic for new app */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <p className="text-sm text-gray-600">Your Focus Hours</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">1</div>
                <p className="text-xs text-gray-600">Active User (You!)</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">0%</div>
                <p className="text-xs text-gray-600">Sessions Complete</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Welcome to FocusFlow!</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span>Start your first session to unlock features</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
