import { connectDB } from '@/app/lib/mongodb';
import { BlogSchema, BlogUpdateSchema } from '@/app/lib/validation';
import { Blog } from '@/app/models/Blog';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// GET blogs by category
export async function GET(request: NextRequest) {
  await connectDB();
  
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const pinnedOnly = url.searchParams.get('pinnedonly');
  
  let query:any = {};

  if (category && category.trim() !== '') {
    query.category = { $regex: new RegExp(`^${category}$`, 'i') };
  }

  if (pinnedOnly === 'true') {
    query.pinned = true;
  }

  try {
    let blogs = await Blog.find(query).sort({ date: -1 }).lean();

    if(pinnedOnly === "true") {
        const pinnedBlogs = [];
        const categories = new Set();
        for (const blog of blogs) {
            if (!categories.has(blog.category)) {
                pinnedBlogs.push(blog);
                categories.add(blog.category);
            }
        }
        blogs = pinnedBlogs;
    }

    //change the format of date in each blog to fullMonth date, year
    blogs.forEach( blog => {
        blog.date = new Date(blog.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    })
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST to create a new blog
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate input with Zod
    const validatedData = BlogSchema.parse(body);
    
    // Check if blog with the same title already exists
    const existingBlogWithTitle = await Blog.findOne({ title: validatedData.title });
    if (existingBlogWithTitle) {
      return NextResponse.json({ error: "Blog with this title already exists" }, { status: 400 });
    }
    
    // Check if blog with the same link already exists
    const existingBlogWithLink = await Blog.findOne({ link: validatedData.link });
    if (existingBlogWithLink) {
      return NextResponse.json({ error: "Blog with this link already exists" }, { status: 400 });
    }

    // Create and save blog
    const newBlog = new Blog({
      _id: new mongoose.Types.ObjectId(),
      ...validatedData
    });

    await newBlog.save();

    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

// DELETE to remove a blog
export async function DELETE(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }
    
    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID format" }, { status: 400 });
    }
    
    const deletedBlog = await Blog.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}




// PUT to update an existing blog
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    console.log(body);
    // Validate input with Zod
    const { _id:id, title, category, link, pinned, date } = BlogUpdateSchema.parse(body);
    
    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID format" }, { status: 400 });
    }
    
    // Check for duplicate title (excluding the current blog)
    if (title) {
      const existingBlogWithTitle = await Blog.findOne({ 
        title, 
        _id: { $ne: id }
      });
      
      if (existingBlogWithTitle) {
        return NextResponse.json({ error: "Blog with this title already exists" }, { status: 400 });
      }
    }
    
    // Check for duplicate link (excluding the current blog)
    if (link) {
      const existingBlogWithLink = await Blog.findOne({ 
        link, 
        _id: { $ne: id }
      });
      
      if (existingBlogWithLink) {
        return NextResponse.json({ error: "Blog with this link already exists" }, { status: 400 });
      }
    }
    
    //check if only one blog is pinned. not 2 blogs can be pinned for a particular category.
    if (pinned) {
      const existingPinnedBlog = await Blog.findOne({ category:category, pinned: true });
      if (existingPinnedBlog) {
        return NextResponse.json({ error: "Only one blog can be pinned at a time per category" }, { status: 400 });
      }
    }


    // Build update object with only provided fields
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (link !== undefined) updateData.link = link;
    if (pinned !== undefined) updateData.pinned = pinned;
    if (date !== undefined) updateData.date = new Date(date);
    
    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: "Blog updated successfully", 
      blog: updatedBlog 
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ZodError') {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}