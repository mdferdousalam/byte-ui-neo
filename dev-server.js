#!/usr/bin/env node

/**
 * Hikma UI Development Server with Auto-Restart
 * This script provides a robust development server that automatically restarts on crashes
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

console.log('🚀 Hikma UI Development Server with Auto-Restart');
console.log('📍 URL: http://localhost:9000');
console.log('🔄 Auto-restart enabled');
console.log('🛑 Press Ctrl+C to stop');
console.log('----------------------------------------\n');

let serverProcess = null;
let restartCount = 0;
const maxRestarts = 5;
const restartDelay = 3000; // 3 seconds

// Function to check if server is responding
function checkServer() {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:9000', (res) => {
            resolve(true);
        });
        
        req.on('error', () => {
            resolve(false);
        });
        
        req.setTimeout(2000, () => {
            req.destroy();
            resolve(false);
        });
    });
}

// Function to start the development server
function startServer() {
    console.log('🔄 Starting development server...');
    
    serverProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true,
        cwd: __dirname
    });

    serverProcess.on('close', (code) => {
        console.log(`\n❌ Server process exited with code ${code}`);
        
        if (code !== 0 && restartCount < maxRestarts) {
            console.log(`🔄 Restarting server (attempt ${restartCount + 1}/${maxRestarts})...`);
            restartCount++;
            
            setTimeout(() => {
                startServer();
            }, restartDelay);
        } else if (restartCount >= maxRestarts) {
            console.log(`❌ Max restart attempts (${maxRestarts}) reached. Please check for errors.`);
            process.exit(1);
        }
    });

    serverProcess.on('error', (error) => {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    });

    // Reset restart count on successful start
    setTimeout(async () => {
        if (await checkServer()) {
            console.log('✅ Server started successfully');
            restartCount = 0;
        }
    }, 5000);
}

// Function to stop the server
function stopServer() {
    if (serverProcess) {
        console.log('\n🛑 Stopping development server...');
        serverProcess.kill('SIGTERM');
        
        // Force kill if not stopped after 5 seconds
        setTimeout(() => {
            if (serverProcess && !serverProcess.killed) {
                serverProcess.kill('SIGKILL');
            }
        }, 5000);
    }
}

// Health check monitor
async function monitorServer() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Check every 10 seconds
        
        if (serverProcess && !serverProcess.killed) {
            const isRunning = await checkServer();
            
            if (isRunning) {
                console.log('✅ Server health check passed');
            } else {
                console.log('❌ Server health check failed - restarting...');
                stopServer();
                
                setTimeout(() => {
                    startServer();
                }, restartDelay);
            }
        }
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT. Shutting down gracefully...');
    stopServer();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM. Shutting down gracefully...');
    stopServer();
    process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    stopServer();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    stopServer();
    process.exit(1);
});

// Start the server
startServer();

// Start health monitoring
monitorServer().catch(console.error);