import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class SprintsService {

    async getSprintsByProjectId(projectId) {
        const sprints = await dbContext.Sprints.find({ projectId }).populate('creator', 'name picture')
        return sprints
    }

    async createSprint(sprintData) {
        const sprint = await dbContext.Sprints.create(sprintData)
        await sprint.populate('creator', 'name picture')
        return sprint
    }
    async removeSprint(sprintId, userId) {
        const sprint = await dbContext.Sprints.findById(sprintId)
        if (!sprint) {
            throw new BadRequest(`${sprintId} is not a valid Id`)
        }
        if (sprint.creatorId.toString() != userId) {
            throw new Forbidden("Not your sprint")
        }
        await sprint.remove()
        return `${sprint.name} has been deleted.`
    }

}

export const sprintsService = new SprintsService()