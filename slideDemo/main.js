init()

let n = 1
let timer = setInterval(()=>{
    $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass("leave").addClass('enter')
    })
    $(`.images > img:nth-child(${x(n+1)})`).removeClass('enter').addClass("current")
    n += 1
}, 3000)

// 当切换至别的页面时清空闹钟，待切回到页面之后继续轮播
document.addEventListener("visibilitychange", function(e){
    if(document.hidden){
        window.clearInterval(timer)
    }else{
        timer = setInterval(()=>{
            $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
            .one('transitionend',(e)=>{
                $(e.currentTarget).removeClass("leave").addClass('enter')
            })
            $(`.images > img:nth-child(${x(n+1)})`).removeClass('enter').addClass("current")
            n += 1
        }, 3000)
    }
})




function x(n){
    return n = (n%3!==0) ? n%3 : 3
}

// 初始化状态
function init(){
    $('.images > img:nth-child(1)').addClass('current')
    $('.images > img:nth-child(2)').addClass('enter')
    $('.images > img:nth-child(3)').addClass('enter')
}

