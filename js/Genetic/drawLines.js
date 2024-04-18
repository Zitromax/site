function drawWay(way, strokeStyle) {
  ctx.beginPath();
  ctx.moveTo(points[way[0]].x, points[way[0]].y);

  for (let i = 1; i != way.length; i++) {
    ctx.lineTo(points[way[i]].x, points[way[i]].y);
  }

  ctx.closePath();

  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}
