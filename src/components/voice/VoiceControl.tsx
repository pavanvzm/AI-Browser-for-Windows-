import React, { useEffect, useCallback } from 'react';
import { useBrowserStore } from '@/store/browserStore';

// Porcupine wake word detection (mock implementation)
// In production, integrate with @picovoice/porcupine-web
class WakeWordDetector {
  private onWakeWord: () => void;
  private isListening = false;

  constructor(onWakeWord: () => void) {
    this.onWakeWord = onWakeWord;
  }

  async start(): Promise<void> {
    // Mock implementation - in production, initialize Porcupine
    console.log('Wake word detector started - listening for "Hey Agent"');
    this.isListening = true;
    
    // Simulate wake word detection for demo purposes
    // In production, this would use actual audio processing
    return Promise.resolve();
  }

  stop(): void {
    this.isListening = false;
  }

  isAvailable(): boolean {
    // Check if browser supports required APIs
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
}

// Speech-to-Text using Web Speech API
class SpeechRecognizer {
  private recognition: any;
  private onResult: (transcript: string) => void;
  private onEnd: () => void;

  constructor(onResult: (transcript: string) => void, onEnd: () => void) {
    this.onResult = onResult;
    this.onEnd = onEnd;

    // @ts-ignore - Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.onResult(transcript);
      };

      this.recognition.onend = () => {
        this.onEnd();
      };
    }
  }

  start(): void {
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Speech recognition already started');
      }
    }
  }

  stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  isAvailable(): boolean {
    // @ts-ignore
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
}

// Text-to-Speech using Web Speech API
class TextToSpeech {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    
    // Load voices
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        const voices = this.synth.getVoices();
        // Prefer a natural-sounding voice
        this.voice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0] || null;
      };
    }
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    this.synth.speak(utterance);
  }

  cancel(): void {
    this.synth.cancel();
  }

  isAvailable(): boolean {
    return 'speechSynthesis' in window;
  }
}

export const VoiceControl: React.FC = () => {
  const { updateVoiceState, addMessage, navigate, updateTask } = useBrowserStore();
  
  const wakeWordDetector = React.useRef<WakeWordDetector | null>(null);
  const speechRecognizer = React.useRef<SpeechRecognizer | null>(null);
  const textToSpeech = React.useRef<TextToSpeech | null>(null);

  const handleVoiceCommand = useCallback((transcript: string) => {
    const lowerTranscript = transcript.toLowerCase();
    
    // Simple command parsing
    if (lowerTranscript.includes('navigate to') || lowerTranscript.includes('go to')) {
      const urlMatch = transcript.match(/(?:navigate|go)\s+(?:to\s+)?(.+)/i);
      if (urlMatch && urlMatch[1]) {
        let url = urlMatch[1].trim();
        if (!url.startsWith('http')) {
          url = `https://${url}`;
        }
        navigate(url);
        updateTask({
          status: 'navigating',
          description: `Navigating to ${url}`,
        });
      }
    } else if (lowerTranscript.includes('search for')) {
      const query = transcript.match(/search\s+(?:for\s+)?(.+)/i)?.[1] || transcript;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      navigate(searchUrl);
      updateTask({
        status: 'searching',
        description: `Searching for "${query}"`,
      });
    } else if (lowerTranscript.includes('click')) {
      updateTask({
        status: 'clicking',
        description: 'Looking for element to click...',
      });
    } else if (lowerTranscript.includes('type') || lowerTranscript.includes('write')) {
      updateTask({
        status: 'typing',
        description: 'Ready to type...',
      });
    } else {
      // Send to AI assistant
      addMessage({
        role: 'user',
        content: transcript,
      });
    }
  }, [navigate, updateTask, addMessage]);

  useEffect(() => {
    // Initialize voice components
    textToSpeech.current = new TextToSpeech();
    
    speechRecognizer.current = new SpeechRecognizer(
      (transcript) => {
        updateVoiceState({ transcript });
        
        // Check for wake word
        if (transcript.toLowerCase().includes('hey agent')) {
          updateVoiceState({ wakeWordDetected: true });
        }
      },
      () => {
        updateVoiceState({ isListening: false });
      }
    );

    wakeWordDetector.current = new WakeWordDetector(() => {
      updateVoiceState({ wakeWordDetected: true, isListening: true });
      speechRecognizer.current?.start();
      
      // Announce activation
      textToSpeech.current?.speak('Yes, how can I help you?');
    });

    // Start wake word detection
    if (wakeWordDetector.current?.isAvailable()) {
      wakeWordDetector.current.start();
    }

    return () => {
      wakeWordDetector.current?.stop();
      speechRecognizer.current?.stop();
      textToSpeech.current?.cancel();
    };
  }, [updateVoiceState]);

  // This component doesn't render anything visible
  // It runs voice detection in the background
  return null;
};
