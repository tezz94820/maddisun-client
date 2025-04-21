import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Product name is required."],
    },
    cas_no: {
        type: String,
        required: [true, "Product CAS No is required."],
    },
    end_use: {
        type: String,
        required: [true, "Product end use is required."]
    },
    type: {
        type: String,
        required: [true, "Product type is required."]
    },
    // category: {
    //     type: String,
    //     required: [true, "Product category is required."]
    // },
    // index: {
    //     type: Number,
    //     required: false

    // }
}, { timestamps: true });


export const Product = models.Product || model("Product", ProductSchema);