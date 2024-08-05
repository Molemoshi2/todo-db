import Database from "better-sqlite3";
import express from "express";
import cors from 'cors'
const db = new Database('app.db');

// const query = `CREATE TABLE tasks(
//             id INTEGER PRIMARY KEY,
//             task string NOT NULL UNIQUE,
//             task_description string NOT NULL
//             )`


// db.exec(query);

// const data = [
//     {task:"Eat",task_description:"We want to eat"},
//     {task:"Ghost",task_description:"play soccer"}
// ];

// const inserData = db.prepare("INSERT INTO tasks(task,task_description) VALUES (?, ?) ");
// data.forEach((tasks)=>{
//     inserData.run(tasks.task, tasks.task_description);
// });
// db.close();

// const query = 'SELECT * FROM tasks';
// const tasks = db.prepare(query).all();
// console.log(tasks)

// const tasks = db.prepare('SELECT * FROM tasks WHERE id=? ').get(1);
// console.log(tasks)
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
         const query = 'SELECT * FROM tasks';
         const tasks = db.prepare(query).all();
  res.json({tasks: tasks})
})
//post
app.post('/tasks', (req, res) => {
  const { task, task_description } = req.body;
  if (!task || !task_description) {
    return res.status(400).json({ error: 'Task and Task Description are required' });
  }

  try {
    const insertQuery = db.prepare("INSERT INTO tasks (task, task_description) VALUES (?, ?)");
    const result = insertQuery.run(task, task_description);
    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})