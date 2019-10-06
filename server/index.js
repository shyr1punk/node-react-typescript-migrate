const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const cors = require('cors');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ tasks: [] }).write();

app.get('/tasks', (req, res) => {
    console.log('READ');

    const tasks = db.get('tasks')
        .value();

    res.send(tasks);
});

app.post('/tasks', (req, res) => {
    console.log('CREATE: ', req.body.id);

    db.get('tasks')
        .push(req.body)
        .write();

    res.send({ status: 'OK' });
});

app.put('/tasks/:id', (req, res) => {
    console.log('UPDATE: ', req.params.id, 'new: ', JSON.stringify(req.body));

    db.get('tasks')
        .find({ id: req.params.id })
        .assign(req.body)
        .write();

    res.send({ status: 'OK' });
});

app.delete('/tasks/:id', (req, res) => {
    console.log('DELETE: ', req.params.id);

    db.get('tasks')
        .remove({ id: req.params.id })
        .write();

    res.send({ status: 'OK' });
});


app.listen(3000, () => console.log('listening on port 3000'));
