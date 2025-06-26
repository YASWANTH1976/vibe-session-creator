
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Users, MessageCircle, Heart } from 'lucide-react';

export const SocialLeaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
  
  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', focusTime: 6.5, streak: 12, avatar: '/placeholder.svg', level: 15 },
    { rank: 2, name: 'Sarah Johnson', focusTime: 6.2, streak: 8, avatar: '/placeholder.svg', level: 13 },
    { rank: 3, name: 'Mike Rodriguez', focusTime: 5.8, streak: 15, avatar: '/placeholder.svg', level: 14 },
    { rank: 4, name: 'Emma Wilson', focusTime: 5.5, streak: 6, avatar: '/placeholder.svg', level: 12 },
    { rank: 5, name: 'You', focusTime: 5.2, streak: 7, avatar: '/placeholder.svg', level: 12, isCurrentUser: true },
  ];

  const challenges = [
    { title: 'Focus Marathon', description: '4+ hours deep work today', participants: 23, reward: '+50 XP' },
    { title: 'Distraction Warrior', description: 'Block 20+ distractions', participants: 15, reward: '+30 XP' },
    { title: 'Early Bird', description: 'Start before 8 AM for 5 days', participants: 8, reward: '+75 XP' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

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
            Compete with friends and colleagues for ultimate focus mastery
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
          <div className="space-y-3">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  user.isCurrentUser 
                    ? 'bg-blue-50 border-blue-200 shadow-md' 
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.isCurrentUser && <Badge variant="secondary">You</Badge>}
                    </p>
                    <p className="text-sm text-gray-600">Level {user.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{user.focusTime}h</p>
                  <p className="text-sm text-gray-600">{user.streak} day streak</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Features */}
      <div className="space-y-6">
        {/* Active Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-green-600" />
              <span>Active Challenges</span>
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
                    {challenge.participants} participants
                  </span>
                  <Button size="sm" className="text-xs h-7">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">2,847</div>
              <p className="text-sm text-gray-600">Total Focus Hours Today</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">156</div>
                <p className="text-xs text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">89%</div>
                <p className="text-xs text-gray-600">Avg. Success Rate</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="w-4 h-4 text-red-500" />
                <span>23 people cheered you on today</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span>5 new focus tips shared</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
