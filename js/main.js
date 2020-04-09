
$(document).on("pagecontainerbeforeshow", function (e, ui) {
  const thisPage = $.mobile.pageContainer.pagecontainer("getActivePage").attr("id");
  if (thisPage == "orchard") {
    const urlParams = new URLSearchParams(window.location.search);
    const postid = urlParams.get("post");
    getMarked(postid);
    const popupwidth = $(window).width() * 0.95; // get screensize - multiply by 0.9.5


 
    $.get("../data/houses.json", // get json data
      function (result, status) { 
        /*use 'filter' function to filter result by comparing it against the postId variable from url. 
         I destructure the result to get just the object from the array (as opposed to an object in an array).*/
        const [p] = result.filter(i => i.id == postid); 
        
        // Here I am adding the information using jquery 'html' function to parts of the individual property page
        $('#leadimage').css("background-image", `url('../images/large/${p.lead}')`)
        $("#desc").html(`${p.name}`)
        $("#room-info").html(p.longdescription)
        $("#area-info").html(p.area)
        $("#price").html(`Price ${p.price}`)
        $("#room").html(`<img src= "../images/interior/${p.interior}"/>`)
        $("#area").html(`<img src= "../images/area/${p.areaimg}"/>`)

        const tel = `<a href="tel:+${p.telephone}"><i class="fas fa-phone"></i></a>`;
        $("#telephone").html(tel);

        const sms = `<a href="sms:+${p.telephone}"><i class="fas fa-sms"></i></a>`;
        $("#sms").html(sms);
    
        const emailicon = `<a href="mailto:+${p.email}"><i class="fas fa-envelope-square"></i></a>`;
        $("#email").html(emailicon);
       

        $("#address").html(`<span class="bold">Address:</span> ${p.address}`);
        $("#lookingfor").html(`<span class="bold">Looking for:</span> ${p.lookingfor}`);

        /*  When favourite button is tapped I call the  addFaves helper function
        which adds the favourite to local storage. I then called getMarked which changes the button/message that appears on the
        individual property page. The button that appears depends on if the page is a favourite or not */
        $("#favourite").on("tap", function () {
          addFaves(p);
          getMarked(postid);
        });

        /* ///// CODE FOR IMAGE POPUP ////// */
        let counter = 1; // initialise counter variable
        
        function getImage(counter) {
          return `../images/slide/${p.large[counter]}`;
        }

        
        $("#popupImage").css("width", popupwidth); // give popup a CSS width in relation to screen width
       

        /* This function resets the popup the orginal background image etc each times it is called
         popupbeforeposition is fired each time just before popup appears */
        $("#popupImage").on({
          popupbeforeposition: function () {
            counter = 1; // reset counter
            $("#left").fadeIn(); // reset left arrow
            $("#right").fadeIn(); //reset right arrow
            $("#popupImage").css("background-image",`linear-gradient(
              to top right,
              rgba(255, 255, 255, 0),
              rgba(65, 65, 65, 0.53)
            ),url(' ${getImage(counter)}')`); // add background image via css
          }
        });
        /* on each swipe left - i'm checking for the value of counter then deducting the value
        by one - unless the value is zero. counter corrosponds to an index in an array of images in houses.json. I use the getImage 
        function above to concatante the string to get the path for the image for the css background */
        $("#popupImage").on("swipeleft", function () { // on swipeleft
          switch (true) {
            case counter == 1: 
              counter--; // counter - 1
              $("#popupImage").css("background-image",`linear-gradient(
                to top right,
                rgba(255, 255, 255, 0),
                rgba(65, 65, 65, 0.53)
              ),url(' ${getImage(counter)}')`)// set bg image
              $("#right").fadeOut(); // fadeout right arrow
              break;
            case counter == 2: 
              counter--;  // counter - 1
              $("#popupImage").css("background-image",`linear-gradient(
                to top right,
                rgba(255, 255, 255, 0),
                rgba(65, 65, 65, 0.53)
              ),url(' ${getImage(counter)}')`) // set bg image
              $("#left").fadeIn(); // This is the 'central' image so fade in both arrows
              $("#right").fadeIn();
              break;
            case counter == 0: // if counter == 0 simply 'break' from switch function. There are no further images on the left. 
              break;
          }
        });
        // The same principles as the functon  but is triggered on the 'swiperight' event
        $("#popupImage").on("swiperight", function () {
          switch (true) {
            case counter == 1:
              counter++;
              $("#popupImage").css("background-image",`linear-gradient(
                to top right,
                rgba(255, 255, 255, 0),
                rgba(65, 65, 65, 0.53)
              ),url(' ${getImage(counter)}')`)
              $("#left").fadeOut();
              break;
            case counter == 0:
              counter++;
              $("#popupImage").css("background-image",`linear-gradient(
                to top right,
                rgba(255, 255, 255, 0),
                rgba(65, 65, 65, 0.53)
              ),url(' ${getImage(counter)}')`)
              $("#left").fadeIn();
              $("#right").fadeIn();
              break;
            case counter == 2:
              break;
          }
        });
        /*//// End of code for image popup ////*/
      },"json")
      .fail(function (status) {
        $("#desc").html(`${status.status} error. There was an error retreiving data`); // i'm adding a message if there was an error retreiving data.
    });

  

    $("#favourite").on("tap", function (){
    $("#popupHouse").popup("open", {  
      x: popupwidth / 2,  
      y: 200,  
      transition: "slide"  
  });
  setTimeout(function(){
    $("#popupHouse").popup("close");
  },2200)
})



    // close image popup on tap of 'x'
    $("#close").on("tap", function () {
       $("#popupImage").popup("close");
    });
    /* getMarked function takes a postId as a parameter (ie the post page) and checks to see if the that id is in local storage - it 
    then hides shows appropriate ui buttons / features */
    function getMarked(postid) {
      const allfaves = getFaves();
      const marked = allfaves.some(f => f.id == postid); // some function returns a boolean. If id is in localStorage it is true else it is false
      if (marked) { // if marked is true
        $("#favourite").hide();
        $("#favourited").show();
      } else { // if it is false
        $("#favourite").show();
        $("#favourited").hide();
      }
    }
  }
});

