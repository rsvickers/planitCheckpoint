export class Task {
    constructor(data) {
        this.id = data.id || data._id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.name = data.name
        this.weight = data.weight
        this.projectId = data.projectId
        this.sprintId = data.sprintId
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.isComplete = data.isComplete
        this.completedOn = data.completedOn ? new Date(data.completedOn) : null
    }
}