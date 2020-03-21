class Task{
    constructor(taskName, details){
        this.taskName = taskName
        this.details = details
        this.timeOfCreation = new Date()
    }
}

module.exports = Task