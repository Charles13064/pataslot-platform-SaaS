/**
 * PataSlot — api.js
 * Single place that talks to the Express + Sequelize backend.
 * Every module (auth.js, onboarding.js, dashboard.js, ...) calls Api.*
 * instead of using fetch() directly.
 */

const Api = (function () {
  'use strict';

  const BASE_URL = '/api/v1';
  const MAX_RETRIES = 1;

  class ApiError extends Error {
    constructor(message, status, payload) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.payload = payload;
    }
  }

  async function refreshAccessToken() {
    const refreshToken = Storage.get(Storage.KEYS.REFRESH_TOKEN);
    if (!refreshToken) return false;

    try {
      const res = await fetch(BASE_URL + '/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      Storage.set(Storage.KEYS.TOKEN, data.token);
      return true;
    } catch {
      return false;
    }
  }

  async function request(path, { method = 'GET', body, retry = 0, skipAuth = false } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const token = Storage.get(Storage.KEYS.TOKEN);
    if (token && !skipAuth) headers.Authorization = 'Bearer ' + token;

    let res;
    try {
      res = await fetch(BASE_URL + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (networkErr) {
      throw new ApiError('Network error! Check your connection and try again.', 0, null);
    }

    // Token expired — refresh once, then retry the original request.
    if (res.status === 401 && retry < MAX_RETRIES && !skipAuth) {
      const refreshed = await refreshAccessToken();
      if (refreshed) return request(path, { method, body, retry: retry + 1, skipAuth });
    }

    let data = null;
    try {
      data = await res.json();
    } catch {
      /* empty or non-JSON body */
    }

    if (!res.ok) {
      const message = (data && (data.message || data.error)) || `Request failed (${res.status})`;
      throw new ApiError(message, res.status, data);
    }

    return data;
  }

  return {
    ApiError,
    get: (path) => request(path),
    post: (path, body, opts) => request(path, { method: 'POST', body, ...opts }),
    patch: (path, body) => request(path, { method: 'PATCH', body }),
    del: (path) => request(path, { method: 'DELETE' }),
  };
})();
