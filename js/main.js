// $(document).bind('mobileinit', function () {
//    console.log('main.js')
// $('#favourite').click(function(){
//     console.log('clicked')
// })

// })



$(document).on("pagecontainerbeforeshow", function (){
 
  
    console.log( "ready!" );
    $('#favourite').on('click', function (){
        const x  = 'orchard'
        localStorage.setItem('fave', JSON.stringify(x))
    })
})



$(document).on('pagebeforeshow', '#properties', function(){
    const x = getProperties();
    for(i of x){
        console.log(i)
    }
  });



function  getProperties() {
    let properties = JSON.parse(localStorage.getItem('result'));
	return properties ;
}