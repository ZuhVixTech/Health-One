const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Configuration
const WATCH_DIR = path.resolve(__dirname, '../../'); // Watch project root
const DEBOUNCE_MS = 10000; // Wait 10 seconds after last change before pushing

let debounceTimer = null;

console.log(`[Auto-Sync] Watching files in: ${WATCH_DIR}`);
console.log(`[Auto-Sync] Will push 10 seconds after changes stop...`);

const runGitSync = () => {
    console.log('[Auto-Sync] Syncing changes...');

    // Command to add, commit, and push
    const gitCmd = `cd "${WATCH_DIR}" && git add . && git commit -m "Auto-sync: ${new Date().toLocaleString()}" && git push origin main`;

    exec(gitCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`[Auto-Sync] Error: ${error.message}`);
            return;
        }
        if (stderr) {
            // Git often outputs to stderr for progress, so we just log it
            // console.log(`[Git Status]: ${stderr}`);
        }
        console.log(`[Auto-Sync] Success! Changes pushed to repo.`);
        console.log(stdout);
    });
};

const watcher = chokidar.watch(WATCH_DIR, {
    ignored: [
        /(^|[\/\\])\../, // Ignore dotfiles
        /node_modules/,
        /dist/,
        /build/,
        /ops/, // Ignore this tool itself to prevent infinite loops if we change it
        /.git/
    ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    }
});

watcher.on('all', (event, path) => {
    console.log(`[Change Detected] ${event}: ${path}`);

    // Reset timer
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set new timer
    debounceTimer = setTimeout(() => {
        runGitSync();
    }, DEBOUNCE_MS);
});
