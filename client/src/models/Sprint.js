export class Sprint {
    constructor(data) {
        this.id = data.id || data._id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.name = data.name
        this.projectId = data.projectId
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.isOpen = data.isOpen
    }
}