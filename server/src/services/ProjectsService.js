import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class ProjectsService {


    async getMyProjects(userId) {
        const projects = await dbContext.Projects.find({ creatorId: userId }).populate('creator', 'name picture')
        return projects
    }

    async getProjectById(projectId, userId) {
        const project = await dbContext.Projects.findById(projectId).populate('creator', 'name picture')
        if (!project) {
            throw new BadRequest(`${projectId} is not a valid Id`)
        }
        return project

    }
    async createProject(projectData) {
        const project = await dbContext.Projects.create(projectData)
        await project.populate('creator', 'name picture')
        return project
    }

    async removeProject(projectId, userId) {
        const project = await this.getProjectById(projectId, userId)
        await project.remove()
        return `${project.name} has been deleted.`
    }

}

export const projectsService = new ProjectsService()