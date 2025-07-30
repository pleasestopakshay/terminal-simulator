tailwind.config = {
    theme: {
        extend: {
            colors: {
                'matrix-green': '#00ff41',
                'terminal-bg': '#1e1e1e',
                'terminal-border': '#333333',
            },
            fontFamily: {
                'mono': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
            },
            animation: {
                'cursor-blink': 'blink 1s infinite',
                'scan-line': 'scanline 3s linear infinite',
                'glow': 'glow 3s ease-in-out infinite alternate',
            }
        }
    }
}
