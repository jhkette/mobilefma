
$(document).on("pagecontainerbeforeshow", function (e, ui) {
  const thisPage = $.mobile.pageContainer.pagecontainer('getActivePage' ).attr( 'id' );
  if(thisPage == 'properties'){
  $.get("../data/houses.json", function(result, status) {
    let h = "";
    $.each(result, function(i, v) {
      h += `<li class="ui-li-has-thumb"> <img src='../images/thumbs/${v.thumbnail}'> 
      <div class="list-flex"><a  href="orchard.html?post=${v.id}" data-transition="slidefade">${v.name}</a><p>Price: ${v.price}</p><p>Postcode: ${v.postcode}</p>  <div></li>`;
     
    });

    $("#houses").html(h);
    $("#houses").listview('refresh');
  }, "json").fail(function(status) {
    $("#houses").html(
      status.status + " error. There was an error retreiving data"
    );
  });
}
});
