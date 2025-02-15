import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//get all testimonials
export const getAllTestimonials = query({
    handler: async (ctx) => {
      const testimonials = await ctx.db.query("testimonials").collect();
      return testimonials;
    },
  });
  

  //create testimonial
  export const createTestimonial = mutation({
    args: {
      author: v.string(),
      role: v.string(),
      content: v.string(),
      imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("testimonials", args);
    },
  });
  

  //update testimonial
  export const updateTestimonial = mutation({
    args: {
      id: v.id("testimonials"),
      author: v.optional(v.string()),
      role: v.optional(v.string()),
      content: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { id, ...updates } = args;
      return await ctx.db.patch(id, updates);
    },
  });

  //delete testimonial
    export const deleteTestimonial = mutation({
        args: {
            id: v.id("testimonials"),
        },
        handler: async (ctx, args) => {
            return await ctx.db.delete(args.id);
        },
        });
  