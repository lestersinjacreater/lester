import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
 // Users table: Simple admin account for authentication.
  users: defineTable({
    username: v.string(),
    email: v.string(),
    clerkId: v.string(), // Clerk ID for authentication.
    name: v.optional(v.string()),
    role: v.union(v.literal("admin")), // Only admin for your portfolio.
  }).index("by_clerk_id", ["clerkId"]), // Index for Clerk ID lookups.
  
  // Education table: Stores academic background details.
  education: defineTable({
    institution: v.string(),
    degree: v.string(),
    fieldOfStudy: v.string(),
    startDate: v.string(), // You can change to v.number() if you prefer timestamps.
    endDate: v.string(),
    description: v.optional(v.string()),
  }),

  // Experience table: Captures work experience information.
  experience: defineTable({
    company: v.string(),
    role: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    responsibilities: v.array(v.string()),
    description: v.optional(v.string()),
  }),

  // Projects table: Lists your previous projects.
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    deployedLink: v.string(),
  }),

  // Optional ProjectTechStack table: Associates technologies with a project.
  // Use this if you want to store multiple tech entries per project.
  projectTechStack: defineTable({
    projectId: v.id("projects"),
    technology: v.string(),
  }).index("by_project_id", ["projectId"]),

  // Testimonials table: Contains feedback or testimonials.
  testimonials: defineTable({
    author: v.string(),
    role: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
  }),

  // ApproachPhases table: Outlines the phases of your development approach.
  approachPhases: defineTable({
    phaseName: v.string(),
    description: v.string(),
    order: v.number(), // Determines the display order.
  }),

  // Gallery table: Holds images for the modal slideshow.
  gallery: defineTable({
    imageUrl: v.string(),
    caption: v.optional(v.string()),
    order: v.number(), // Determines the display order.
  }),
});
