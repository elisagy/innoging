import { useEffect, useRef, useState } from 'react';
import { Button, Stack } from '@mui/material';
import './App.css';

function App() {
  const [shapes, setShapes] = new useState([]);
  const [chosenShape, setChosenShape] = new useState("line");
  const [chosenColor, setChosenColor] = new useState("red");
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = canvas.parentNode.clientWidth;
    ctx.canvas.height = canvas.parentNode.clientWidth / 3;

    let startX, startY;
    canvas.onmousedown = function (e) {
      startX = e.offsetX;
      startY = e.offsetY;
      setShapes([...shapes, { startX, startY, endX: startX, endY: startY, chosenShape, chosenColor }]);
    }
    canvas.onmousemove = function (e) {
      if (e.buttons) {
        shapes[shapes.length - 1].endX = e.offsetX;
        shapes[shapes.length - 1].endY = e.offsetY;
        setShapes([...shapes]);
      }
    }
  });

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    for (const shape of shapes) {
      ctx.beginPath();

      switch (shape.chosenShape) {
        case "line":
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          break;
        case "triangle":
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.startX, shape.endY);
          ctx.lineTo(shape.endX, shape.endY)
          ctx.lineTo(shape.startX, shape.startY);
          break;
        case "rectangle":
          ctx.rect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
          break;
        case "circle":
          ctx.arc((shape.startX + shape.endX) / 2, (shape.startY + shape.endY) / 2, Math.abs(shape.startX + shape.startY - shape.endX - shape.endY) / 2, 0, 2 * Math.PI);
          break;
        default:
          break;
      }

      ctx.fillStyle = shape.chosenColor;
      ctx.fill();
    }
  }, [shapes, chosenShape, chosenColor]);

  return (
    <div className="App">
      <div style={{ color: "white", marginBottom: "1em", textAlign: "left", width: "100%" }}>
        Chosen shape: {chosenShape}
        <br />
        Chosen color: {chosenColor}
      </div>
      <canvas id="myCanvas" width="300" height="150" ref={canvasRef}>Your browser does not support the HTML5 canvas tag.</canvas>
      <br />
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => setShapes([])}>Reset</Button>
        <Button variant="contained" onClick={async () => setChosenShape(await (await fetch("/getRandomShape")).text())}>Choose Random Shape</Button>
        <Button variant="contained" onClick={async () => setChosenColor(await (await fetch("/getRandomColor")).text())}>Choose Random Color</Button>
      </Stack>
      {JSON.stringify(shapes, null, 2)}
    </div>
  );
}

export default App;
