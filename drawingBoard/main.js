var canvas = document.getElementById("canvas")
var context = canvas.getContext('2d')
var lineWidth = 5

xxx()

//如果用户移动了窗口得宽高，则必须重新设置canvas的宽高
window.onresize = function(){
  xxx()
}

red.onclick = function(){
  context.strokeStyle = 'red'
  context.fillStyle = 'red'
  red.classList.add("active")
  green.classList.remove("active")
  blue.classList.remove("active")
}

green.onclick = function(){
  context.strokeStyle = 'green'
  context.fillStyle = 'green'
  red.classList.remove("active")
  green.classList.add("active")
  blue.classList.remove("active")
}

blue.onclick = function(){
  context.strokeStyle = 'blue'
  context.fillStyle = 'blue'
  red.classList.remove("active")
  green.classList.remove("active")
  blue.classList.add("active")
}

thin.onclick = function(){
  lineWidth = 5
}

thick.onclick = function(){
  lineWidth = 10
}

var using = false
var lastPoint = {x:undefined, y: undefined}

//特性检测
//不是检测你是手机还是pc，而是通过移动端和pc端对“ontouchstart”是否支持的特性来判断
//pc端：
if(document.body.ontouchstart !== undefined){
  //触屏设备
  canvas.ontouchstart = function(a){
    using = true
    var x = a.touches[0].clientX
    var y = a.touches[0].clientY
    console.log(x)
    console.log(y)
    if(eraserEnabled){
      context.clearRect(x, y, 10, 10)
    }else{
      lastPoint = {"x": x, "y": y}
      drawLine(x, y, 1)
    }
  }

  canvas.ontouchmove = function(a){
    var x = a.touches[0].clientX
    var y = a.touches[0].clientY
    if(!using){ return }
    if(eraserEnabled){
      context.clearRect(x-5, y-5, 10, 10)
    }else{
      var newPoint = {"x": x, "y": y}
      drawCircle(x,y,1)
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }

  canvas.ontouchend = function(){
    // console.log("摸完了")
    using = false
  }

}else{
  //非触屏设备
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


//绘制一条直线
function drawLine(x1, y1, x2, y2){
  context.beginPath()
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

//绘制圆
function drawCircle(x, y, radius){
  context.beginPath()
  // context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

/******/
//是否使用橡皮擦
var eraserEnabled = false
brush.onclick = function(){
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}

clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function(){
  var url = canvas.toDataURL("image/png")
  var a = document.createElement("a")
  document.body.appendChild(a)
  a.href = url
  a.download = 'picture'
  a.target = "_blank"
  a.click()
}