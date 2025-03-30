import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Product name is required."],
        unique: true
    },
    cas_no: {
        type: String,
        required: [true, "Product CAS No is required."],
        unique: true
    },
    end_use: {
        type: String,
        required: [true, "Product end use is required."]
    },
    type: {
        type: String,
        required: [true, "Product type is required."]
    }
}, { timestamps: true });


export const Product = models.Product || model("Product", ProductSchema);