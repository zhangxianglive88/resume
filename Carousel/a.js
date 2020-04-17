var allButtons = $(".buttons > span")

for(let i=0; i<allButtons.length; i++){
    $(allButtons[i]).on('click', function(e){
        var index = $(e.target).index()
        var p = index  * -300
        $('#images').css("transform", "translateX(" + p + "px)")
        n = index
        activaButton(allButtons.eq(n))
    })
}

var n=0
var size=allButtons.length
playSlide(n%size)

var timeId = setTimer()

//设置闹钟
function setTimer(){
    return setInterval(function(){
        n+=1
        playSlide(n%size)
    }, 3000)
}

//点击谁就让他高亮
function activaButton($button){
    $button        
        .addClass("red")
        .siblings('.red').removeClass('red')
}

function playSlide(index){
    allButtons.eq(index).trigger("click")
}

//鼠标进入就停止播放
$('#play').on("mouseenter", ()=>{
    window.clearInterval(timeId)
})

//鼠标移出继续播放
$('#play').on("mouseleave", ()=>{
    timeId = setTimer()
})

