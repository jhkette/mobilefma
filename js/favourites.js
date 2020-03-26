export function addFaves(fave) {
    const faves = getFaves();
    const found = faves.some(el => el.id === fave[0].id);
    if (!found) {
      faves.push(fave[0]);
      localStorage.setItem("faves", JSON.stringify(faves));
    }
  }
  export function removeFaves(id) {
    const faves = getFaves();

    const amendedFaves = faves.filter(fave => fave.id != id);
    console.log(amendedFaves);

    localStorage.setItem("faves", JSON.stringify(amendedFaves));
  }

  export function getFaves() {
    let faves;
    if (!localStorage.getItem("faves")) {
      faves = [];
    } else {
      faves = JSON.parse(localStorage.getItem("faves"));
    }
    return faves;
  }