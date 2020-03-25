// $(document).bind('mobileinit', function () {
//    console.log('main.js')
// $('#favourite').click(function(){
//     console.log('clicked')
// })

// })

//

$(document).on("pagebeforeshow", "#orchard", function() {
  $("#unfavourite").hide();
  var urlParams = new URLSearchParams(window.location.search);
  const y = urlParams.get("post");
  const allfaves = JSON.parse(localStorage.getItem("faves"));
  const marked = allfaves.some(f => f.id == y);

  $.get("../data/houses.json", function(result, status) {
    const p = result.filter(i => i.id == y);
    console.log(p)
    $("#room-info").html(p[0].longdescription)
    $("#area-info").html(p[0].area)
    if (marked) {
      $("#favourite").hide();
      $("#unfavourite").show();
      $("#unfavourite").on("tap", function() {
        removeFaves(p[0].id);
      });
    } else {
      $("#unfavourite").hide();
      $("#favourite").on("tap", function() {
        addFaves(p);
      });
    }
  }).fail(function(status) {
    console.log(status.status + " error. There was an error retreiving data");
  });

  function getFaves() {
    let faves;
    if (!localStorage.getItem("faves")) {
      faves = [];
    } else {
      faves = JSON.parse(localStorage.getItem("faves"));
    }
    return faves;
  }

  function addFaves(fave) {
    const faves = getFaves();
    const found = faves.some(el => el.id === fave[0].id);
    if (!found) {
      faves.push(fave[0]);
      localStorage.setItem("faves", JSON.stringify(faves));
    }
  }
  function removeFaves(id) {
    const faves = getFaves();

    const amendedFaves = faves.filter(fave => fave.id != id);
    console.log(amendedFaves);

    localStorage.setItem("faves", JSON.stringify(amendedFaves));
  }
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

// class Store {
//   static getBooks() {
//     let books;
//     if(localStorage.getItem('books') === null) {
//       books = [];
//     } else {
//       books = JSON.parse(localStorage.getItem('books'));
//     }

//     return books;
//   }

//   static displayBooks() {
//     const books = Store.getBooks();

//     books.forEach(function(book){
//       const ui  = new UI;

//       // Add book to UI
//       ui.addBookToList(book);
//     });
//   }

//   static addBook(book) {
//     const books = Store.getBooks();

//     books.push(book);

//     localStorage.setItem('books', JSON.stringify(books));
//   }

//   static c
//     localStorage.setItem('books', JSON.stringify(books));
//   }
// }

// function removeFaves(id) {
//   const faves = getFaves();

//   const amendedFaves = faves.filter(function() {
//     return faves.id != id;
//   });
//   console.log(amendedFaves);

//   localStorage.setItem("faves", JSON.stringify(amendedFaves));
// }

[
  [
    {
      id: 1,
      name: "Churchill ",
      thumbnail: "churchill.jpg",
      shortdescription: "From £345 per night"
    }
  ],
  [
    {
      id: 1,
      name: "Churchill ",
      thumbnail: "churchill.jpg",
      shortdescription: "From £345 per night"
    }
  ],
  [
    {
      id: 1,
      name: "Churchill ",
      thumbnail: "churchill.jpg",
      shortdescription: "From £345 per night"
    }
  ]
];
