export class Note {
    constructor(data) {
        this.id = data.id || data._id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.body = data.body
        this.projectId = data.projectId
        this.taskId = data.taskId
        this.creatorId = data.creatorId
        this.creator = data.creator
    }
}