import express from 'express';
import bodyParser from 'body-parser';
import low from 'lowdb';
import cors from 'cors';
import FileSync from 'lowdb/adapters/FileSync';

const app = express();
app.use(bodyParser.json());
app.use(cors());

type Schema = {
    tasks: Task[];
}

const adapter = new FileSync<Schema>('db.json');
const db = low(adapter);

db.defaults<Schema>({ tasks: [] }).write();



export type ResponseTasksGet = Task[];

app.get<{}, ResponseTasksGet>('/tasks', (req, res) => {
    console.log('READ');

    const tasks = db.get('tasks')
        .value();

    res.send(tasks);
});

export type ResponseStatusOk = { status: 'OK' };
export type RequestPostBody = Task;

app.post<{}, ResponseStatusOk, RequestPostBody>('/tasks', (req, res) => {
    console.log('CREATE: ', req.body.id);

    db.get('tasks')
        .push(req.body)
        .write();

    res.send({ status: 'OK' });
});

type IdQueryParam = { id: string };
export type RequestPutBody = Partial<Pick<Task, 'completed' | 'name'>>;

app.put<IdQueryParam, ResponseStatusOk, RequestPutBody>('/tasks/:id', (req, res) => {
    console.log('UPDATE: ', req.params.id, 'new: ', JSON.stringify(req.body));

    db.get('tasks')
        .find({ id: req.params.id })
        .assign(req.body)
        .write();

    res.send({ status: 'OK' });
});

app.delete<IdQueryParam, ResponseStatusOk>('/tasks/:id', (req, res) => {
    console.log('DELETE: ', req.params.id);

    db.get('tasks')
        .remove({ id: req.params.id })
        .write();

    res.send({ status: 'OK' });
});


app.listen(3000, () => console.log('listening on port 3000'));
