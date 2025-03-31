import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, "blog title is required"],
        unique: true
    },
    category: {
        type: String, 
        required: [true, "blog category is required"],
    },
    link: {
        type: String,
        required: [true, "blog link is required"],
        unique: true
    },
    date: {
        type: Date,
        required: [true, "Date is required."]
    },
    pinned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


export const Blog = models.Blog || model("Blog", BlogSchema);