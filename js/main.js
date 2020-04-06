// #2A6793;

$(document).on("pagecontainerbeforeshow", function(e, ui) {
  const thisPage = $.mobile.pageContainer
    .pagecontainer("getActivePage")
    .attr("id");
  if (thisPage == "orchard") {
    const urlParams = new URLSearchParams(window.location.search);
    const postid = urlParams.get("post");
    getMarked(postid);
   

    // use counter as a value for the array.
    $.get(
      "../data/houses.json",
      function(result, status) {
        const p = result.filter(i => i.id == postid);
         $('#leadimage').css("background-image",`url('../images/large/${p[0].lead}')`)
         $("#desc").html(`${p[0].name}`)
        // MB USE APPEND
        $("#room-info").html(p[0].longdescription)
        
        $("#area-info").html(p[0].area)
         
        $("#price").html(`Price ${p[0].price}`)
         
        $("#room").html(`<img src= "../images/interior/${p[0].interior}"/>` )
        $("#area").html(`<img src= "../images/area/${p[0].areaimg}"/>` )
       

        const tel = `<a href="tel:+${
          p[0].telephone
        }"><i class="fas fa-phone"></i></a>`;
        $("#telephone").html(tel);

        const sms = `<a href="sms:+${
          p[0].telephone
        }"><i class="fas fa-sms"></i></a>`;
        $("#sms").html(sms);

        $("#address").html(`Address: ${p[0].address}`);

        $("#email").html(`Email: ${p[0].email}`);
    

        $("#unfavourite").on("tap", function() {
          removeFaves(p[0].id);
          getMarked(postid);
        });

        $("#favourite").on("tap", function() {
          addFaves(p);
          getMarked(postid);
        });
        
       
     
        let counter = 1; // initialise counter variable
        const popupwidth = $(window).width() * 0.9; // get screensize * 0.9
        $("#popupImage").css("width", popupwidth); // give popup a CSS width in relatino to screen width
        $("#popupImage").on({
          popupbeforeposition: function() { 
            counter = 1;
            $("#left").fadeIn();
            $("#right").fadeIn();
            getImage(counter)
            $("#popupImage").css(
              "background-image",
              `url(' ${getImage(counter)}')`
            );

           }
       });
        

        function getImage(counter) {
          return `../images/slide/${p[0].large[counter]}`;   
        }
        
        

        $("#popupImage").on("swipeleft", function() {
          switch (true) {
            case counter == 1:
              counter--;
              $("#popupImage").css(
                "background-image",
                `url(' ${getImage(counter)}')`
              );
              $("#right").fadeOut();

              break;

            case counter == 2:
              counter--;
              $("#popupImage").css(
                "background-image",
                `url(' ${getImage(counter)}')`
              );
              $("#left").fadeIn();
              $("#right").fadeIn();

              break;

            case counter == 0:
              break;
          }
        });
        $("#popupImage").on("swiperight", function() {
          switch (true) {
            case counter == 1:
              counter++;
              $("#popupImage").css(
                "background-image",
                `url(' ${getImage(counter)}')`
              );
              $("#left").fadeOut();
              break;

            case counter == 0:
              counter++;
              $("#popupImage").css(
                "background-image",
                `url(' ${getImage(counter)}')`
              );
              $("#left").fadeIn();
              $("#right").fadeIn();
              break;

            case counter == 2:
              break;
          }
        });
      
      },
      "json"
    ).fail(function(status) {
      console.log(status.status + " error. There was an error retreiving data");
    });

    $("#close").on("tap", function() {
      
      $("#popupImage").popup("close");
    });

    function getMarked(postid) {
      const allfaves = getFaves();
      const marked = allfaves.some(f => f.id == postid);

      if (marked) {
        $("#favourite").hide();
        $("#favourited").show();
      } else {
        $("#favourite").show();
        $("#favourited").hide();
      }
    }
  }
});

// TO CLOSE
//

$(document).on("pagecontainerbeforeshow", function(e, ui) {
  const thisPage = $.mobile.pageContainer
    .pagecontainer("getActivePage")
    .attr("id");
  if (thisPage == "favourites") {
    const faves = getFaves();
   
    let text = "";
    $.each(faves, function(i, v) {
      text += `<li class="item"> <a  href="orchard.html?post=${
        v.id
      }" data-transition="slidefade"> 
      ${v.name} 
      </a>`;
      text += `<i class="fa fa-trash-o" aria-hidden="true" id="${
        v.id
      }"></i></li>`;
    });
    $("#fave-list").html(text);

    $(".fa-trash-o").on("tap", function() {
      var theId = $(this).attr("id");
      $(this)
        .parent()
        .remove();
     
      removeFaves(theId);
    });
  }
});

// Helper functions
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
 

  localStorage.setItem("faves", JSON.stringify(amendedFaves));
}

function getFaves() {
  let faves;
  if (!localStorage.getItem("faves")) {
    faves = [];
  } else {
    faves = JSON.parse(localStorage.getItem("faves"));
  }
  return faves;
}
