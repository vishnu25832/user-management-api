const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage
let users = [];
let idCounter = 1;

/* CREATE USER */
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email required' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    const newUser = {
        id: idCounter++,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

/* GET ALL USERS (search + sort) */
app.get('/users', (req, res) => {
    let { search, sort, order } = req.query;
    let result = [...users];

    if (search) {
        result = result.filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sort) {
        result.sort((a, b) => {
            if (order === 'desc') return a[sort] < b[sort] ? 1 : -1;
            return a[sort] > b[sort] ? 1 : -1;
        });
    }

    res.json(result);
});

/* GET USER BY ID */
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

/* UPDATE USER */
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { name, email } = req.body;

    if (name) user.name = name;
    if (email) {
        if (!email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        user.email = email;
    }

    res.json(user);
});

/* DELETE USER */
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
});

/* SERVER */
app.listen(3000, () => {
    console.log('Server running on port 3000');
});