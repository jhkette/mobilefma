/* Code thats is run if page == properties */
$(document).on("pagecontainerbeforeshow", function () {
  const thisPage = $.mobile.pageContainer.pagecontainer('getActivePage' ).attr( 'id' );
  if(thisPage == 'properties'){ // if thisPage == properties run ...
    $.get("../data/houses.json", function(result, status) { // get data from json file
      let h = ""; // initialise variable with empty string
      $.each(result, function(i, v) { // for each result add html and data to to h variable
        h += `<li class="ui-li-has-thumb"><a href="orchard.html?post=${v.id}" data-transition="slidefade"> 
                <img src='../images/thumbs/${v.thumbnail}'>
                ${v.name}<p>Price: ${v.price}</p><p>Postcode: ${v.postcode}</p></a>
              </li>`;
      
      });

      $("#houses").html(h); // add h as as html to #houses listview
      $("#houses").listview('refresh');
    }, "json")
    .fail(function(status) { // if fetching data fails send error message
      $("#houses").html(
        status.status + " error. There was an error retreiving data"
      );
    });
  }
});
