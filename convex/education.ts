import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


//get all education
export const getAllEducation = query({
  handler: async (ctx) => {
    const records = await ctx.db.query("education").collect();
    return records;
  },
});

//create education
export const createEducation = mutation({
  args: {
    institution: v.string(),
    degree: v.string(),
    fieldOfStudy: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("education", args);
  },
});

//update education
export const updateEducation = mutation({
  args: {
    id: v.id("education"),
    institution: v.optional(v.string()),
    degree: v.optional(v.string()),
    fieldOfStudy: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

//delete education
export const deleteEducation = mutation({
    args: {
        id: v.id("education"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
    });
