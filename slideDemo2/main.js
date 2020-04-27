let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides() // 做一些假的图片
$slides.css({transform:'translateX(-500px)'}) // 设置图片初始位置
bindEvents() // 绑定事件

function bindEvents(){
    $buttons.eq(0).on('click', ()=>{
        if(current == 2){
            console.log("说明你是从最后一张到第一张")
            $slides.css({transform:'translateX(-2000px)'})
            .one('transitionend', ()=>{
                $slides.hide()
                   .offset()  
                $slides.css({transform:'translateX(-500px)'})
                    .show()
            })
        }else{
            $slides.css({transform:'translateX(-500px)'})
        }
        current = 0
    })
    
    $buttons.eq(1).on('click', ()=>{
        $slides.css({transform:'translateX(-1000px)'})
        current = 1
    })
    
    $buttons.eq(2).on('click', ()=>{
        if(current == 0){
            $slides.css({transform:'translateX(0px)'})
            .one('transitionend', ()=>{
                $slides.hide()
                   .offset()  
                $slides.css({transform:'translateX(-1500px)'})
                    .show()
            })
        }else{
            $slides.css({transform:'translateX(-1500px)'})
        }
        current = 2
    })
}

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
