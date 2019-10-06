const base = 'http://0.0.0.0:3000';

const commonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function fetchTasks() {
    return fetch(`${base}/tasks`)
        .then(res => res.json());
}

function saveTask(task) {
    return fetch(`${base}/tasks`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(task)
    })
        .then(res => res.json());
}

function updateTask(id, newFields) {
    return fetch(`${base}/tasks/${id}`, {
        method: 'PUT',
        headers: commonHeaders,
        body: JSON.stringify(newFields)
    })
        .then(res => res.json());
}

function deleteTask(id) {
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