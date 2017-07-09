import { Injectable, OnInit } from '@angular/core';

declare var VoiceRSS: any;

@Injectable()
export class PronounceService {

    pronounce(word: string, language: string): void {
        VoiceRSS.speech({
            key: '15570a3a9db4423897a02a4296eb8431',
            src: word,
            hl: language,
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
    }
}

/*
    I was trying to use tts-speak lib("tts-speak": "1.1.1") but required 
    fsevents lib which is not compatible with windows.

    import { Speak } from 'tts-speak';

    ngOnInit(): void {
        this.speak = new Speak({
            tts: {  
                engine: {                       // The engine to use for tts
                    name: 'voicerss',           
                    key: '84afb111b14d4b08b4147120b4e9b62d',     // The API key to use
                },
                lang: 'en-us',                  // The voice to use
                speed: 60,                      // Speed in %
                format: 'mp3',                  // Output audio format
                quality: '44khz_16bit_stereo',  // Output quality
                //cache: __dirname + '/cache',    // The cache directory were audio files will be stored
                loglevel: 0,                    // TTS log level (0: trace -> 5: fatal)
                delayAfter: 0                   // Mark a delay (ms) after each message
            },
            speak: {
                volume: 80,                     // Audio player volume
                loglevel: 0                     // Audio player log level
            },
            loglevel: 0                         // Wrapper log level
        });
    }
*/