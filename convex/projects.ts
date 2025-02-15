import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


//get all projects
export const getAllProjects = query({
    handler: async (ctx) => {
      const projects = await ctx.db.query("projects").collect();
      return projects;
    },
  });
  

  //create project
  export const createProject = mutation({
    args: {
      title: v.string(),
      description: v.string(),
      imageUrl: v.string(),
      deployedLink: v.string(),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("projects", args);
    },
  });
  

  //delete project
  export const updateProject = mutation({
    args: {
      id: v.id("projects"),
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      deployedLink: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { id, ...updates } = args;
      return await ctx.db.patch(id, updates);
    },
  });
  

  //delete project
    export const deleteProject = mutation({
        args: {
            id: v.id("projects"),
        },
        handler: async (ctx, args) => {
            return await ctx.db.delete(args.id);
        },
        });