import { Schema } from "mongoose";

export const TaskSchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    weight: { type: Number, required: true, min: 1, max: 100 },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    sprintId: { type: Schema.Types.ObjectId, required: true, ref: 'Sprint' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isComplete: { type: Boolean, required: true, default: false },
    completedOn: { type: Date, min: new Date() }
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

TaskSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})