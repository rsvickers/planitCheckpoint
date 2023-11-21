import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { sprintsService } from "../services/SprintsService.js";

export class SprintsController extends BaseController {
    constructor() {
        super('api/sprints')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createSprint)
            .delete('/:sprintId', this.removeSprint)
    }

    async createSprint(req, res, next) {
        try {
            const sprintData = req.body
            sprintData.creatorId = req.userInfo.id
            const sprint = await sprintsService.createSprint(sprintData)
            return res.send(sprint)
        } catch (error) {
            next(error)
        }
    }

    async removeSprint(req, res, next) {
        try {
            const sprintId = req.params.sprintId
            const userId = req.userInfo.id
            const message = await sprintsService.removeSprint(sprintId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}