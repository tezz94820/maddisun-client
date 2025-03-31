import { connectDB } from "@/app/lib/mongodb";
import { EnquirySchema } from "@/app/lib/validation";
import { Enquiry } from "@/app/models/Enquiry";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        //validating the request body using zod
        const validatedData = EnquirySchema.parse(body);
        console.log(validatedData);

        //create an enquiry in Enquiry model.
        const newEnquiry = new Enquiry({
            _id: new mongoose.Types.ObjectId(),
            first_name: validatedData.first_name,
            last_name: validatedData.last_name,
            email: validatedData.email,
            phone: validatedData.phone,
            message: validatedData.message,
            products: validatedData.products?.map(id => new mongoose.Types.ObjectId(id)) || []
        });
        await newEnquiry.save();

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });


        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.NOTIFICATION_EMAIL,
            subject: 'New Enquiry Submission',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border: 1px solid #e0e0e0;
                            border-radius: 5px;
                        }
                        .header {
                            background-color: #f8f9fa;
                            padding: 15px;
                            margin-bottom: 20px;
                            border-bottom: 1px solid #e0e0e0;
                            text-align: center;
                        }
                        .content {
                            padding: 0 15px;
                        }
                        .info-row {
                            margin-bottom: 10px;
                        }
                        .label {
                            font-weight: bold;
                            color: #555;
                        }
                        .message-content {
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-left: 4px solid #007bff;
                            margin: 15px 0;
                            white-space: pre-wrap;
                        }
                        .footer {
                            margin-top: 30px;
                            font-size: 12px;
                            color: #777;
                            text-align: center;
                            border-top: 1px solid #e0e0e0;
                            padding-top: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Enquiry Received</h2>
                        </div>
                        <div class="content">
                            <div class="info-row">
                                <span class="label">From:</span> ${validatedData.first_name} ${validatedData.last_name}
                            </div>
                            <div class="info-row">
                                <span class="label">Email:</span> ${validatedData.email}
                            </div>
                            <div class="info-row">
                                <span class="label">Phone:</span> ${validatedData.phone}
                            </div>
                            <div class="info-row">
                                <span class="label">Date:</span> ${new Date().toLocaleString()}
                            </div>
                            <div class="info-row">
                                <div class="label">Message:</div>
                                <div class="message-content">${validatedData.message?.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This is an automated notification from your website enquiry system.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Form submitted successfully and notification email sent" });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}


export async function GET(req: Request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter');
        const customDate = searchParams.get('date');

        // Prepare the query filter
        let dateFilter = {};

        if (filter === 'today') {
            // Get today's start and end (in user's timezone)
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            dateFilter = {
                createdAt: {
                    $gte: today,
                    $lt: tomorrow
                }
            };
        } else if (filter === 'yesterday') {
            // Get yesterday's start and end
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            dateFilter = {
                createdAt: {
                    $gte: yesterday,
                    $lt: today
                }
            };
        } else if (customDate) {
            // For custom date filter
            const selectedDate = new Date(customDate);
            selectedDate.setHours(0, 0, 0, 0);

            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);

            dateFilter = {
                createdAt: {
                    $gte: selectedDate,
                    $lt: nextDay
                }
            };
        }

        // Fetch enquiries with the date filter
        const enquiries = await Enquiry.find(dateFilter)
            .sort({ createdAt: -1 })
            .lean();

        // Return the enquiries as JSON
        return NextResponse.json(enquiries);
    } catch (error) {
        console.error("Error fetching enquiries:", error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Failed to fetch enquiries: " + error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "An unknown error occurred while fetching enquiries" },
            { status: 500 }
        );
    }
}