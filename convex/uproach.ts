import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


//get all approach phases
export const getAllApproachPhases = query({
    handler: async (ctx) => {
      const phases = await ctx.db.query("approachPhases").collect();
      return phases;
    },
  });

  
  //create approach phase
export const createApproachPhase = mutation({
    args: {
      phaseName: v.string(),
      description: v.string(),
      order: v.number(),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("approachPhases", args);
    },
  });

  //update approach phase
export const updateApproachPhase = mutation({
    args: {
      id: v.id("approachPhases"),
      phaseName: v.optional(v.string()),
      description: v.optional(v.string()),
      order: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
      const { id, ...updates } = args;
      return await ctx.db.patch(id, updates);
    },
  });

  //delete approach phase
   export const deleteApproachPhase  = mutation({
    args: {
        id: v.id("approachPhases"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
    });
  