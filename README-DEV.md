# 🔧 Development Guide

## 🚀 Auto-Restart Development Server

আপনার development server এখন auto-restart functionality এর সাথে এসেছে। Server crash হলে automatically restart হবে।

### 🎯 Available Commands

#### 1. **Simple Development Server**
```bash
npm run dev
```
- Basic webpack dev server
- Manual restart required if crashes

#### 2. **Auto-Restart Development Server (Recommended)**
```bash
npm start
# or
npm run dev:auto
```
- **Automatic restart** on crash
- **Health monitoring** every 10 seconds
- **Graceful shutdown** with Ctrl+C
- **Error handling** and logging

#### 3. **Bash Script Auto-Restart**
```bash
npm run dev:safe
# or
./start-dev.sh
```
- Bash script based auto-restart
- Simple monitoring
- Works on all Unix systems

### 🛠️ Features

#### ✅ **Auto-Restart Capabilities**
- **Crash Detection**: Monitors server health
- **Automatic Restart**: Restarts on failure
- **Restart Limits**: Max 5 restart attempts
- **Health Checks**: Monitors every 10 seconds
- **Graceful Shutdown**: Proper cleanup on exit

#### ✅ **Development Experience**
- **Hot Module Replacement**: Live reloading
- **Source Maps**: Debugging support
- **Error Logging**: Detailed error messages
- **Process Management**: Proper signal handling

### 🔧 Configuration

#### Server Settings
- **Port**: 9000 (localhost:9000)
- **Host**: localhost + network IP
- **Auto-reload**: Enabled
- **Source maps**: Enabled in development

#### Auto-Restart Settings
- **Health Check Interval**: 10 seconds
- **Max Restart Attempts**: 5
- **Restart Delay**: 3 seconds
- **Timeout**: 2 seconds for health checks

### 📊 Monitoring

#### Health Check
```bash
curl -s http://localhost:9000
```

#### Process Status
```bash
ps aux | grep webpack
```

#### Kill Server
```bash
pkill -f "webpack serve"
```

### 🚨 Troubleshooting

#### If Server Won't Start
1. Check if port 9000 is in use:
   ```bash
   lsof -i :9000
   ```

2. Kill existing processes:
   ```bash
   pkill -f "webpack serve"
   ```

3. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

4. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

#### If Auto-Restart Doesn't Work
1. Check Node.js version:
   ```bash
   node --version
   ```

2. Use bash script fallback:
   ```bash
   ./start-dev.sh
   ```

3. Manual restart:
   ```bash
   npm run dev
   ```

### 🎯 Best Practices

#### For Development
- Use `npm start` for auto-restart
- Keep terminal open to see logs
- Use Ctrl+C to stop gracefully

#### For Production
- Use `npm run build` to create production build
- Use `npm run serve` to test production build locally

### 🔍 Logs and Debugging

#### Server Logs
- ✅ Server started successfully
- 🔄 Starting development server...
- ❌ Server process exited with code X
- 🔄 Restarting server...

#### Health Check Logs
- ✅ Server health check passed
- ❌ Server health check failed - restarting...

### 💡 Tips

1. **Multiple Terminals**: Keep one terminal for server, another for git commands
2. **Browser Auto-Refresh**: Enable auto-refresh in browser
3. **Network Access**: Use network IP for mobile testing
4. **Error Monitoring**: Watch terminal for error messages
5. **Graceful Shutdown**: Always use Ctrl+C to stop

### 🎉 Success Indicators

#### Server Started Successfully
```
🚀 Hikma UI Development Server with Auto-Restart
📍 URL: http://localhost:9000
🔄 Auto-restart enabled
🛑 Press Ctrl+C to stop
----------------------------------------

🔄 Starting development server...
✅ Server started successfully
✅ Server health check passed
```

#### Auto-Restart Working
```
❌ Server process exited with code 1
🔄 Restarting server (attempt 1/5)...
🔄 Starting development server...
✅ Server started successfully
```

এখন আপনার development server crash হলে automatically restart হবে! 🎊