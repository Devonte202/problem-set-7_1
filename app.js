const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const path = require('path')
const Task = require('./models/task')
const toDoList = require('./models/to-do-list')

const userList = new toDoList()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Setting a public folder for our static files
app.use(express.static('styles'))

//Set EJS as our templating language
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/todo-list', (req, res) => {
  res.render('todo-list.ejs', {doList: userList.do_list, doneList: userList.done_list})
})

app.get('/add', (req,res) =>{
    res.render('add-task.ejs')
})

app.post('/add-new', (req, res) =>{
  const {taskName, details} = req.body
  const task = new Task(taskName, details)
  userList.addTask(task)
  res.render('todo-list.ejs', {doList: userList.do_list, doneList: userList.done_list})
})

app.post('/delete/:id', (req, res) =>{
  const taskID = req.params.id
  userList.deleteTask(taskID)
  res.render('todo-list.ejs', {doList: userList.do_list, doneList: userList.done_list})
})

app.post('/complete/:id', (req, res) =>{
  const taskID = req.params.id
  userList.completeTask(taskID)
  res.render('todo-list.ejs', {doList: userList.do_list, doneList: userList.done_list})
})

app.post('/update/:id', (req, res) =>{
    const taskID = req.params.id
    const taskName = userList.do_list[taskID].taskName
    const details = userList.do_list[taskID].details
    res.render('update.ejs', {taskID:taskID, taskName: taskName, details: details}) 
})

app.post('/updated/:id', (req, res) =>{
  const taskID = req.params.id
  const {newTask, newDetails} = req.body
  userList.updateTask(taskID,newTask, newDetails)
  console.log(userList.do_list)
  res.render('todo-list.ejs', {doList: userList.do_list, doneList: userList.done_list})
})

app.listen(port, () => console.log(`Now listening on port ${port}.`))