const hackerCommands = [
    'ps aux | grep suspicious',
    'cat /etc/passwd | tail -10',
    'netstat -tulpn | grep :80',
    'ls -la /var/log/',
    'whoami && id',
    'uname -a',
    'find / -name "*.log" 2>/dev/null',
    'ss -tulpn',
    'lsof -i :443',
    'grep -r "password" /home/',
    'history | tail -20',
    'cat /proc/version'
];

const responses = [
    'root      1234  0.0  0.1  12345  6789 ?        Ss   10:30   0:01 /bin/bash\nwww-data  5678  0.2  0.5  98765 43210 ?        S    10:31   0:00 apache2',
    'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin',
    'tcp    0    0 0.0.0.0:80    0.0.0.0:*    LISTEN    1234/apache2\ntcp    0    0 127.0.0.1:3306 0.0.0.0:*   LISTEN    5678/mysqld',
    'total 156\ndrwxr-xr-x  8 root root  4096 Jul 30 10:25 .\ndrwxr-xr-x 23 root root  4096 Jul 29 14:30 ..\n-rw-r--r--  1 root root 51200 Jul 30 10:25 auth.log',
    'uid=0(root) gid=0(root) groups=0(root)',
    'Linux kali 5.18.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Debian x86_64 GNU/Linux',
    '/var/log/apache2/access.log\n/var/log/auth.log\n/var/log/kern.log\n/var/log/syslog',
    'tcp   LISTEN 0     80          0.0.0.0:80        0.0.0.0:*    users:(("apache2",pid=1234,fd=4))',
    'apache2   1234 root    4u  IPv4  12345      0t0  TCP *:https (LISTEN)\napache2   1235 www-data 4u IPv4 12345 0t0 TCP *:https (LISTEN)',
    'grep: /home/user/.bash_history: Permission denied\n/home/user/backup/old_passwords.txt:admin123\n/home/user/notes.txt:remember to change default password',
    '1001  ls -la\n1002  cat /etc/passwd\n1003  ps aux\n1004  whoami\n1005  history',
    'Linux version 5.18.0-kali7-amd64 (devel@kali.org) (gcc version 11.3.0) #1 SMP PREEMPT_DYNAMIC'
];

let isStealthMode = false;
let typingTimeout;
let commandIndex = 0;
let currentTyping = '';
let typingSpeed = 50;
let isTyping = false;

document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
    document.addEventListener('keydown', handleKeypress);
    initializeButtons();
    initializeFAQ();
});

function updateTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
}

function handleKeypress(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    if (event.key === 'Enter') {
        if (currentTyping.length > 0) {
            executeCommand();
        } else {
            executeHackerCommand();
        }
        return;
    }
    
    if (event.key === 'Backspace') {
        if (currentTyping.length > 0) {
            currentTyping = currentTyping.slice(0, -1);
            updateTypingDisplay();
        }
        return;
    }
    
    if (event.key.length === 1) {
        currentTyping += event.key;
        updateTypingDisplay();
        
        if (Math.random() < 0.3 && currentTyping.length > 5) {
            setTimeout(() => {
                if (!isTyping) {
                    executeCommand();
                }
            }, 800 + Math.random() * 1200);
        }
    }
}

function updateTypingDisplay() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        typedElement.textContent = currentTyping;
    }
}

function executeCommand() {
    if (isTyping) return;
    isTyping = true;
    
    const command = currentTyping.trim() || hackerCommands[commandIndex % hackerCommands.length];
    const response = getResponseForCommand(command);
    
    const output = document.getElementById('terminal-output');
    
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<span class="text-green-400">user@system:~$ ${command}</span>`;
    output.appendChild(commandDiv);
    
    currentTyping = '';
    updateTypingDisplay();
    
    setTimeout(() => {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = `<pre class="text-gray-300 whitespace-pre-wrap">${response}</pre>`;
        output.appendChild(responseDiv);
        
        const separatorDiv = document.createElement('div');
        separatorDiv.innerHTML = '<div class="text-green-400">user@system:~$ <span id="typed-text" class="typing-effect"></span></div>';
        output.appendChild(separatorDiv);
        
        output.scrollTop = output.scrollHeight;
        isTyping = false;
        commandIndex++;
    }, 200 + Math.random() * 600);
}

function getResponseForCommand(command) {
    if (command.includes('ls')) return 'Documents  Downloads  Pictures  Videos  scripts  notes.txt  .bashrc';
    if (command.includes('pwd')) return '/home/user';
    if (command.includes('whoami')) return 'user';
    if (command.includes('date')) return new Date().toString();
    if (command.includes('ps')) return responses[0];
    if (command.includes('cat')) return responses[1];
    if (command.includes('netstat')) return responses[2];
    if (command.includes('history')) return responses[10];
    
    return responses[commandIndex % responses.length];
}

function executeHackerCommand() {
    if (isTyping) return;
    executeCommand();
}

function addToTerminal(command) {
    if (isTyping) return;
    isTyping = true;
    
    const output = document.getElementById('terminal-output');
    
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<span class="text-green-400">user@system:~$ ${command}</span>`;
    output.appendChild(commandDiv);
    
    setTimeout(() => {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = `<pre class="text-gray-300 whitespace-pre-wrap">${getResponseForCommand(command)}</pre>`;
        output.appendChild(responseDiv);
        
        const separatorDiv = document.createElement('div');
        separatorDiv.innerHTML = '<div class="text-green-400">user@system:~$ <span id="typed-text" class="typing-effect"></span></div>';
        output.appendChild(separatorDiv);
        
        output.scrollTop = output.scrollHeight;
        isTyping = false;
        currentTyping = '';
        updateTypingDisplay();
    }, 300 + Math.random() * 400);
}

function initializeButtons() {
    document.getElementById('toggleMode').addEventListener('click', function() {
        isStealthMode = !isStealthMode;
        this.textContent = isStealthMode ? 'FAST' : 'SLOW';
        typingSpeed = isStealthMode ? 20 : 50;
        this.className = isStealthMode ? 
            'px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors' :
            'px-3 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-black transition-colors';
    });

    document.getElementById('clearTerminal').addEventListener('click', function() {
        const output = document.getElementById('terminal-output');
        output.innerHTML = `
            <div class="text-green-400">Terminal v1.2.3 initialized</div>
            <div class="text-gray-400">Start typing commands...</div>
            <div class="text-yellow-400">Tip: Press Enter to execute</div>
            <div class="text-green-400">user@system:~$ <span id="typed-text" class="typing-effect"></span></div>
        `;
        commandIndex = 0;
        currentTyping = '';
        isTyping = false;
        updateTypingDisplay();
    });
}

function initializeFAQ() {
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('toggle', function() {
            const summary = this.querySelector('summary span');
            if (this.open) {
                summary.textContent = summary.textContent.replace('▶', '▼');
            } else {
                summary.textContent = summary.textContent.replace('▼', '▶');
            }
        });
    });
}
