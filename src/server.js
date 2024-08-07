import Database from "better-sqlite3";
import express from "express";
import cors from 'cors';
const db = new Database('app.db');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

function createTable()
{
 const query = `CREATE TABLE IF NOT EXISTS tasks(
             id INTEGER PRIMARY KEY,
             task TEXT NOT NULL UNIQUE,
             task_description TEXT NOT NULL,
             priority TEXT
             )`;


 db.exec(query);
}
createTable();


app.get('/tasks', (req, res) => {
         const query = 'SELECT * FROM tasks';
         const tasks = db.prepare(query).all();
  res.json({tasks: tasks})
})

app.get('/tasks/:id', (req, res) => {
  const {id} = req.params;
  const query = 'SELECT * FROM tasks WHERE id = ?';
  const tasks = db.prepare(query).all(id);
res.json({tasks: tasks})
})
//post
app.post('/tasks', (req, res) => {
  const { task, task_description, priority } = req.body;
  if (!task || !task_description || !priority) {
    return res.status(400).json({ error: 'Task and Task Description are required' });
  }

  try {
    const insertQuery = db.prepare("INSERT INTO tasks (task, task_description,priority) VALUES (?, ?,?)");
    const result = insertQuery.run(task, task_description, priority);

    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// handle delete
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  console.log(`Attempting to delete task with ID: ${id}`);

  try {
      // Validate ID
      if (isNaN(id)) {
          return res.status(400).json({ error: 'Invalid ID' });
      }

      // Check if task exists
      const existingTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
      if (!existingTask) {
          return res.status(404).json({ error: 'Task not found' });
      }

      // Delete the task
      const deleteQuery = db.prepare('DELETE FROM tasks WHERE id = ?');
      deleteQuery.run(id);

      res.status(204).send(); // 204 No Content
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// handle edit
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task, task_description } = req.body;

  if (!task || !task_description) {
      return res.status(400).json({ error: 'Task and Task Description are required' });
  }

  try {
      const update = db.prepare('UPDATE tasks SET task = ?, task_description = ? WHERE id = ?, priority= ?');
      const result = update.run(task, task_description, id, priority);

      if (result.changes > 0) {
          res.json({ message: 'Todo updated successfully' });
      } else {
          res.status(404).json({ error: 'Todo not found' });
      }
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})