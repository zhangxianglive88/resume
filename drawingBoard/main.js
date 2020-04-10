var canvas = document.getElementById("canvas")
var context = canvas.getContext('2d')

xxx()

//如果用户移动了窗口得宽高，则必须重新设置canvas的宽高
window.onresize = function(){
  xxx()
}

listenToMouse(canvas)


/****/
function listenToMouse(canvas){
  var using = false
  var lastPoint = {x:undefined, y: undefined}

  canvas.onmousedown = function(a){
    using = true
    var x = a.clientX
    var y = a.clientY
    if(eraserEnabled){
      context.clearRect(x, y, 10, 10)
    }else{
        lastPoint = {"x": x, "y": y}
        drawLine(x, y, 1)
    }

  }

  canvas.onmousemove = function(a){
    var x = a.clientX
    var y = a.clientY
    if(!using){ return }
    if(eraserEnabled){
        context.clearRect(x-5, y-5, 10, 10)
    }else{
        var x = a.clientX
        var y = a.clientY
        var newPoint = {"x": x, "y": y}
        drawCircle(x,y,1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
  }

  canvas.onmouseup = function(){
  using = false
  }
}


//获取页面高度
function xxx(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}

//
function setCanvasSize(){
  
}

//绘制一条直线
function drawLine(x1, y1, x2, y2){
  context.beginPath()
  context.strokeStyle = 'black'
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

//绘制圆
function drawCircle(x, y, radius){
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

/******/


//是否使用橡皮擦
var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
  actions.className = "actions x"
}

brush.onclick = function(){
  eraserEnabled = false
  actions.className = "actions"
}


