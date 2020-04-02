
$(document).on("pagecontainerbeforeshow", function (e, ui) {
  const thisPage = $.mobile.pageContainer.pagecontainer('getActivePage' ).attr( 'id' );
  if(thisPage == 'properties'){
  $.get("../data/houses.json", function(result, status) {
    let h = "";
    $.each(result, function(i, v) {
      h += `<li class="ui-li-has-thumb"> <a  href="orchard.html?post=${v.id}" data-transition="slidefade">${v.name}</a></li>`;
      h += `<li class="ui-li-has-thumb"> <a href="orchard.html?post=${v.id}" data-transition="slidefade">${v.shortdescription} </a></li>`;
    });

    $("#houses").html(h);
  }, "json").fail(function(status) {
    $("#houses").html(
      status.status + " error. There was an error retreiving data"
    );
  });
}
});
