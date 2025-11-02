class SocketService {
  constructor() {
    this.connected = false;
    this.listeners = new Map();
    this.pollInterval = null;
  }

  connect() {
    console.log('Simulating real-time connection...');
    this.connected = true;
    
    // Simulate connection
    setTimeout(() => {
      this.emit('connect');
    }, 100);
    
    // Poll for updates every 5 seconds
    this.pollInterval = setInterval(() => {
      this.emit('statusUpdate', { timestamp: new Date() });
    }, 5000);
    
    return this;
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Socket callback error:', error);
        }
      });
    }
  }

  disconnect() {
    this.connected = false;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    this.emit('disconnect');
    this.listeners.clear();
  }
}

export default new SocketService();