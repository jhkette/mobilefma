// $(document).bind('mobileinit', function () {
//    console.log('main.js')
// $('#favourite').click(function(){
//     console.log('clicked')
// })

// })

$(document).on("pagecontainerbeforeshow", function() {
  console.log("ready!");
  $("#favourite").on("click", function() {
    const x = "orchard";
    localStorage.setItem("fave", JSON.stringify(x));
  });
});

$(document).on("pagebeforeshow", "#properties", function() {
  $.get("../data/houses.json", function(result, status) {
    console.log(result);
    let h = "";
    $.each(result, function(i, v) {
      h +=
        `<li> <a  href="orchard.html?post=${v.id}" data-transition="slidefade"> 
        ${v.name} 
        </a></li>`;
      h +=
        `<li> <a href="orchard.html?post=${v.id}" data-transition="slidefade" > 
        ${v.shortdescription} 
        </a></li>`;
    });

    $("#houses").html(h);
  }).fail(function(status) {
    const h = status.status + " error. There was an error retreiving data";
    $("#houses").html(h);
  });
});

$(document).on("pagebeforeshow", "#orchard", function() {
  var urlParams = new URLSearchParams(window.location.search);
  const y = urlParams.get("post");

  $.get("../data/houses.json", function(result, status) {
    const p = result.filter(function(i) {
      return i.id == y;
    });
    console.log(p)

  })
  .fail(function(status) {
    const h = status.status + " error. There was an error retreiving data";
    console.log(h);
  });
});

// FOR PARAMS

//   $("#artdetailpage").live("pageshow", function(e) {
//     var query = window.location.search;
//     query = query.replace("?id=","");
//     //query is now an ID, do stuff with it...
//   });

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
