var n=0
$('div').on('click', function(e){
  setTimeout(()=>{
    $(e.currentTarget).addClass('active')
  }, n * 500)
  n+=1
})