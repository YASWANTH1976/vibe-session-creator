
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Coffee, Brain, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FocusTimerProps {
  onSessionComplete?: (minutes: number) => void;
}

export const FocusTimer = ({ onSessionComplete }: FocusTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [focusIntensity, setFocusIntensity] = useState(100);
  const { toast } = useToast();

  const totalTime = sessionType === 'focus' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        // Simulate focus intensity fluctuation
        setFocusIntensity(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.3) * 5)));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (sessionType === 'focus') {
        const sessionMinutes = 25;
        setCompletedSessions(prev => prev + 1);
        
        // Call the parent component's function to update stats
        if (onSessionComplete) {
          onSessionComplete(sessionMinutes);
        }
        
        toast({
          title: "🎉 Focus session complete!",
          description: "Great job! You've earned 25 minutes of focus time.",
        });
        setSessionType('break');
        setTimeLeft(5 * 60);
      } else {
        toast({
          title: "☕ Break time over!",
          description: "Ready for another focus session?",
        });
        setSessionType('focus');
        setTimeLeft(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType, toast, onSessionComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    toast({
      title: sessionType === 'focus' ? "🧠 Focus mode activated!" : "☕ Break time started!",
      description: sessionType === 'focus' ? "Deep work session begins now." : "Relax and recharge.",
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    toast({
      title: "⏸️ Session paused",
      description: "Take your time, resume when ready.",
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'focus' ? 25 * 60 : 5 * 60);
    setFocusIntensity(100);
    toast({
      title: "🔄 Session reset",
      description: "Timer reset to beginning.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Timer */}
      <Card className="lg:col-span-2">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {sessionType === 'focus' ? (
              <Brain className="w-6 h-6 text-blue-600" />
            ) : (
              <Coffee className="w-6 h-6 text-green-600" />
            )}
            <span className="capitalize">{sessionType} Session</span>
          </CardTitle>
          <CardDescription>
            {sessionType === 'focus' 
              ? "Deep focus time - eliminate all distractions" 
              : "Recharge break - step away from work"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="relative">
            <div className="text-6xl md:text-8xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-3 mb-6" />
            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <Button onClick={handleStart} size="lg" className="px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" variant="outline" className="px-8">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={handleReset} size="lg" variant="outline">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Stats */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed Sessions</span>
              <Badge variant="secondary">{completedSessions}/4</Badge>
            </div>
            <Progress value={(completedSessions / 4) * 100} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Focus Intensity</span>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">{Math.round(focusIntensity)}%</span>
              </div>
            </div>
            <Progress value={focusIntensity} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg border-2 ${
              sessionType === 'focus' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Focus (25 min)</span>
              </div>
              <Button 
                size="sm" 
                variant={sessionType === 'focus' ? 'default' : 'outline'}
                onClick={() => {
                  setSessionType('focus');
                  setTimeLeft(25 * 60);
                  setIsRunning(false);
                }}
              >
                Select
              </Button>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg border-2 ${
              sessionType === 'break' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <Coffee className="w-5 h-5 text-green-600" />
                <span className="font-medium">Break (5 min)</span>
              </div>
              <Button 
                size="sm" 
                variant={sessionType === 'break' ? 'default' : 'outline'}
                onClick={() => {
                  setSessionType('break');
                  setTimeLeft(5 * 60);
                  setIsRunning(false);
                }}
              >
                Select
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
