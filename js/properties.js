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
  }, "json").fail(function(status) {
    $("#houses").html(
      status.status + " error. There was an error retreiving data"
    );
  });
});
