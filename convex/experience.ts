import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//get all experience
export const getAllExperience = query({
    handler: async (ctx) => {
      const experiences = await ctx.db.query("experience").collect();
      return experiences;
    },
  });
  

  //create experience
  export const createExperience = mutation({
    args: {
      company: v.string(),
      role: v.string(),
      startDate: v.string(),
      endDate: v.string(),
      responsibilities: v.array(v.string()),
      description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("experience", args);
    },
  });
  

  //update experience
  export const updateExperience = mutation({
    args: {
      id: v.id("experience"),
      company: v.optional(v.string()),
      role: v.optional(v.string()),
      startDate: v.optional(v.string()),
      endDate: v.optional(v.string()),
      responsibilities: v.optional(v.array(v.string())),
      description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { id, ...updates } = args;
      return await ctx.db.patch(id, updates);
    },
  });

  //delete experience
export const deleteEeperience = mutation({
    args: {
        id: v.id("experience"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
    });

  
  