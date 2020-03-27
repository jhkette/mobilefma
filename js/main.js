

$(document).on("pagebeforeshow", "#orchard", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postid = urlParams.get("post");
  getMarked(postid);
  const popupwidth = $(window).width() * 0.9;

  // use counter as a value for the array.
  $.get("../data/houses.json", function (result, status) {
    const p = result.filter(i => i.id == postid);
    $("#popupImage").css('width', popupwidth)
    let counter = 1;

    function getImage(counter) {
      return newImage = "'../images/large/" + p[0].large[counter] + "'";  
    }
    $("#popupImage").css('background-image', 'url(' + getImage(counter) + ')')

    $("#popupImage").on('swipeleft', function () {

      switch (true) {
        case counter == 1:

          counter--;
          $("#popupImage").css('background-image', 'url(' + getImage(counter) + ')')
          $("#right").fadeOut();

          break;

        case counter == 2:

          counter--;
          $("#popupImage").css('background-image', 'url(' + getImage(counter) + ')')
          $("#left").fadeIn();
          $("#right").fadeIn();

          break;

        case counter == 0:
          break;
      }

    })
    $("#popupImage").on('swiperight', function () {
      switch (true) {
        case counter == 1:

          counter++;
          $("#popupImage").css('background-image', 'url(' + getImage(counter) + ')')
          $("#left").fadeOut();

          break;

        case counter == 0:

          counter++;
          $("#popupImage").css('background-image', 'url(' + getImage(counter) + ')')
          $("#left").fadeIn();
          $("#right").fadeIn();

          break;

        case counter == 2:
          break;
      }
    })
    $("#popupImage").on("popupafterclose", function (event, ui) {
      $("#left").fadeIn();
      $("#right").fadeIn();
      counter = 1;
    });
    $("#room-info")
      .html(p[0].longdescription).trigger("create");
    $("#area-info")
      .html(p[0].area).trigger("create");
    $("#price")
      .html(`Price ${p[0].price}`).trigger("create");

    $("#unfavourite").on("tap", function () {
      removeFaves(p[0].id);
      getMarked(postid);
    });

    $("#favourite").on("tap", function () {
      addFaves(p);
      getMarked(postid);
    });
  }, "json").fail(function (status) {
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

  function getMarked(postid) {
   
    const allfaves = getFaves()
    const marked = allfaves.some(f => f.id == postid);
    
    if (marked) {
      $("#favourite").hide();
      $("#unfavourite").show();
    } else {
      $("#favourite").show();
      $("#unfavourite").hide();
    }
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