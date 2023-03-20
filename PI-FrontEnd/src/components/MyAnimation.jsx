import { useRef, useEffect } from "react";

export function MyAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set up canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animation loop
    let angle = 1;
    function animate() {
      angle += 0.006; // Decreased the angle increment to slow down the animation

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw slow waves
      context.strokeStyle = "red";
      context.lineWidth = 7;
      context.beginPath();
      for (let i = 0; i < canvas.width; i += 10) {
        context.moveTo(i, canvas.height / 2);
        context.lineTo(
          i + 10,
          canvas.height / 2 + Math.sin(i / 50 + angle) * 50
        ); // Changed to draw a slow wave
      }
      context.stroke();

      // Update animation
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / 30); // Using 30 FPS for this example, but you can adjust as needed
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        opacity: 0.1,
        width: "100%",
        height: "100%",
        zIndex: -1,
        objectFit: "cover",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

