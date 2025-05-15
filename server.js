const express = require('express');
const mongoose = require('mongoose');
const AddProject = require('./models/project');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/fullstack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET route - Get all projects
app.get('/api/services', async (req, res) => {
  try {
    const projects = await AddProject.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

app.post('/api/services', async (req, res) => {
  console.log("Incoming request body:", req.body);  // 👈 ADD THIS

  const { projectname, projectdescription} = req.body;

  if (!projectname || !projectdescription) {
    return res.status(400).json({ error: 'projectname, projectdescription' });
  }

  const prjDetails = new AddProject({
    id: Date.now(),
    projectname,
    projectdescription,
    
  });

  try {
    await prjDetails.save();
    console.log("Project saved to DB");  // 👈 ADD THIS
    res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error("Database save error:", error);  // 👈 ADD THIS
    res.status(500).json({ error: 'Error saving project' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
