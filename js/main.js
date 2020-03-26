// $(document).bind('mobileinit', function () {
//    console.log('main.js')
// $('#favourite').click(function(){
//     console.log('clicked')
// })

// })

// turn marked into a function

$(document).on("pagebeforeshow", "#orchard", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const postid = urlParams.get("post");
  getMarked(postid);
  const popupwidth = $(window).width() * 0.9;
  
    
  $.get("../data/houses.json", function(result, status) {
    const p = result.filter(i => i.id == postid);
    $("#popupImage").css('width', popupwidth)
    const x = "'../images/large/"+p[0].large[0] + "'";
    const y = "'../images/large/"+p[0].large[1] + "'";
    const z = "'../images/large/"+p[0].large[2] + "'";
    // $('.fa-angle-double-left')
    let counter = 1;
    $("#popupImage").css( 'background-image', 'url('+y+')')
    $("#popupImage").on('swipeleft', function(){
      if(counter > 0){
        counter --;
      $("#right").fadeOut();
      $("#popupImage").css( 'background-image', 'url('+x+')')
      }
     
    })
    $("#popupImage").on('swiperight', function(){
      if(counter <2){
        counter ++
      $("#left").fadeOut();
      $("#popupImage").css( 'background-image', 'url('+z+')')
      }
    })
    console.log(p);
    $("#room-info")
      .html(p[0].longdescription)
      .trigger("create");
    $("#area-info")
      .html(p[0].area)
      .trigger("create");
    $("#price")
      .html(`Price ${p[0].price}`)
      .trigger("create");

    $("#unfavourite").on("tap", function() {
      removeFaves(p[0].id);
      getMarked(postid);
    });

    $("#favourite").on("tap", function() {
      addFaves(p);
      getMarked(postid);
    });
  }, "json").fail(function(status) {
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
    const allfaves = JSON.parse(localStorage.getItem("faves"));
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

