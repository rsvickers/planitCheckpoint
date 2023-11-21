import { Schema } from "mongoose";

export const SprintSchema = new Schema({
    name: { type: String, required: true, maxLength: 40 },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isOpen: { type: Boolean, required: true, default: true }
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

SprintSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})