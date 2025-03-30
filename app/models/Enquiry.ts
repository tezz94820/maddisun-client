import mongoose, { Schema, model, models } from "mongoose";

const EnquirySchema = new Schema({
    _id: Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: [true, "first_name is required"],
    },
    last_name: {
        type: String,
        required: [true, "last_name is required."],
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required."]
    },
    message: {
        type: String,
        required: false
    },
    products: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "Product" 
        }
    ],
}, { timestamps: true });


export const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);