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
    let h =''
    for(i of x){
        h += '<p>' + i.name + '</p>'
        h +=  '<p>' + i.shortdescription + '</p>'
    }
    console.log(h)
    $("#houses").html(h)
  });



function  getProperties() {
    let properties = JSON.parse(localStorage.getItem('result'));
	return properties ;
}


// $(document).on("pagecontainerbeforeshow", function (e, ui) {
// 	let page = ui.toPage[0].id;
// 	if( page == "five" ) {
// 		$.get("data/hotels.json", function(result, status) {
// 		let hotel = "";
// 		for (let i = 0; i < result.length; i++) {
// 			hotel += "<li><a href='hotel.html?id=" + 
// 			result[i].id + 
// 			"'><img src='images/" + 
// 			result[i].thumbnail + 
// 			"'>" + 
// 			result[i].name + 
// 			"<p>" + 
// 			result[i].shortdescription +
// 			"</p></a></li>";
// 		}
// 		$("#hotellist").html(hotel).listview("refresh");
// 		}, "json");	
// 	}
// });