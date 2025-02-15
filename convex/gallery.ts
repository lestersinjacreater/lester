import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//get all gallery images
export const getGalleryImages = query({
    handler: async (ctx) => {
      const images = await ctx.db.query("gallery").collect();
      return images;
    },
  });

  
  //create gallery image
export const createGalleryImage = mutation({
    args: {
      imageUrl: v.string(),
      caption: v.optional(v.string()),
      order: v.number(),
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("gallery", args);
    },
  });

  
  //update gallery image
export const updateGalleryImage = mutation({
    args: {
      id: v.id("gallery"),
      imageUrl: v.optional(v.string()),
      caption: v.optional(v.string()),
      order: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
      const { id, ...updates } = args;
      return await ctx.db.patch(id, updates);
    },
  });
  

  //delete gallery image
    export const deleteGalleryImage  = mutation({
     args: {
          id: v.id("gallery"),
     },
     handler: async (ctx, args) => {
          return await ctx.db.delete(args.id);
     },
     });