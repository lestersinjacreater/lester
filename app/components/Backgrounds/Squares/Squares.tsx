"use client"; // Ensures this component runs on the client in Next.js

import React, { useRef, useEffect } from "react";

// -------------------------------
// Type Definitions
// -------------------------------

// Allows stroke styles to be color strings, gradients, or patterns.
type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

// Represents an (x, y) offset, used for animating grid movement.
interface GridOffset {
  x: number;
  y: number;
}

// Props for customizing the Squares component.
interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left"; // Movement direction.
  speed?: number;              // Movement speed of the grid.
  borderColor?: CanvasStrokeStyle;    // Color for the grid’s border lines.
  squareSize?: number;                // Size of each grid square (in pixels).
  hoverFillColor?: CanvasStrokeStyle; // Color to fill a square when hovered.
  defaultFillColor?: CanvasStrokeStyle; // Color to fill a square by default (when not hovered).
  className?: string;          // Additional CSS classes.
}

// -------------------------------
// Squares Component
// -------------------------------
const Squares: React.FC<SquaresProps> = ({
  direction = "right",         // Default direction is right.
  speed = 1,                   // Default movement speed is 1.
  borderColor = "#00fcff",     // Bright teal for the grid lines.
  squareSize = 40,             // Each square is 40px.
  hoverFillColor = "#00fcff",  // Color for hovered squares, same bright teal by default.
  defaultFillColor = "#001f2a",// Dark color for non-hovered squares.
  className = "",
}) => {
  // A ref to the <canvas> DOM element.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Stores the requestAnimationFrame ID, so we can cancel it later.
  const requestRef = useRef<number | null>(null);

  // Refs to track how many squares fit in each dimension.
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);

  // Grid offset for animating the grid’s movement.
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });

  // Tracks which grid square the mouse is currently hovering over.
  const hoveredSquareRef = useRef<GridOffset | null>(null);

  // -------------------------------
  // useEffect for Setup & Cleanup
  // -------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Function to resize the canvas and recalculate grid dimensions.
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Calculate how many squares fit, plus one extra row/column.
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    // Listen for window resize to adjust canvas size dynamically.
    window.addEventListener("resize", resizeCanvas);
    // Initial setup call.
    resizeCanvas();

    // -------------------------------
    // Function: drawGrid
    // -------------------------------
    // Clears the canvas, then draws each square in the grid with the current offset.
    const drawGrid = () => {
      if (!ctx) return;

      // Clear the entire canvas before redrawing.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Compute the starting X/Y for the grid based on the current offset.
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      // Loop over the canvas area to draw squares.
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          // Calculate the actual position of this square on screen.
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          // Check if this square is hovered.
          const isHovered =
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y;

          // Fill the square:
          // - If hovered, use hoverFillColor
          // - Otherwise, use defaultFillColor
          ctx.fillStyle = isHovered ? hoverFillColor : defaultFillColor;
          ctx.fillRect(squareX, squareY, squareSize, squareSize);

          // Draw the square's border in the neon teal color.
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // -------------------------------
      // Neon-Inspired Gradient Overlay
      // -------------------------------
      // Creates a radial gradient from the center outward,
      // layering deeper blues/purples at the edges.
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,           // Center X
        canvas.height / 2,          // Center Y
        0,                          // Inner radius
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2 // Outer radius
      );
      // Start with a transparent center to let the neon lines show.
      gradient.addColorStop(0, "rgba(0, 0, 30, 0)");
      // Fade into a deeper purple/blue at the edges for a futuristic vibe.
      gradient.addColorStop(0.6, "rgba(10, 0, 40, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 80, 0.7)");

      // Apply the gradient as a fill across the entire canvas.
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // -------------------------------
    // Function: updateAnimation
    // -------------------------------
    // Moves the grid offset based on the chosen direction and speed, then redraws the grid.
    const updateAnimation = () => {
      // Ensure we don't go below a minimum speed.
      const effectiveSpeed = Math.max(speed, 0.1);

      // Adjust the grid offset according to the direction prop.
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          // Move diagonally: shift both x and y offsets.
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      // Redraw the grid after updating the offset.
      drawGrid();
      // Schedule the next animation frame.
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    // -------------------------------
    // Mouse Event Handlers
    // -------------------------------
    // Tracks which square is under the mouse, updating hoveredSquareRef.
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Determine the starting position of the grid in the current view.
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      // Calculate the indices of the hovered square.
      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      // Update hoveredSquareRef only if the hovered square has changed.
      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    // Clear hovered square data when the mouse leaves the canvas.
    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    // Attach event listeners for mouse movement/leave.
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Start the animation loop.
    requestRef.current = requestAnimationFrame(updateAnimation);

    // -------------------------------
    // Cleanup on Unmount
    // -------------------------------
    return () => {
      // Remove resize event listener.
      window.removeEventListener("resize", resizeCanvas);
      // Cancel any ongoing animation frames.
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      // Remove mouse event listeners.
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, defaultFillColor]);

  // Return a full-width, full-height canvas that uses the provided className for styling.
  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  );
};

export default Squares;
