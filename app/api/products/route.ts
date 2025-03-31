import { connectDB } from '@/app/lib/mongodb';
import { ProductSchema } from '@/app/lib/validation';
import { Product } from '@/app/models/product';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await connectDB();
  
  // filters from URL
  const url = new URL(request.url);
  const typeFilter = url.searchParams.get('type');
  const searchTerm = url.searchParams.get('search');

  // Build query object
  let query: any = {};
  
  // Add type filter if provided
  if (typeFilter && typeFilter != 'All') {
      query.type = typeFilter;
  }
  
  // Add search functionality
  if (searchTerm && searchTerm.trim() !== '') {
      // Create a search regex pattern (case insensitive)
      const searchRegex = new RegExp(searchTerm, 'i');
      
      // Search across multiple fields using $or operator
      query.$or = [
          { name: searchRegex },
          { cas_no: searchRegex },
          { end_use: searchRegex }
      ];
  }
  
  try {
      const products = await Product.find(query).sort({ name: 1 });
      return NextResponse.json(products);
  } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
          { error: "Failed to fetch products" },
          { status: 500 }
      );
  }
}


export async function POST(req: Request) {
    try {
      await connectDB();
  
      const body = await req.json();
  
      // Validate input with Zod
      const validatedData = ProductSchema.parse(body);
        
      // Check if product with the same name and cas_no already exists
      const existingProduct = await Product.findOne({ name: validatedData.name, cas_no: validatedData.cas_no });
  
      if (existingProduct) {
        return NextResponse.json({ error: "Product with the same name and CAS No already exists" }, { status: 400 });
      }
      // Create and save product
      const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...validatedData,
      });
  
      await newProduct.save();
  
      return NextResponse.json({ message: "Product created", product: newProduct }, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
  }






  export async function PUT(req: Request) {
    try {
      await connectDB();
  
      const body = await req.json();
      const { _id, name, cas_no, end_use, type } = body;
  
      if (!_id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
      }
  
      // Check if the product exists
      const existingProduct = await Product.findById(_id);
      if (!existingProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      // Check for duplicate name or CAS number (excluding the current product)
      const duplicateName = await Product.findOne({ name, _id: { $ne: _id } });
      if (duplicateName) {
        return NextResponse.json({ error: "Product with this name already exists" }, { status: 400 });
      }
  
      const duplicateCasNo = await Product.findOne({ cas_no, _id: { $ne: _id } });
      if (duplicateCasNo) {
        return NextResponse.json({ error: "Product with this CAS number already exists" }, { status: 400 });
      }
  
      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        { name, cas_no, end_use, type },
        { new: true, runValidators: true }
      );
  
      return NextResponse.json({ 
        message: "Product updated successfully", 
        product: updatedProduct 
      });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
  }
  
  export async function DELETE(req: Request) {
    try {
      await connectDB();
  
      const body = await req.json();
      const { id } = body;
  
      if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
      }
  
      // Check if the product exists
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      // Delete the product
      await Product.findByIdAndDelete(id);
  
      return NextResponse.json({ 
        message: "Product deleted successfully" 
      });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
  }