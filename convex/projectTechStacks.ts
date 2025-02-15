import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//get all project tech stack
export const getProjectTechStackByProject = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
      const techStack = await ctx.db
        .query("projectTechStack")
        .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId))
        .collect();
      return techStack;
    },
  });
  
  //add tech to project
  export const addTechToProject = mutation({
    args: {
      projectId: v.id("projects"),
      technology: v.string(),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("projectTechStack", args);
    },
  });
  