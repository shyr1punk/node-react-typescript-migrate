import { ResponseTasksGet, RequestPostBody, ResponseStatusOk, RequestPutBody } from "../server";

const base = 'http://0.0.0.0:3000';

const commonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function fetchTasks(): Promise<ResponseTasksGet> {
    return fetch(`${base}/tasks`)
        .then(res => res.json());
}

function saveTask(task: RequestPostBody): Promise<ResponseStatusOk> {
    return fetch(`${base}/tasks`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(task)
    })
        .then(res => res.json());
}

function updateTask(id: string, newFields: RequestPutBody): Promise<ResponseStatusOk> {
    return fetch(`${base}/tasks/${id}`, {
        method: 'PUT',
        headers: commonHeaders,
        body: JSON.stringify(newFields)
    })
        .then(res => res.json());
}

function deleteTask(id: string): Promise<ResponseStatusOk> {
    return fetch(`${base}/tasks/${id}`, {
        method: 'DELETE',
        headers: commonHeaders
    })
        .then(res => res.json());
}

export default {
    fetchTasks,
    saveTask,
    updateTask,
    deleteTask
}