$(document).on("pagebeforeshow", "#favourites", function () {
  

    const faves = getFaves()
    console.log(faves)
    let text = "";
    $.each(faves, function (i, v) {
        text += `<div class="item"><li> <a  href="orchard.html?post=${
      v.id
    }" data-transition="slidefade"> 
        ${v.name} 
        </a></li>`;
        text += `<li> <a href="orchard.html?post=${
      v.id
    }" data-transition="slidefade" > 
        ${v.shortdescription} 
        </a></li><i class="fa fa-trash-o" aria-hidden="true" id="${v.id}"></i></div>`;
    });
    $('#fave-list').html(text)

    $('.fa-trash-o').on('tap', function () {
        var theId = $(this).attr('id')
        console.log(theId)
        removeFaves(theId)
    })

   
   

})


function getFaves() {
    let faves;
    if (!localStorage.getItem("faves")) {
        faves = [];
    } else {
        faves = JSON.parse(localStorage.getItem("faves"));
    }
    return faves;
}

function removeFaves(id) {
    const faves = getFaves();

    const amendedFaves = faves.filter(fave => fave.id != id);
    console.log(amendedFaves);

    localStorage.setItem("faves", JSON.stringify(amendedFaves));
  }
