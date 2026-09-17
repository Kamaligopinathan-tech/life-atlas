const API_BASE = '/api';

/**
 * Parses and normalizes API error responses from Django REST Framework.
 */
async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(
      typeof data === 'string'
        ? data
        : data.detail || 'An error occurred while processing your request.'
    );
    error.status = response.status;
    error.errors = typeof data === 'object' ? data : {};
    throw error;
  }

  return data;
}

export const api = {
  /**
   * Fetch students with search, filters, and sorting.
   */
  async getStudents(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.department && params.department !== 'All') query.append('department', params.department);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.ordering) query.append('ordering', params.ordering);

    const queryString = query.toString();
    const url = `${API_BASE}/students/${queryString ? `?${queryString}` : ''}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  /**
   * Fetch single student by ID.
   */
  async getStudentById(id) {
    const res = await fetch(`${API_BASE}/students/${id}/`);
    return handleResponse(res);
  },

  /**
   * Create new student record.
   */
  async createStudent(studentData) {
    const res = await fetch(`${API_BASE}/students/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  /**
   * Update student (full PUT).
   */
  async updateStudent(id, studentData) {
    const res = await fetch(`${API_BASE}/students/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  /**
   * Partial update (PATCH).
   */
  async patchStudent(id, partialData) {
    const res = await fetch(`${API_BASE}/students/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partialData),
    });
    return handleResponse(res);
  },

  /**
   * Delete student record.
   */
  async deleteStudent(id) {
    const res = await fetch(`${API_BASE}/students/${id}/`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  /**
   * Fetch statistical summary.
   */
  async getStats() {
    const res = await fetch(`${API_BASE}/students/stats/`);
    return handleResponse(res);
  },
};
