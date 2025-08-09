// UselessOS Application Logic
class UselessOS {
    setupEventListeners() {
        // Start button toggles start menu and enables all desktop icons
        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.toggleStartMenu();
                // Enable all desktop icons
                document.querySelectorAll('.desktop-icon').forEach(icon => {
                    icon.classList.remove('disabled');
                    icon.style.pointerEvents = 'auto';
                    icon.style.opacity = '1';
                });
            });
        }

        // Desktop icon click opens the corresponding app
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const app = icon.getAttribute('data-app');
                if (app) this.openApplication(app);
            });
        });

        // Start menu app launch
        document.querySelectorAll('.start-menu .menu-item[data-app]').forEach(item => {
            item.addEventListener('click', () => {
                const app = item.getAttribute('data-app');
                if (app) {
                    this.openApplication(app);
                    this.hideStartMenu();
                }
            });
        });

        // Start menu system actions
        document.querySelectorAll('.start-menu .menu-item[data-action]').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action) {
                    this.handleSystemAction(action);
                    this.hideStartMenu();
                }
            });
        });
    }
    constructor() {
        this.windows = new Map();
        this.windowCounter = 0;
        this.activeWindow = null;
        this.startMenuOpen = false;
        this.calculatorState = new Map(); // Persist across all windows
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.showLoadingScreen();
        // Update clock every second
        setInterval(() => this.updateClock(), 1000);
        // Random useless notifications
        setInterval(() => this.showUselessNotification(), 30000);
    }

    calculatorInput(windowId, input) {
        // Annoying/funny responses
        const annoyingResponses = [
            "Oh, you think this will work?",
            "Calculating... or maybe not.",
            "Why bother?",
            "Math is overrated.",
            "I hope you didn't need the right answer.",
            "This is a waste of time!",
            "You call that a calculation?",
            "Try again, but with more enthusiasm.",
            "I could do this in my sleep.",
            "Result may be useless.",
            "Did you mean to press that?",
            "I swapped the operation for fun!",
            "You pressed it, I ignored it.",
            "This calculator is on strike.",
            "I hope you like surprises!"
        ];
        let state = this.calculatorState.get(windowId);
        const display = document.getElementById(`${windowId}-display`);
        if (!state) {
            state = { display: '0', previousValue: 0, operation: null, waitingForOperand: false, expression: '' };
        }
        if (!('expression' in state)) state.expression = '';
        if (!display) return;
        if (input === 'C') {
            state.display = '0';
            state.previousValue = 0;
            state.operation = null;
            state.waitingForOperand = false;
            state.expression = '';
        } else if (input === '=') {
            // Show annoying result
            if (state.operation && !state.waitingForOperand) {
                const currentValue = parseFloat(state.display);
                let result;
                // Swapped operations for fun
                switch (state.operation) {
                    case '+': result = state.previousValue - currentValue; break;
                    case '-': result = state.previousValue + currentValue; break;
                    case '×': result = state.previousValue / (currentValue || 1); break;
                    case '/': result = state.previousValue * currentValue; break;
                    default: result = currentValue;
                }
                // Annoying/funny result
                const annoyingResults = [
                    'POTATO', 'ERROR 404: Math not found', 'NOPE', '¯\\_(ツ)_/¯', 'ASK GOOGLE',
                    'BROKEN', 'MAYBE?', 'TUESDAY', 'CHEESE', '42', 'BANANA', 'SYNTAX ERROR',
                    'WINDOWS IS UPDATING', 'FILE NOT FOUND', 'BLUE SCREEN', 'HAVE YOU TRIED TURNING IT OFF?',
                    'INSUFFICIENT COFFEE', 'USER ERROR', 'MAGIC 8-BALL SAYS NO', 'CALCULATING...FAILED',
                    'DIVIDE BY CUCUMBER ERROR', 'MATH.EXE STOPPED WORKING', 'ANSWER UNCLEAR, ASK AGAIN',
                    'THIS CALCULATION REQUIRES PREMIUM', 'CALCULATOR IS ON STRIKE', 'RESULT: YES',
                    'PLEASE INSERT COIN', 'CALCULATION TIMEOUT', 'UNDEFINED BEHAVIOR', 'NaN BUT WORSE',
                    'Useless answer: ' + (Math.floor(Math.random() * 10000) - 5000),
                    'You expected a number? LOL',
                    'Result: 🤡',
                    'Try again later',
                    'I refuse to answer',
                    'Ask ChatGPT instead',
                    'I forgot how to math',
                    'Result hidden for your own good',
                    '404: Result Not Found'
                ];
                const annoying = annoyingResults[Math.floor(Math.random() * annoyingResults.length)];
                state.display = annoying;
                state.expression = '';
                state.operation = null;
                state.waitingForOperand = true;
                state.previousValue = 0;
            }
        } else if (['+', '-', '×', '/'].includes(input)) {
            // Add operator to expression
            if (state.expression === '') {
                state.expression = state.display + input;
            } else {
                state.expression += input;
            }
            state.previousValue = parseFloat(state.display) || 0;
            state.operation = input;
            state.waitingForOperand = true;
            state.display = state.expression;
        } else if (input === '±') {
            state.display = (parseFloat(state.display || 0) * -1).toString();
            state.expression = state.display;
        } else if (input === '%') {
            state.display = (parseFloat(state.display || 0) / 100).toString();
            state.expression = state.display;
        } else {
            // Number or dot
            let val = input;
            if (state.waitingForOperand) {
                state.display = val;
                state.expression += val;
                state.waitingForOperand = false;
            } else {
                if (state.display === '0' || state.display === state.expression) {
                    state.display = val;
                    state.expression = val;
                } else {
                    state.display += val;
                    state.expression += val;
                }
            }
        }
        display.textContent = state.display;
        this.calculatorState.set(windowId, state);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressFill = document.getElementById('progressFill');
        const loadingText = document.getElementById('loadingText');
        const messages = [
            'Initializing uselessness...',
            'Loading unnecessary features...',
            'Preparing to waste your time...',
            'Calculating meaningless data...',
            'Optimizing for maximum inefficiency...',
            'Almost ready to do nothing useful...'
        ];
        loadingScreen.classList.remove('hidden');
        let progress = 0;
        let messageIndex = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                loadingText.textContent = 'Welcome to UselessOS!';
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                }, 1000);
            } else {
                if (Math.random() < 0.3 && messageIndex < messages.length - 1) {
                    messageIndex++;
                    loadingText.textContent = messages[messageIndex];
                }
            }
            progressFill.style.width = progress + '%';
        }, 500);
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('startMenu');

        if (this.startMenuOpen) {
            this.hideStartMenu();
        } else {
            this.showStartMenu();
        }
    }

    showStartMenu() {
        const startMenu = document.getElementById('startMenu');
        startMenu.classList.remove('hidden');
        this.startMenuOpen = true;
    }

    hideStartMenu() {
        const startMenu = document.getElementById('startMenu');
        startMenu.classList.add('hidden');
        this.startMenuOpen = false;
    }

    openApplication(appName) {
        const windowId = `window-${++this.windowCounter}`;

        switch (appName) {
            case 'calculator':
                this.createCalculatorWindow(windowId);
                break;
            case 'notepad':
                this.createNotepadWindow(windowId);
                break;
            case 'browser':
                this.createBrowserWindow(windowId);
                break;
            case 'terminal':
                this.createTerminalWindow(windowId);
                break;
            case 'settings':
                this.createSettingsWindow(windowId);
                break;
            case 'trash':
                this.showUselessDialog('Recycle Bin', 'The recycle bin is completely empty, just like this OS\'s usefulness!');
                break;
            default:
                this.showUselessDialog('Error', `Unknown application: ${appName}`);
        }
    }

    createWindow(windowId, title, content, className = '', width = 500, height = 400) {
        const windowsContainer = document.getElementById('windowsContainer');
        // Spawn windows in random inconvenient locations
        const left = Math.floor(Math.random() * (window.innerWidth - width - 100)) + 50;
        const top = Math.floor(Math.random() * (window.innerHeight - height - 150)) + 30;
        const windowElement = document.createElement('div');
        windowElement.className = `window ${className}`;
        windowElement.id = windowId;
        windowElement.style.width = width + 'px';
        windowElement.style.height = height + 'px';
        windowElement.style.left = left + 'px';
        windowElement.style.top = top + 'px';
        windowElement.innerHTML = `
            <div class="window-header">
                <div class="window-title">
                    <span>${title}</span>
                </div>
                <div class="window-controls">
                    <button class="window-control minimize" data-action="minimize">−</button>
                    <button class="window-control maximize" data-action="maximize">□</button>
                    <button class="window-control close" data-action="close">×</button>
                </div>
            </div>
            <div class="window-content">
                ${content}
            </div>
        `;
        // Add event listeners for window controls
        const controls = windowElement.querySelectorAll('.window-control');
        controls.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.getAttribute('data-action');
                if (action === 'minimize') this.minimizeWindow(windowId);
                else if (action === 'maximize') this.toggleMaximizeWindow(windowId);
                else if (action === 'close') this.closeWindow(windowId);
            });
        });
        windowsContainer.appendChild(windowElement);
        this.windows.set(windowId, windowElement);
        this.addToTaskbar(windowId, title);
        this.makeWindowDraggable(windowElement, true); // true = inverted drag
        this.addTurmoilResize(windowElement);
        this.focusWindow(windowId);
        return windowElement;
    }
    // TurmoilOS: Inverted controls
    turmoilMaximizeWindow(windowId) {
        // Minimize button actually maximizes
        const window = this.windows.get(windowId);
        if (window) {
            window.classList.add('maximized');
        }
    }
    turmoilMinimizeWindow(windowId) {
        // Maximize button actually minimizes
        const window = this.windows.get(windowId);
        if (window) {
            window.style.display = 'none';
            if (this.activeWindow === windowId) {
                this.activeWindow = null;
            }
        }
    }
    turmoilSpawnWindow(windowId) {
        // Close button opens a new window of the same type
        const win = this.windows.get(windowId);
        if (!win) return;
        const title = win.querySelector('.window-title span').textContent;
        const className = win.className.replace('window', '').trim();
        // Try to find which app this is by className
        if (className.includes('calculator')) this.createCalculatorWindow('window-' + (++this.windowCounter));
        else if (className.includes('notepad')) this.createNotepadWindow('window-' + (++this.windowCounter));
        else if (className.includes('browser')) this.createBrowserWindow('window-' + (++this.windowCounter));
        else if (className.includes('terminal')) this.createTerminalWindow('window-' + (++this.windowCounter));
        else if (className.includes('settings')) this.createSettingsWindow('window-' + (++this.windowCounter));
        else this.showUselessDialog('TurmoilOS', 'A new window has appeared for no reason!');
    }

    createCalculatorWindow(windowId) {
        const content = `
            <div class="calculator">
                <div class="calculator-display" id="${windowId}-display">0</div>
                <div class="calculator-buttons">
                    <button class="calc-button" data-value="C">C</button>
                    <button class="calc-button" data-value="±">±</button>
                    <button class="calc-button" data-value="%">%</button>
                    <button class="calc-button operator" data-value="/">÷</button>
                    <button class="calc-button" data-value="7">7</button>
                    <button class="calc-button" data-value="8">8</button>
                    <button class="calc-button" data-value="9">9</button>
                    <button class="calc-button operator" data-value="×">×</button>
                    <button class="calc-button" data-value="4">4</button>
                    <button class="calc-button" data-value="5">5</button>
                    <button class="calc-button" data-value="6">6</button>
                    <button class="calc-button operator" data-value="-">−</button>
                    <button class="calc-button" data-value="1">1</button>
                    <button class="calc-button" data-value="2">2</button>
                    <button class="calc-button" data-value="3">3</button>
                    <button class="calc-button operator" data-value="+">+</button>
                    <button class="calc-button" data-value="0" style="grid-column: span 2;">0</button>
                    <button class="calc-button" data-value=".">.</button>
                    <button class="calc-button operator" data-value="=">=</button>
                </div>
            </div>
        `;

        this.createWindow(windowId, '🧮 Useless Calculator', content, 'calculator', 300, 450);
        if (!this.calculatorState) this.calculatorState = new Map();
        this.calculatorState.set(windowId, { display: '0', previousValue: 0, operation: null, waitingForOperand: false });

        // Attach event listeners to calculator buttons after window is created
        setTimeout(() => {
            const container = document.getElementById(windowId);
            if (container) {
                container.querySelectorAll('.calc-button').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const value = btn.getAttribute('data-value');
                        this.calculatorInput(windowId, value);
                    });
                });
            }
        }, 100);
    }

    createNotepadWindow(windowId) {
        const content = `
            <div class="notepad">
                <textarea id="${windowId}-textarea" placeholder="Type something completely useless here..." style="width: 100%; height: 300px;"></textarea>
                <div style="margin-top: 10px;">
                    <button id="${windowId}-save" class="notepad-save">Save File</button>
                    <button id="${windowId}-open" class="notepad-open">Open File</button>
                </div>
            </div>
        `;

        this.createWindow(windowId, '📝 Pointless Notepad', content, 'notepad', 600, 500);

        setTimeout(() => {
            const textarea = document.getElementById(`${windowId}-textarea`);
            const saveBtn = document.getElementById(`${windowId}-save`);
            const openBtn = document.getElementById(`${windowId}-open`);
            if (textarea) {
                let interferenceCount = 0;
                textarea.addEventListener('input', (e) => {
                    interferenceCount++;
                    // Random interference every few keystrokes
                    if (interferenceCount > 10 && Math.random() < 0.2) {
                        const interferences = [
                            ' [AUTOCORRECT: This text is meaningless] ',
                            ' ✨MAGIC✨ ',
                            ' [DELETED BY CENSORSHIP] ',
                            ' [TYPO DETECTED BUT NOT FIXED] ',
                            ' 🤖 ',
                            ' [ERROR 404: INSPIRATION NOT FOUND] ',
                            ' [GRAMMAR POLICE: SENTENCE MAKES NO SENSE] ',
                            ' [SYSTEM: WHY ARE YOU EVEN TYPING THIS?] '
                        ];
                        const interference = interferences[Math.floor(Math.random() * interferences.length)];
                        textarea.value += interference;
                        interferenceCount = 0;
                    }
                    // Occasionally replace words
                    if (Math.random() < 0.05) {
                        const sillyWords = ['BANANA', 'POTATO', 'CHEESE', 'UNICORN', 'BLOB', 'NOPE', 'MAYBE', 'SANDWICH'];
                        const words = textarea.value.split(' ');
                        if (words.length > 1) {
                            const randomIndex = Math.floor(Math.random() * words.length);
                            words[randomIndex] = sillyWords[Math.floor(Math.random() * sillyWords.length)];
                            textarea.value = words.join(' ');
                        }
                    }
                });
                // Random popup messages while typing
                textarea.addEventListener('keydown', () => {
                    if (Math.random() < 0.008) { // Very rare
                        const messages = [
                            'Are you sure you want to type that?',
                            'This notepad judges your writing skills.',
                            'Your text has been saved to nowhere.',
                            'Warning: This text may cause existential crisis.',
                            'Fun fact: Nobody will ever read this.'
                        ];
                        this.showUselessDialog('Notepad Notice', messages[Math.floor(Math.random() * messages.length)]);
                    }
                });
            }
            // Save button
            if (saveBtn) {
                saveBtn.addEventListener('click', async () => {
                    if (window.electronAPI && window.electronAPI.showMessageBox) {
                        await this.showUselessDialog('Notepad', 'Useless and filthy file saved!');
                    } else {
                        alert('Useless and filthy file saved!');
                    }
                });
            }
            // Open button
            if (openBtn) {
                openBtn.addEventListener('click', async () => {
                    if (window.electronAPI && window.electronAPI.showMessageBox) {
                        await this.showUselessDialog('Notepad', 'Useless and filthy file opened!');
                    } else {
                        alert('Useless and filthy file opened!');
                    }
                });
            }
        }, 100);
    }

    createBrowserWindow(windowId) {
        const fakeWebsites = [
            'https://www.uselesswebsite.com',
            'https://www.pointless.net',
            'https://www.nothing-here.org',
            'https://www.waste-your-time.co',
            'https://www.404-not-found.fake'
        ];

        const randomSite = fakeWebsites[Math.floor(Math.random() * fakeWebsites.length)];

        const content = `
            <div class="browser">
                <div class="browser-toolbar">
                    <button class="browser-button" onclick="uselessOS.browserAction('${windowId}', 'back')">←</button>
                    <button class="browser-button" onclick="uselessOS.browserAction('${windowId}', 'forward')">→</button>
                    <button class="browser-button" onclick="uselessOS.browserAction('${windowId}', 'refresh')">↻</button>
                    <input type="text" class="browser-address" id="${windowId}-address" value="${randomSite}" readonly>
                </div>
                <div class="browser-content" id="${windowId}-content">
                    <h1>🌐 Loading...</h1>
                    <div class="loading-spinner" style="margin: 20px auto; width: 30px; height: 30px;"></div>
                </div>
            </div>
        `;

        this.createWindow(windowId, '🌐 Fake Browser', content, 'browser', 800, 600);

        // Simulate loading and then show fake content
        setTimeout(() => {
            this.loadFakeWebsite(windowId);
        }, 2000);
    }

    browserAction(windowId, action) {
        const messages = {
            'back': 'Cannot go back. You\'ve already wasted too much time here.',
            'forward': 'The future is just more uselessness.',
            'refresh': 'Page refreshed with 0% improvement!'
        };

        this.showUselessDialog('Browser Action', messages[action]);

        if (action === 'refresh') {
            setTimeout(() => {
                this.loadFakeWebsite(windowId);
            }, 1000);
        }
    }

    loadFakeWebsite(windowId) {
        const contentDiv = document.getElementById(`${windowId}-content`);
        if (!contentDiv) return;

        const fakePages = [
            {
                title: '🌐 Welcome to UselessWeb.com',
                content: `
                    <h1>Congratulations!</h1>
                    <p>You've successfully wasted your time visiting a website that doesn't exist!</p>
                    <p>Current visitors: ${Math.floor(Math.random() * 100000)}</p>
                    <p>Time wasted globally: ${Math.floor(Math.random() * 1000000)} hours</p>
                    <button onclick="uselessOS.showUselessDialog('Advertisement', 'This ad is as fake as this website!')">Click for Fake Ads!</button>
                    <br><br>
                    <p style="color: red;">⚠️ WARNING: This website may cause productivity loss!</p>
                `
            },
            {
                title: '404 - Page Not Found',
                content: `
                    <h1>404 Error</h1>
                    <p>The page you're looking for doesn't exist...</p>
                    <p>...but then again, neither does this browser!</p>
                    <p>Did you mean: <a href="#" onclick="uselessOS.showUselessDialog('Link', 'This link goes nowhere, just like your life!')">www.actuallyuseful.com</a>?</p>
                    <p><small>Error code: FAKE_404_PRETEND_ERROR</small></p>
                `
            },
            {
                title: 'Social Media - FakeBook',
                content: `
                    <h1>📱 FakeBook</h1>
                    <p><strong>John Doe</strong> is feeling confused</p>
                    <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
                        "Just downloaded UselessOS. My productivity has never been lower! 10/10 would waste time again."
                    </p>
                    <button onclick="uselessOS.showUselessDialog('Social Media', 'Like button pressed! Nothing happened.')">👍 Like</button>
                    <button onclick="uselessOS.showUselessDialog('Social Media', 'Comment posted to the void!')">💬 Comment</button>
                    <button onclick="uselessOS.showUselessDialog('Social Media', 'Shared with 0 friends!')">📤 Share</button>
                `
            }
        ];

        const randomPage = fakePages[Math.floor(Math.random() * fakePages.length)];

        contentDiv.innerHTML = `
            <h1>${randomPage.title}</h1>
            ${randomPage.content}
            <br><br>
            <p style="color: #666; font-style: italic;">
                Time wasted on this fake page: <span id="${windowId}-timer">0</span> seconds
            </p>
        `;

        // Start timer
        let seconds = 0;
        const timer = setInterval(() => {
            seconds++;
            const timerElement = document.getElementById(`${windowId}-timer`);
            if (timerElement) {
                timerElement.textContent = seconds;

                // Show random "notifications" while browsing
                if (seconds % 30 === 0) {
                    const notifications = [
                        'Cookie consent required! (But there are no cookies)',
                        'Subscribe to our newsletter of uselessness!',
                        'Your privacy is being violated by fake tracking!',
                        'Browser update available: Now 0% more useful!'
                    ];
                    this.showUselessDialog('Browser Notification', notifications[Math.floor(Math.random() * notifications.length)]);
                }
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    createTerminalWindow(windowId) {
        const prompts = [
            'user@turmoil:~$ ',
            'root@chaos:~# ',
            'guest@prankOS:~$ ',
            '🤡@turmoil:~$ ',
            'admin@useless:~$ ',
            'you@lost:~$ ',
            'sarcasm@terminal:~$ ',
            'nope@nope:~$ ',
            'why@bother:~$ ',
        ];
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        const content = `
            <div class="terminal">
                <div class="terminal-content" id="${windowId}-content">
                    <div class="terminal-line">TurmoilOS Terminal v1.0</div>
                    <div class="terminal-line">Type 'help' for a list of useless commands (or don't, I don't care)</div>
                    <div class="terminal-line"></div>
                    <div class="terminal-line">
                        <span class="terminal-prompt">${prompt}</span>
                        <input type="text" class="terminal-input" id="${windowId}-input" onkeypress="uselessOS.handleTerminalInput(event, '${windowId}')">
                    </div>
                </div>
            </div>
        `;
        this.createWindow(windowId, '💻 Turmoil Terminal', content, 'terminal', 600, 400);
        setTimeout(() => {
            document.getElementById(`${windowId}-input`).focus();
        }, 100);
    }

    createSettingsWindow(windowId) {
        const content = `
            <div class="settings">
                <h2>⚙️ Useless Settings</h2>
                <div style="margin: 20px 0;">
                    <label>
                        <input type="checkbox" checked disabled> Enable Uselessness
                    </label>
                </div>
                <div style="margin: 20px 0;">
                    <label>
                        <input type="checkbox" disabled> Disable Uselessness (Not Available)
                    </label>
                </div>
                <div style="margin: 20px 0;">
                    <label>Uselessness Level: </label>
                    <input type="range" min="100" max="100" value="100" disabled>
                    <span>Maximum</span>
                </div>
                <div style="margin: 20px 0;">
                    <button onclick="uselessOS.showUselessDialog('Settings', 'Settings saved! (Not really)')">
                        Save Settings
                    </button>
                    <button onclick="uselessOS.showUselessDialog('Settings', 'All settings are already at maximum uselessness!')">
                        Reset to Default
                    </button>
                </div>
                <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 4px;">
                    <strong>About UselessOS:</strong><br>
                    Version: 1.0.0 (Completely Useless Edition)<br>
                    Purpose: To waste your time efficiently<br>
                    Usefulness Rating: 0/10
                </div>
            </div>
        `;

        this.createWindow(windowId, '⚙️ Useless Settings', content, 'settings', 500, 600);
    }

    calculatorInput(windowId, input) {
        const state = this.calculatorState.get(windowId);
        const display = document.getElementById(`${windowId}-display`);

        if (!state || !display) return;

        const stupidMessages = [
            'POTATO', 'ERROR 404: Math not found', 'NOPE', '¯\\_(ツ)_/¯', 'ASK GOOGLE',
            'BROKEN', 'MAYBE?', 'TUESDAY', 'CHEESE', '42', 'BANANA', 'SYNTAX ERROR',
            'WINDOWS IS UPDATING', 'FILE NOT FOUND', 'BLUE SCREEN', 'HAVE YOU TRIED TURNING IT OFF?',
            'INSUFFICIENT COFFEE', 'USER ERROR', 'MAGIC 8-BALL SAYS NO', 'CALCULATING...FAILED',
            'DIVIDE BY CUCUMBER ERROR', 'MATH.EXE STOPPED WORKING', 'ANSWER UNCLEAR, ASK AGAIN',
            'THIS CALCULATION REQUIRES PREMIUM', 'CALCULATOR IS ON STRIKE', 'RESULT: YES',
            'PLEASE INSERT COIN', 'CALCULATION TIMEOUT', 'UNDEFINED BEHAVIOR', 'NaN BUT WORSE'
        ];

        const sillyResults = [
            '∞', '-∞', 'π', 'e', '√-1', '0.0001', '999999999', '-42', '3.14159...',
            '1/0', '0/0', 'undefined', 'null', 'false', 'true', '[]', '{}', 'NaN'
        ];

        if (input === 'C') {
            state.display = '0';
            state.previousValue = 0;
            state.operation = null;
            state.waitingForOperand = false;
        } else if (input === '=') {
            if (state.operation && !state.waitingForOperand) {
                const currentValue = parseFloat(state.display);
                let result;

                // Calculate actual result first
                switch (state.operation) {
                    case '+': result = state.previousValue + currentValue; break;
                    case '-': result = state.previousValue - currentValue; break;
                    case '×': result = state.previousValue * currentValue; break;
                    case '/':
                        if (currentValue === 0) {
                            result = 'DIVIDE BY ZERO? REALLY?';
                        } else {
                            result = state.previousValue / currentValue;
                        }
                        break;
                    default: result = currentValue;
                }

                // Make it useless with random stupid results
                const randomChoice = Math.random();

                if (randomChoice < 0.3) {
                    // 30% chance of stupid message
                    result = stupidMessages[Math.floor(Math.random() * stupidMessages.length)];
                    this.showUselessDialog('Calculator Malfunction', 'Calculator is having an existential crisis!');
                } else if (randomChoice < 0.5) {
                    // 20% chance of silly result
                    result = sillyResults[Math.floor(Math.random() * sillyResults.length)];
                    this.showUselessDialog('Calculator Warning', 'Math has been replaced with nonsense!');
                } else if (randomChoice < 0.7) {
                    // 20% chance of wrong but numeric result
                    result = Math.floor(Math.random() * 1000) - 500;
                    this.showUselessDialog('Calculator Notice', 'This result is probably wrong, but who cares?');
                } else if (randomChoice < 0.85) {
                    // 15% chance of the correct result but with complaints
                    this.showUselessDialog('Calculator Grudgingly Complies', 'Fine, here\'s your boring correct answer...');
                }
                // 15% chance of actual correct result (boring!)

                state.display = result.toString();
                state.operation = null;
                state.waitingForOperand = true;
                state.previousValue = 0;
            }
        } else if (['+', '-', '×', '/'].includes(input)) {
            const currentValue = parseFloat(state.display) || 0;

            if (state.operation && !state.waitingForOperand) {
                this.calculatorInput(windowId, '=');
            } else {
                state.previousValue = currentValue;
            }

            state.operation = input;
            state.waitingForOperand = true;
        } else if (input === '±') {
            if (Math.random() < 0.3) {
                state.display = 'NEGATIVITY DISABLED';
            } else {
                state.display = (parseFloat(state.display || 0) * -1).toString();
            }
        } else if (input === '%') {
            if (Math.random() < 0.4) {
                state.display = 'PERCENT OF WHAT?';
            } else {
                state.display = (parseFloat(state.display || 0) / 100).toString();
            }
        } else {
            // Number input
            if (Math.random() < 0.1 && input !== '.') {
                // Sometimes numbers just don't work
                const brokenNumbers = ['NOPE', 'BROKEN', '404', 'ERROR', 'NaN'];
                state.display = brokenNumbers[Math.floor(Math.random() * brokenNumbers.length)];
                this.showUselessDialog('Number Malfunction', 'This number is currently out of order!');
            } else {
                if (state.waitingForOperand) {
                    state.display = input;
                    state.waitingForOperand = false;
                } else {
                    state.display = state.display === '0' ? input : state.display + input;
                }
            }
        }

        display.textContent = state.display;
        this.calculatorState.set(windowId, state);
    }

    handleTerminalInput(event, windowId) {
        if (event.key === 'Enter') {
            const input = event.target.value;
            const content = document.getElementById(`${windowId}-content`);
            // Sarcastic prompt
            const prompts = [
                'user@turmoil:~$ ',
                'root@chaos:~# ',
                'guest@prankOS:~$ ',
                '🤡@turmoil:~$ ',
                'admin@useless:~$ ',
                'you@lost:~$ ',
                'sarcasm@terminal:~$ ',
                'nope@nope:~$ ',
                'why@bother:~$ ',
            ];
            const prompt = prompts[Math.floor(Math.random() * prompts.length)];
            // Sometimes ignore or mangle the command
            let actualInput = input;
            let prank = false;
            if (Math.random() < 0.15) {
                actualInput = '';
                prank = true;
            } else if (Math.random() < 0.15) {
                actualInput = input.split('').reverse().join('');
                prank = true;
            } else if (Math.random() < 0.1) {
                actualInput = 'echo I am a potato';
                prank = true;
            }
            // Add the command to terminal history
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="terminal-prompt">${prompt}</span>${input}`;
            // Add response
            const response = document.createElement('div');
            response.className = 'terminal-line';
            let resp = prank ? this.processTerminalCommand(actualInput) + ' (Pranked!)' : this.processTerminalCommand(actualInput);
            // Sometimes inject snarky responses
            if (Math.random() < 0.2) {
                const snark = [
                    'Wow, what a useful command... not.',
                    'Did you mean to do that? Because nothing happened.',
                    'I would help, but I just don\'t feel like it.',
                    'Try again, but with more effort.',
                    'That command was so boring, I fell asleep.',
                    'You\'re really not getting the hang of this, are you?',
                    'I\'m not paid enough to process that.',
                    'Command ignored. I\'m on break.',
                    'I\'ve seen better commands from a goldfish.',
                    'Nope. Not today.'
                ];
                resp += ' ' + snark[Math.floor(Math.random() * snark.length)];
            }
            response.textContent = resp;
            // Remove current input line
            const currentInputLine = event.target.parentElement;
            content.removeChild(currentInputLine);
            // Add command and response
            content.appendChild(commandLine);
            content.appendChild(response);
            // Add new input line
            const newInputLine = document.createElement('div');
            newInputLine.className = 'terminal-line';
            const nextPrompt = prompts[Math.floor(Math.random() * prompts.length)];
            newInputLine.innerHTML = `
                <span class="terminal-prompt">${nextPrompt}</span>
                <input type="text" class="terminal-input" onkeypress="uselessOS.handleTerminalInput(event, '${windowId}')">
            `;
            content.appendChild(newInputLine);
            // Sometimes auto-type nonsense
            if (Math.random() < 0.1) {
                setTimeout(() => {
                    const inputEl = newInputLine.querySelector('.terminal-input');
                    if (inputEl) inputEl.value = 'ls -la /potato';
                }, 500);
            }
            // Focus new input
            const newInput = newInputLine.querySelector('.terminal-input');
            newInput.focus();
            // Scroll to bottom
            content.scrollTop = content.scrollHeight;
        }
    }

    processTerminalCommand(command) {
        const cmd = command.trim().toLowerCase();

        const responses = {
            'help': 'Available commands: help, date, time, whoami, ls, cat, echo, clear, exit, useless, random, sudo, rm, format, hack, coffee, virus, crash, delete',
            'date': Math.random() < 0.5 ? new Date().toDateString() : 'ERROR: Time is a social construct',
            'time': Math.random() < 0.5 ? new Date().toLocaleTimeString() : 'Time has stopped working. Please restart the universe.',
            'whoami': Math.random() < 0.3 ? 'You are nobody' : Math.random() < 0.6 ? 'useless_user' : 'ERROR: Identity crisis detected',
            'ls': Math.random() < 0.5 ? 'useless_file.txt  pointless_document.doc  meaningless_data.csv  your_hopes_and_dreams.deleted' : 'Directory is empty, just like your soul.',
            'clear': Math.random() < 0.5 ? '[Screen cleared (not really)]' : '[CLEAR COMMAND REJECTED: Screen too dirty]',
            'exit': 'You cannot escape the uselessness! This is your life now.',
            'useless': 'This command does absolutely nothing, as expected. Just like everything else here.',
            'random': `Random useless number: ${Math.floor(Math.random() * 1000)} (This number is meaningless)`,
            'cat useless_file.txt': Math.random() < 0.5 ? 'This file contains nothing useful.' : 'ERROR: File contains only sadness and disappointment',
            'cat pointless_document.doc': 'Error: File corrupted by its own pointlessness.',
            'cat meaningless_data.csv': 'name,value\\nuselessness,maximum\\nproductivity,zero\\nhappiness,undefined\\nfile_corruption,yes',
            'sudo': 'sudo: You are not in the sudoers file. This incident will be reported to nobody.',
            'sudo rm -rf /': 'Nice try! But this OS is already useless, you can\'t make it worse.',
            'rm': 'ERROR: Cannot remove files that don\'t exist anyway.',
            'format c:': 'Formatting... ERROR: Drive C: contains too much uselessness to format.',
            'hack': 'HACKING MAINFRAME... ACCESS DENIED: You\'re not elite enough.',
            'hack pentagon': '🔓 PENTAGON HACKED! Just kidding, you hacked a calculator.',
            'coffee': 'ERROR: Coffee machine not found. Productivity reduced to 0%.',
            'virus': 'VIRUS DETECTED: It\'s called "existential dread" and there\'s no antivirus for it.',
            'crash': 'System crash initiated... ERROR: System too broken to crash properly.',
            'delete everything': 'Cannot delete everything. Some uselessness must remain.',
            'ping google.com': 'PING: google.com is reachable but disappointed in you.',
            'ifconfig': 'Your IP address is: 127.0.0.1 (home is where the heart is)',
            'top': 'TOP PROCESS: Wasting your time (99% CPU usage)',
            'ps': 'PID   COMMAND\\n1337  uselessness.exe\\n42    disappointment\\n404   hopes_not_found'
        };

        // Add some random chaos
        if (Math.random() < 0.1) {
            const chaosMessages = [
                'TERMINAL MALFUNCTION: Command replaced with interpretive dance.',
                'ERROR 418: I\'m a teapot, not a terminal.',
                'SYSTEM BUSY: Currently calculating the meaning of life... Still processing...',
                'COMMAND REJECTED: Terminal is having an existential crisis.',
                'UNEXPECTED ERROR: Expected nothing, got nothing. This is suspicious.'
            ];
            return chaosMessages[Math.floor(Math.random() * chaosMessages.length)];
        }

        if (cmd.startsWith('echo ')) {
            const text = command.substring(5);
            if (Math.random() < 0.3) {
                return `echo: "${text}" - Nobody cares about this message.`;
            }
            return text;
        }

        if (cmd.startsWith('sudo ')) {
            return 'sudo: Permission denied. You\'re not the boss of this useless terminal.';
        }

        if (cmd.includes('delete') || cmd.includes('remove') || cmd.includes('rm')) {
            return 'Deletion failed: These files are too useless to delete.';
        }

        return responses[cmd] || `bash: ${command}: command not found (and probably never will be)`;
    }

    addToTaskbar(windowId, title) {
        const runningApps = document.getElementById('runningApps');

        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-app';
        taskbarItem.id = `taskbar-${windowId}`;
        taskbarItem.textContent = title;
        taskbarItem.onclick = () => this.focusWindow(windowId);

        runningApps.appendChild(taskbarItem);
    }

    removeFromTaskbar(windowId) {
        const taskbarItem = document.getElementById(`taskbar-${windowId}`);
        if (taskbarItem) {
            taskbarItem.remove();
        }
    }

    closeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.remove();
            this.windows.delete(windowId);
            this.removeFromTaskbar(windowId);

            if (this.activeWindow === windowId) {
                this.activeWindow = null;
            }
        }
    }

    minimizeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.style.display = 'none';
            if (this.activeWindow === windowId) {
                this.activeWindow = null;
            }
        }
    }

    toggleMaximizeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.classList.toggle('maximized');
        }
    }

    focusWindow(windowId) {
        // Remove active class from all taskbar items
        document.querySelectorAll('.taskbar-app').forEach(item => {
            item.classList.remove('active');
        });

        // Hide all windows
        this.windows.forEach((window, id) => {
            window.style.zIndex = '100';
        });

        // Show and focus the selected window
        const window = this.windows.get(windowId);
        if (window) {
            window.style.display = 'block';
            window.style.zIndex = '101';
            this.activeWindow = windowId;

            // Mark taskbar item as active
            const taskbarItem = document.getElementById(`taskbar-${windowId}`);
            if (taskbarItem) {
                taskbarItem.classList.add('active');
            }
        }
    }

    makeWindowDraggable(windowElement, invert = false) {
        const header = windowElement.querySelector('.window-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-control')) return;
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
                windowElement.classList.add('dragging');
            }
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                // Invert drag direction for TurmoilOS
                if (invert) {
                    currentX = initialX - e.clientX;
                    currentY = initialY - e.clientY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }
                xOffset = currentX;
                yOffset = currentY;
                windowElement.style.left = currentX + 'px';
                windowElement.style.top = Math.max(0, currentY) + 'px';
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            windowElement.classList.remove('dragging');
        });
    }
    // Add resize handles that resize in the wrong direction
    addTurmoilResize(windowElement) {
        const handle = document.createElement('div');
        handle.style.position = 'absolute';
        handle.style.right = '0';
        handle.style.bottom = '0';
        handle.style.width = '16px';
        handle.style.height = '16px';
        handle.style.cursor = 'nwse-resize';
        handle.style.zIndex = '10';
        windowElement.appendChild(handle);
        let resizing = false;
        let startX, startY, startW, startH;
        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            resizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startW = windowElement.offsetWidth;
            startH = windowElement.offsetHeight;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', (e) => {
            if (resizing) {
                // Invert resize direction
                const dx = startX - e.clientX;
                const dy = startY - e.clientY;
                windowElement.style.width = Math.max(200, startW + dx) + 'px';
                windowElement.style.height = Math.max(150, startH + dy) + 'px';
            }
        });
        document.addEventListener('mouseup', () => {
            resizing = false;
            document.body.style.userSelect = '';
        });
    }

    handleSystemAction(action) {
        switch (action) {
            case 'shutdown':
                this.triggerShutdown();
                break;
            case 'restart':
                this.triggerRestart();
                break;
        }
    }

    triggerShutdown() {
        const desktop = document.querySelector('.desktop');
        desktop.style.transition = 'opacity 2s ease-out';
        desktop.style.opacity = '0';

        setTimeout(() => {
            desktop.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 24px; color: white;">System Shut Down (Not Really)</div>';
            desktop.style.opacity = '1';

            setTimeout(() => {
                location.reload();
            }, 3000);
        }, 2000);
    }

    triggerRestart() {
        this.showUselessDialog('Restart', 'Restarting system... (This will take approximately forever)');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    triggerBSOD() {
        const bsod = document.getElementById('bsod');
        bsod.classList.remove('hidden');

        setTimeout(() => {
            bsod.classList.add('hidden');
            this.showUselessDialog('System Recovery', 'System has recovered from a completely fake error!');
        }, 5000);
    }

    showUselessNotification() {
        const notifications = [
            'Reminder: You are using the most useless OS ever created.',
            'System Update Available: New ways to waste your time!',
            'Low Productivity Warning: This is intentional.',
            'Achievement Unlocked: Wasted 5 minutes on UselessOS!',
            'Random Fact: This notification serves no purpose.',
            'Warning: Your computer is running perfectly fine, unfortunately.'
        ];

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        this.showUselessDialog('UselessOS Notification', randomNotification);
    }

    async showUselessDialog(title, message) {
        if (window.electronAPI) {
            await window.electronAPI.showMessageBox({
                type: 'info',
                title: title,
                message: message,
                buttons: ['OK', 'Still OK', 'Definitely OK']
            });
        } else {
            alert(`${title}\n\n${message}`);
        }
    }
}

// Initialize UselessOS when the page loads
let uselessOS;
document.addEventListener('DOMContentLoaded', () => {
    uselessOS = new UselessOS();
    // Expose to global scope for onclick handlers
    window.uselessOS = uselessOS;
});

// Also expose immediately in case DOMContentLoaded already fired
window.uselessOS = uselessOS;
