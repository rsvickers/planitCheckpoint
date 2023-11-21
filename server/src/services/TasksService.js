import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TasksService {
    async getTasksByProjectId(projectId) {
        const tasks = await dbContext.Tasks.find({ projectId }).populate('creator', 'name picture')
        return tasks
    }
    async createTask(taskData) {
        const task = await dbContext.Tasks.create(taskData)
        await task.populate('creator', 'name picture')
        return task
    }

    async getTaskById(taskId) {
        const task = await dbContext.Tasks.findById(taskId).populate('creator', 'name picture')

        if (!task) {
            throw new BadRequest(`Invalid id: ${taskId}`)
        }
        return task
    }
    async updateTask(taskId, userId, taskData) {
        const task = await this.getTaskById(taskId)


        if (task.creatorId.toString() != userId) { throw new Forbidden("NOT YOUR TASK") }

        task.name = taskData.name || task.name
        task.weight = taskData.weight || task.weight
        task.sprintId = taskData.sprintId || task.sprintId
        task.isComplete = taskData.isComplete != undefined ? taskData.isComplete : task.isComplete

        if (task.isComplete && !task.completedOn) {
            task.completedOn = new Date()
        }
        else {
            task.completedOn = null
        }


        await task.save()
        return task
    }

    async removeTask(taskId, userId) {
        const task = await this.getTaskById(taskId)
        if (task.creatorId.toString() != userId) {
            throw new Forbidden('NOT YOUR TASK')
        }
        await task.remove()
        return `${task.name} has been deleted.`
    }
}



export const tasksService = new TasksService()