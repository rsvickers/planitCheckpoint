import { Schema } from "mongoose";

export const NoteSchema = new Schema(
    {
        body: { type: String, required: true, maxLength: 50 },
        taskId: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

NoteSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})