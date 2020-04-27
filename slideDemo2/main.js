let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides() // 做一些假的图片
$slides.css({transform:'translateX(-500px)'}) // 设置图片初始位置
bindEvents()
$(next).on('click', function(){
    goToSlide(current + 1)
})
$(previous).on('click', function(){
    goToSlide(current - 1)
})

let timer = setInterval(()=>{
    goToSlide(current + 1)
}, 5000)

$('.window').on('mouseenter', ()=>{
    window.clearInterval(timer)
}).on('mouseleave', ()=>{
    timer = setInterval(()=>{
        goToSlide(current + 1)
    }, 5000)
})

function bindEvents(){

    $('#buttonWrapper').on('click', 'button', function(e){
        let $buttons = $(e.currentTarget)
        let index = $buttons.index()
        goToSlide(index)
    })
}

function goToSlide(index){
    if(index > $buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length-1
    }
    
    if(current === $buttons.length -1 && index === 0){
        // 最后一张到第一张
        $slides.css({transform:`translateX(${- ($buttons.length + 1) * 500}px)`})
        .one('transitionend', ()=>{
            $slides.hide()
               .offset()  
            $slides.css({transform:`translateX(${- (index + 1) * 500}px)`})
                .show()
        })
    }else if(current === 0 && index === $buttons.length - 1){
        // 第一张到最后一张
        $slides.css({transform:'translateX(0px)'})
        .one('transitionend', ()=>{
            $slides.hide()
               .offset()  
            $slides.css({transform:`translateX(${- (index + 1) * 500}px)`})
                .show()
        })
    }else {
        $slides.css({transform:`translateX(${- (index + 1) * 500}px)`})
    }
    current = index
}

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
