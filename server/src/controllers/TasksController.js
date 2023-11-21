import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tasksService } from "../services/TasksService.js";

export class TasksController extends BaseController {
    constructor() {
        super('api/tasks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTask)
            .put('/:taskId', this.updateTask)
            .delete('/:taskId', this.removeTask)
    }

    async createTask(req, res, next) {
        try {
            const taskData = req.body
            taskData.creatorId = req.userInfo.id
            const task = await tasksService.createTask(taskData)
            return res.send(task)
        } catch (error) {
            next(error)
        }
    }

    async updateTask(req, res, next) {
        try {
            const taskId = req.params.taskId
            const userId = req.userInfo.id
            const taskData = req.body
            const task = await tasksService.updateTask(taskId, userId, taskData)
            return res.send(task)
        } catch (error) {
            next(error)
        }
    }

    async removeTask(req, res, next) {
        try {
            const taskId = req.params.taskId
            const userId = req.userInfo.id
            const message = await tasksService.removeTask(taskId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}