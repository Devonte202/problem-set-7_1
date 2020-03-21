class toDoList{
    constructor(){
        this.do_list = {}
        this.done_list = {}
        this.id_generator = 0
    }
    addTask(task){
        this.id_generator += 1
        this.do_list[this.id_generator] = task
        this.do_list[this.id_generator].id = this.id_generator
        return this.do_list
    }
    completeTask(taskID){
        const completed_task = this.do_list[taskID]
        this.done_list[taskID] = completed_task
        delete this.do_list[taskID]
        return completed_task
    }
    deleteTask(taskID){
        if(this.do_list[taskID]){
            const deleted_task = this.do_list[taskID]
            delete this.do_list[taskID]
            return deleted_task
        }
        if(this.done_list[taskID]){
            const deleted_task = this.done_list[taskID]
            delete this.done_list[taskID]
            return deleted_task
        }
    }
    updateTask(taskID, newTask, newDetails){
        this.do_list[taskID].taskName = newTask
        this.do_list[taskID].details = newDetails
        return this.do_list[taskID]
    }
}

module.exports = toDoList