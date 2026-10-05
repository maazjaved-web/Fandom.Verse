/* ==========================================================================
   FandomVerse - Voice-Controlled AI Agent Module (voice.js)
   Integrates Web Speech Recognition & SpeechSynthesis with existing UI logic.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check Browser Support for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn('Web Speech API is not supported in this browser. Please use Google Chrome or Edge.');
        return;
    }

    // 2. Initialize Speech Recognition Engine
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Supports English & Roman Urdu voice inputs

    // 3. Find AI Floating Widget / Mic Button
    const aiWidgetBtn = document.querySelector('.ai-widget-btn') || 
                        document.getElementById('ai-btn') || 
                        document.querySelector('.ai-2-btn') ||
                        document.querySelector('[data-ai-trigger]');

    if (!aiWidgetBtn) {
        console.warn('AI Floating Button not found in index.html. Ensure button exists.');
        return;
    }

    let isListening = false;

    // 4. Toggle Voice Listening on Button Click
    aiWidgetBtn.addEventListener('click', (e) => {
        // Prevent default click if necessary
        if (!isListening) {
            try {
                recognition.start();
                isListening = true;
                aiWidgetBtn.classList.add('listening-active');
                speakAI("Multiverse Voice Agent active. Say a command.");
            } catch (err) {
                console.error("Speech Recognition Start Error:", err);
            }
        } else {
            recognition.stop();
            isListening = false;
            aiWidgetBtn.classList.remove('listening-active');
        }
    });

    // 5. Handle Speech Recognition Events
    recognition.onstart = () => {
        console.log("Voice Agent is listening...");
    };

    recognition.onend = () => {
        isListening = false;
        aiWidgetBtn.classList.remove('listening-active');
        console.log("Voice Agent stopped listening.");
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        isListening = false;
        aiWidgetBtn.classList.remove('listening-active');
        if (event.error === 'no-speech') {
            speakAI("No speech was detected. Please try again.");
        }
    };

    // 6. Intent Mapping & Function Execution
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Voice Command Received:", transcript);

        handleVoiceCommand(transcript);
    };

    // 7. Command Execution Logic (Targeting existing functions in script.js)
    function handleVoiceCommand(command) {
        // Multiverse Sector Navigation
        if (command.includes('anime')) {
            executeFunction('openUniverseModal', 'anime', 'Opening Anime Realm');
        } 
        else if (command.includes('gaming') || command.includes('game')) {
            executeFunction('openUniverseModal', 'gaming', 'Opening Gaming Multiverse');
        } 
        else if (command.includes('movie') || command.includes('cinema')) {
            executeFunction('openUniverseModal', 'movies', 'Opening Cinema Vault');
        } 
        else if (command.includes('tv') || command.includes('show')) {
            executeFunction('openUniverseModal', 'tvshows', 'Opening TV Shows Sector');
        } 
        else if (command.includes('kpop') || command.includes('k-pop') || command.includes('music')) {
            executeFunction('openUniverseModal', 'kpop', 'Opening K-Pop Idol Pulse');
        } 
        else if (command.includes('comic')) {
            executeFunction('openUniverseModal', 'comics', 'Opening Comics Multiverse');
        } 
        else if (command.includes('manga')) {
            executeFunction('openUniverseModal', 'manga', 'Opening Manga Ink and Shadow');
        } 
        // Shopping Cart & E-Commerce
        else if (command.includes('cart') || command.includes('shopping') || command.includes('store') || command.includes('checkout')) {
            if (typeof toggleCartDrawer === 'function') {
                toggleCartDrawer();
                speakAI('Opening your shopping cart drawer.');
            } else if (typeof openCart === 'function') {
                openCart();
                speakAI('Opening shopping cart.');
            } else {
                fallbackSearch('cart');
            }
        } 
        // Quizzes & Arena
        else if (command.includes('quiz') || command.includes('sorting') || command.includes('hat') || command.includes('arena')) {
            if (typeof startArchetypeQuiz === 'function') {
                startArchetypeQuiz();
                speakAI('Starting the Archetype Sorting Quiz.');
            } else if (typeof openArena === 'function') {
                openArena();
                speakAI('Opening Interactive Arena.');
            } else {
                fallbackSearch('quiz');
            }
        } 
        // Event Passes & Tickets
        else if (command.includes('pass') || command.includes('ticket') || command.includes('event')) {
            if (typeof openEventPassModal === 'function') {
                openEventPassModal();
                speakAI('Opening FandomPass Generator.');
            } else if (typeof generatePass === 'function') {
                generatePass('Verse Traveler');
                speakAI('Generating VIP Holographic Pass.');
            } else {
                fallbackSearch('events');
            }
        } 
        // Theme Toggle
        else if (command.includes('light mode') || command.includes('light theme')) {
            if (typeof toggleTheme === 'function') {
                toggleTheme('light');
                speakAI('Switching to light mode.');
            }
        } 
        else if (command.includes('dark mode') || command.includes('dark theme')) {
            if (typeof toggleTheme === 'function') {
                toggleTheme('dark');
                speakAI('Switching to dark mode.');
            }
        } 
        // Command Palette / Search
        else if (command.includes('search') || command.includes('command') || command.includes('palette')) {
            if (typeof toggleCommandPalette === 'function') {
                toggleCommandPalette();
                speakAI('Opening Command Palette search.');
            } else {
                // Trigger Ctrl + K event
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
                speakAI('Opening Command Overlay.');
            }
        } 
        // Fallback Unrecognized Command
        else {
            speakAI(`Command "${command}" not recognized. Try saying Anime, Gaming, Cart, or Quiz.`);
        }
    }

    // Helper to safely execute window functions
    function executeFunction(funcName, param, speechFeedback) {
        if (typeof window[funcName] === 'function') {
            window[funcName](param);
            speakAI(speechFeedback);
        } else {
            console.warn(`Function ${funcName} is not globally accessible on window.`);
            speakAI(speechFeedback);
        }
    }

    // Fallback UI click if direct JS function is missing
    function fallbackSearch(query) {
        const searchInput = document.querySelector('#cmd-search-input') || document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = query;
            searchInput.dispatchEvent(new Event('input'));
            speakAI(`Searching for ${query}`);
        }
    }

    // 8. Text-To-Speech Output (Speech Synthesis)
    function speakAI(text) {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Select a good English voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            window.speechSynthesis.speak(utterance);
        }
    }
});