/* Code thats is run if page == favourites */
$(document).on("pagecontainerbeforeshow", function (e, ui) {
  const thisPage = $.mobile.pageContainer.pagecontainer("getActivePage").attr("id");
  if (thisPage == "favourites") {  // if thisPage == favourites run ...
    const faves = getFaves(); // use helper function to get favourites from local storage. This will be an array of objects or an empty array. 
    let text = ""; // initialise text variable with an empty string
    $.each(faves, function (i, v) { //foreach function
      text += `<li class="item"> <a  href="orchard.html?post=${v.id}" data-transition="slidefade">${v.name} </a>`; // add html to text variable
      text += `<i class="fa fa-trash-o" aria-hidden="true" id="${v.id}"></i></li>`; // add html to text variable
    });
    $("#fave-list").html(text); // add text variable with html to 'fave-list'

    $(".fa-trash-o").on("tap", function () {
      var theId = $(this).attr("id"); // get id of icon that was pressed
      $(this).parent().remove(); // remove the parent of 'this' ('this' in this instance is the icon). The parent is the <li> element. 
      removeFaves(theId); // call remove faves helper function with theId as an argument. 
    });
  }
});

// Helper functions
/* Adds a favourite to local storage */
function addFaves(fave) {
  const faves = getFaves(); // get faves - returns an array of favourites or an empty array
  const found = faves.some(el => el.id === fave.id); //use 'some' function to check if the 'favourite' passed as a parameter is in the 'faves' array (ie is already a favourite)
  if (!found) { // if not already in favourites push to the faves array
    faves.push(fave);
    localStorage.setItem("faves", JSON.stringify(faves)); // then add amended array to local storage
  }
}
/* This function removes a favourite from local storage */
function removeFaves(id) {
  const faves = getFaves();
  const amendedFaves = faves.filter(fave => fave.id != id);
  localStorage.setItem("faves", JSON.stringify(amendedFaves));
}

/* This function gets favourites from local storage, returns an array of objects */
function getFaves() {
  let faves;
  if (!localStorage.getItem("faves")) {
    faves = [];
  } else {
    faves = JSON.parse(localStorage.getItem("faves"));
  }
  return faves;
}