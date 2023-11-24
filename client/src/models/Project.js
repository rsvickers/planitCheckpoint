export class Project {
    constructor(data) {
        this.id = data.id || data._id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.name = data.name
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }
}