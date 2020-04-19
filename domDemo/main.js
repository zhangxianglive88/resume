// clickMe.addEventListener('click',()=>{
//   popover.style.display="block"
// })

// wrapper.addEventListener('click',(e)=>{
//   e.stopPropagation()
// })

// document.addEventListener('click',()=>{
//   popover.style.display="none"
// })

$(clickMe).on('click', function(){
  console.log('show')
  $(popover).show()
  setTimeout(()=>{
    console.log('添加one click')  
    $(document).one('click', function(){
    console.log('我觉得这里不会执行')
    $(popover).hide()
    })
  }, 0)
})

// $(wrapper).on('click', function(e){
//   e.stopPropagation()
// })