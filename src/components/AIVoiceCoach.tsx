
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AIVoiceCoach = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const motivationalMessages = [
    "You've got this! Every moment of focus builds your mental strength.",
    "Deep work is like a superpower in our distracted world. You're developing yours right now.",
    "Remember, the magic happens when you push through the resistance. Keep going!",
    "Your future self will thank you for the focused work you're doing today.",
    "Focus is not about being perfect, it's about being present. You're doing great."
  ];

  const focusSounds = [
    { name: 'Rain', description: 'Gentle rainfall' },
    { name: 'Forest', description: 'Birds and nature' },
    { name: 'Ocean', description: 'Calm waves' },
    { name: 'Cafe', description: 'Coffee shop ambiance' }
  ];

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setIsListening(true);
      mediaRecorder.start();

      toast({
        title: "🎤 Listening...",
        description: "Tell me how you're feeling or what you need help with",
      });

      setTimeout(() => {
        if (mediaRecorderRef.current && isListening) {
          stopListening();
        }
      }, 10000); // Auto-stop after 10 seconds

    } catch (error) {
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice features",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsListening(false);
    
    // Simulate AI processing
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      provideFeedback();
    }, 2000);
  };

  const provideFeedback = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMessage(randomMessage);
    
    // Use browser's speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }

    toast({
      title: "🤖 AI Coach Response",
      description: "Playing personalized motivation message",
    });
  };

  const playQuickMotivation = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMessage(randomMessage);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const playFocusSound = (soundName: string) => {
    toast({
      title: `🎵 Playing ${soundName} sounds`,
      description: "Focus sounds will help you maintain concentration",
    });
    // In a real app, you'd load actual audio files here
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mic className="w-6 h-6 text-purple-600" />
          <span>AI Focus Coach</span>
        </CardTitle>
        <CardDescription>
          Interactive voice coaching powered by AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Interaction */}
        <div className="p-4 bg-white rounded-lg border border-purple-200">
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span>Voice Interaction</span>
          </h4>
          
          <div className="space-y-3">
            {isLoading && (
              <div className="flex items-center space-x-2 text-purple-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI is processing your voice...</span>
              </div>
            )}
            
            {currentMessage && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-sm text-purple-800">{currentMessage}</p>
              </div>
            )}
            
            <div className="flex space-x-2">
              {!isListening ? (
                <Button onClick={startListening} className="bg-purple-600 hover:bg-purple-700 flex-1">
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice Chat
                </Button>
              ) : (
                <Button onClick={stopListening} variant="destructive" className="flex-1">
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop Listening
                </Button>
              )}
              
              {isPlaying ? (
                <Button onClick={stopAudio} variant="outline">
                  <VolumeX className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={playQuickMotivation} variant="outline">
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Focus Sounds */}
        <div className="p-4 bg-white rounded-lg border border-blue-200">
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-blue-600" />
            <span>Focus Sounds</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            {focusSounds.map((sound) => (
              <Button
                key={sound.name}
                onClick={() => playFocusSound(sound.name)}
                variant="outline"
                className="h-auto py-2 text-left"
              >
                <div>
                  <div className="text-sm font-medium">{sound.name}</div>
                  <div className="text-xs text-gray-500">{sound.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            <Badge variant="secondary">Voice Sessions: 0</Badge>
          </div>
          <div className="text-gray-600">
            <Badge variant="outline">AI Responses: 0</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
