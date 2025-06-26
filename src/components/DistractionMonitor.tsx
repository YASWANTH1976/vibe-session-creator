
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, Eye, Clock, Smartphone, Monitor } from 'lucide-react';

export const DistractionMonitor = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [distractions, setDistractions] = useState([
    { site: 'social-media.com', visits: 12, timeSpent: 23, blocked: 8 },
    { site: 'news-site.com', visits: 5, timeSpent: 15, blocked: 3 },
    { site: 'video-platform.com', visits: 8, timeSpent: 31, blocked: 5 },
    { site: 'shopping-site.com', visits: 3, timeSpent: 12, blocked: 2 },
  ]);

  const totalDistractions = distractions.reduce((sum, d) => sum + d.visits, 0);
  const totalBlocked = distractions.reduce((sum, d) => sum + d.blocked, 0);
  const blockRate = totalDistractions > 0 ? (totalBlocked / totalDistractions) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monitor Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>Distraction Shield</span>
          </CardTitle>
          <CardDescription>
            Real-time protection against digital distractions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
              isMonitoring ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <Shield className="w-12 h-12" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {isMonitoring ? 'Protected' : 'Inactive'}
              </p>
              <p className="text-sm text-gray-600">
                {isMonitoring ? 'Blocking distracting websites' : 'Click to activate protection'}
              </p>
            </div>
            <Button 
              onClick={() => setIsMonitoring(!isMonitoring)}
              size="lg"
              variant={isMonitoring ? 'destructive' : 'default'}
              className="w-full"
            >
              {isMonitoring ? 'Deactivate Shield' : 'Activate Shield'}
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Block Success Rate</span>
              <Badge variant="secondary">{Math.round(blockRate)}%</Badge>
            </div>
            <Progress value={blockRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Distractions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-orange-600" />
            <span>Today's Distractions</span>
          </CardTitle>
          <CardDescription>
            Websites that tried to steal your focus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distractions.map((distraction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-sm">{distraction.site}</p>
                    <p className="text-xs text-gray-600">
                      {distraction.visits} attempts • {distraction.timeSpent}min potential loss
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={distraction.blocked > 0 ? 'destructive' : 'secondary'}>
                    {distraction.blocked} blocked
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distraction Patterns */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-purple-600" />
            <span>Distraction Patterns</span>
          </CardTitle>
          <CardDescription>
            Understanding when you're most vulnerable to distractions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-red-600">2:30 PM</div>
              <p className="text-sm text-gray-600">Peak Distraction Time</p>
              <Badge variant="destructive">High Risk</Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">9:00 AM</div>
              <p className="text-sm text-gray-600">Best Focus Window</p>
              <Badge variant="secondary">Optimal</Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">23 min</div>
              <p className="text-sm text-gray-600">Avg. Focus Duration</p>
              <Badge variant="outline">Improving</Badge>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Smart Recommendation</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your focus drops significantly after lunch. Consider scheduling easier tasks 
                  between 2-3 PM and save deep work for morning hours.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
