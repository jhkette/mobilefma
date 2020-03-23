// $(document).bind('mobileinit', function () {
//    console.log('main.js')
// $('#favourite').click(function(){
//     console.log('clicked')
// })

// })

//


$(document).on("pagecontainerbeforeshow", function() {

});

$(document).on("pagebeforeshow", "#properties", function() {
  $.get("../data/houses.json", function(result, status) {
   
    let h = "";
    $.each(result, function(i, v) {
      h += `<li> <a  href="orchard.html?post=${
        v.id
      }" data-transition="slidefade"> 
        ${v.name} 
        </a></li>`;
      h += `<li> <a href="orchard.html?post=${
        v.id
      }" data-transition="slidefade" > 
        ${v.shortdescription} 
        </a></li>`;
    });

    $("#houses").html(h);
  }).fail(function(status) {
    $("#houses").html(
      status.status + " error. There was an error retreiving data"
    );
  });
});

$(document).on("pagebeforeshow", "#orchard", function() {
  var urlParams = new URLSearchParams(window.location.search);
  const y = urlParams.get("post");

  $.get("../data/houses.json", function(result, status) {
   
    const p = result.filter(function(i) {
      return i.id == y;
    });
    // // add if else statement here to check if fave has been declared

    // console.log('this is' + p + result)
   
    $("#favourite").on("click", function() {
      addFaves(p);
    });
    $("#unfavourite").on("click", function() {
      removeFaves(p[0].id);
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
      console.log(fave)
      const found = faves.some((el) => {
        console.log(el)
        return el.id == fave[0].id});
      console.log(found)
      
      if (!found) {
        faves.push(fave[0]);
        localStorage.setItem("faves", JSON.stringify(faves));
      }
    }
    function removeFaves(id) {
      const faves = getFaves();
     
      const amendedFaves = faves.filter(function(fave) {
       
        return fave.id != id;
      });
      console.log(amendedFaves);
    
      localStorage.setItem("faves", JSON.stringify(amendedFaves));
    }

  })
  .fail(function(status) {
    console.log(status.status + " error. There was an error retreiving data");
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

[[{"id":1,"name":"Churchill ","thumbnail":"churchill.jpg","shortdescription":"From £345 per night"}],[{"id":1,"name":"Churchill ","thumbnail":"churchill.jpg","shortdescription":"From £345 per night"}],[{"id":1,"name":"Churchill ","thumbnail":"churchill.jpg","shortdescription":"From £345 per night"}]]