export const playEnglishAudio = (text: string, rate: number = 0.88): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this environment.');
      resolve(false);
      return;
    }

    try {
      // Cancel previous utterances to avoid queuing delay
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      // Select an English voice if available
      const assignVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const englishVoice = voices.find(
            (v) =>
              (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
              (v.name.includes('Natural') ||
                v.name.includes('Google') ||
                v.name.includes('Samantha') ||
                v.name.includes('Daniel') ||
                v.name.includes('English'))
          ) || voices.find((v) => v.lang.startsWith('en'));

          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }
      };

      assignVoice();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = assignVoice;
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = (e) => {
        console.warn('Speech error or cancelled:', e);
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Audio playback error:', err);
      resolve(false);
    }
  });
};
