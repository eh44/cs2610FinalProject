import React, { useEffect, useRef, useState } from "react";
import { makeRequest } from "../utils/make_request";
import './Game1.css'
export function Game1() {
  const canvasRef = useRef(null);
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const [RectX, setRectX] = useState(0);
  const [score, setScore] = useState(0);
  function reset(){
    window.location.reload();
  }
  async function handleSubmit(score) {
    console.log(score);
    await makeRequest("/api/best_score/", "post", {
      score
    });
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const game = canvas.getContext("2d");
 
    let x = 150;
    let y = 50;
    let rectX = RectX;
    let velocityX = 1;
    const move = (event) => {
        if (event.key === 'ArrowDown') {
          y += 10;
        } else if (event.key === 'ArrowUp') {
          y -= 10;
        }
    }
    function isCircleRectCollision(circle, rect) {
        let closestX = clamp(circle.x, rect.x, rect.x + rect.width);
        let closestY = clamp(circle.y, rect.y, rect.y + rect.height);
      
        let distanceX = circle.x - closestX;
        let distanceY = circle.y - closestY;
      
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;
        return distanceSquared < circle.radius * circle.radius;
      }
    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
      }
    let rectHeights = [];
    for (let i = 0; i < 32; i++) {
        rectHeights.push(Math.random() * -50-100); 
      }
      
      const drawFrame = () => {
        game.clearRect(0, 0, canvas.width, canvas.height);
        game.beginPath();
        game.fillStyle = 'black';
        const circle = { x: x, y: y, radius: 10};
        rectX+=velocityX;
        velocityX+=.001
        
        game.arc(circle.x,circle.y,circle.radius,0,2*Math.PI);
        
        
        for (let i = 0; i < rectHeights.length; i++) {
            const height = rectHeights[i];
            const rectUpper = { x: (-i * 75 + rectX)%2400-19, y: height, width: 20, height: 250 };
            const rectLower= { x: (-i * 75 + rectX)%2400-19, y: height+300, width: 20, height: 250 };
            if ((-i * 75 + rectX)%2400 > 500) {
                rectHeights[i] = Math.random() * -50-100;
            }
          game.rect(rectUpper.x, rectUpper.y, rectUpper.width, rectUpper.height);
          game.rect(rectLower.x, rectLower.y, rectLower.width, rectLower.height);
          game.fill();

          if(isCircleRectCollision(circle,rectUpper) ||isCircleRectCollision(circle, rectLower)){
            setScore(parseInt(rectX/75, 10));
            handleSubmit(parseInt(rectX/75, 10));
            setIsAnimationStopped(true);
            return;
          } 
        }
            requestAnimationFrame(drawFrame);
      };
      
    document.addEventListener('keydown', move);

    drawFrame();
    return () => {
      document.removeEventListener('keydown', move);
    };
  }, []);

  return (
    <div className="canvas-container">
     
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
      ></canvas>
       {isAnimationStopped && (
        <div className="score-container">
          Score: {score}
          <button onClick={reset}>Play Again?</button>
        </div>
      )}
    </div>
  );
}
