const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
    };
    
    // Only add Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
    } else {
      config.headers = {
        ...options.headers,
      };
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Timetable endpoints
  async getTimetable(section) {
    return this.request(`/timetables/${section}`);
  }

  async getAllTimetables() {
    return this.request('/timetables');
  }

  async getCurrentClass(section) {
    return this.request(`/timetables/${section}/current`);
  }

  async createTimetable(data) {
    return this.request('/timetables', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTimetable(section, data) {
    return this.request(`/timetables/${section}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Faculty endpoints
  async getAllFaculty() {
    return this.request('/faculty');
  }

  async getFacultySchedule(name) {
    return this.request(`/faculty/${encodeURIComponent(name)}/schedule`);
  }

  // Room endpoints
  async getAllRooms() {
    return this.request('/rooms');
  }

  async getRoomSchedule(roomNumber) {
    return this.request(`/rooms/${encodeURIComponent(roomNumber)}/schedule`);
  }

  // Upload endpoints
  async uploadExcel(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/upload/excel', {
      method: 'POST',
      body: formData
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();