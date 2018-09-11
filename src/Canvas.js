import React, {Component} from 'react';

import './Canvas.css';

var hangmanDraw = []
hangmanDraw[0] = new Path2D()
hangmanDraw[0].moveTo(30, 300);
hangmanDraw[0].lineTo(30, 30);
hangmanDraw[1] = new Path2D()
hangmanDraw[1].moveTo(30, 30);
hangmanDraw[1].lineTo(180, 30);
hangmanDraw[2] = new Path2D()
hangmanDraw[2].moveTo(90, 30);
hangmanDraw[2].lineTo(30, 90);
hangmanDraw[3] = new Path2D()
hangmanDraw[3].moveTo(180, 30);
hangmanDraw[3].lineTo(180, 90);
hangmanDraw[4] = new Path2D()
hangmanDraw[4].moveTo(200, 110)
hangmanDraw[4].arc(180, 110, 20, 0, Math.PI * 2, true);
hangmanDraw[5] = new Path2D()
hangmanDraw[5].moveTo(180, 130);
hangmanDraw[5].lineTo(180, 180);
hangmanDraw[6] = new Path2D()
hangmanDraw[6].moveTo(180, 130);
hangmanDraw[6].lineTo(210, 160);
hangmanDraw[7] = new Path2D()
hangmanDraw[7].moveTo(180, 130);
hangmanDraw[7].lineTo(150, 160);
hangmanDraw[8] = new Path2D()
hangmanDraw[8].moveTo(180, 180);
hangmanDraw[8].lineTo(210, 210);
hangmanDraw[9] = new Path2D()
hangmanDraw[9].moveTo(180, 180);
hangmanDraw[9].lineTo(150, 210);

class Canvas extends Component {
  state = {
    errors: this.props.errors
  }
  componentWillReceiveProps({ errors }) {
    this.setState({ errors })
  }
  componentDidUpdate() {
    var canvas = document.getElementById("drawHangman")
    var ctx = canvas.getContext("2d")
    var errors = this.state.errors

    ctx.strokeStyle = "#222222"
    ctx.lineWidth = 5

    ctx.clearRect(0, 0, 300, 300)

    for (let i=0; i < errors; i++) {
      ctx.stroke(hangmanDraw[i])
    }

  }
  render() {
    return (
      <canvas id="drawHangman" width="300" height="300">{this.state.errors}</canvas>
    )
  }
}

export default Canvas
