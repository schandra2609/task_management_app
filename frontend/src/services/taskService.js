import API from './API.js';

export const getTasks = async ({ page = 1, limit = 6, status, search, sortBy, order } = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (status && status !== 'ALL') params.append('status', status);
    if (search && search.trim()) params.append('search', search.trim());
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);

    const { data: responseBody } = await API.get(`/tasks?${params.toString()}`);
    return responseBody;
};

export const createTask = async (taskData) => {
    const { data: responseBody } = await API.post('/tasks', taskData);
    return responseBody.data;
};

export const updateTask = async (id, taskData) => {
    const { data: responseBody } = await API.patch(`/tasks/${id}`, taskData);
    return responseBody.data;
};

export const updateTaskStatus = async (id, status) => {
    const { data: responseBody } = await API.patch(`/tasks/${id}/status`, { status });
    return responseBody.data;
};

export const deleteTask = async (id) => {
    const { data: responseBody } = await API.delete(`/tasks/${id}`);
    return responseBody.data;
};