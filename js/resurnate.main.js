const galleryElementId = 'gallery';
let stripCounter = 0;
let loadMoreStrips = false;

function loadGalleryStrips(onLoad) {
  loadMoreStrips = false; // Let's be cautious!
  if (onLoad) { loadGalleryStripCounter(); }
  loadGalleryStrip(stripCounter);
  loadGalleryStrip(stripCounter);
  loadGalleryStrip(stripCounter);
  loadGalleryStrip(stripCounter);
  if (stripCounter < galleryMetadata.length) {
    loadMoreStrips = true;
  }
}

function loadGalleryStripCounter() {
  let id = loadGalleryStripId();
  if (id > 0) {
    for (let index = 0; index < galleryMetadata.length; index++) {
      let strip = galleryMetadata[index];
      if (id === strip.id) {
        stripCounter = index;
        break;
      }
    }
  }
}

function loadGalleryStripId() {
  let urlSplit = window.location.href.split('#');
  if (urlSplit.length > 1) {
    let anchorId = urlSplit[1];
    if ((anchorId.length === 7) && (/^\d+$/.test(anchorId))) {
      return anchorId;
    }
  }
  return 0;
}

function loadMoreGalleryStrips() {
  if (loadMoreStrips) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // At the bottom of the page
      loadGalleryStrips(false);
    }
  }
}

function loadGalleryStrip(index) {
  let galleryElement = document.getElementById(galleryElementId);
  if (index < galleryMetadata.length) {
    // Keep going down the rabbit hole!
    let strip = galleryMetadata[index];
    let brElement = document.createElement('br');
    galleryElement.appendChild(brElement);
    let divElement = document.createElement('div');
    divElement.id = strip.id;
    divElement.className = 'galleryStrip';
    galleryElement.appendChild(divElement);
    let innerH2Element = document.createElement('h2');
    innerH2Element.innerText = strip.title;
    divElement.appendChild(innerH2Element);
    let innerImgElement = document.createElement('img');
    innerImgElement.src = '/img/' + strip.image;
    innerImgElement.alt = strip.title;
    divElement.appendChild(innerImgElement);
    let innerDivElement = document.createElement('div');
    divElement.appendChild(innerDivElement);
    let innerDivPElement = document.createElement('p');
    innerDivPElement.innerHTML = strip.description;
    innerDivElement.appendChild(innerDivPElement);
    stripCounter++;
  }
  if (stripCounter === galleryMetadata.length) {
    // No more strips in gallery!
    let brElement = document.createElement('br');
    galleryElement.appendChild(brElement);
    let divElement = document.createElement('div');
    divElement.id = galleryElementId+'End';
    divElement.className = galleryElementId+'End';
    galleryElement.appendChild(divElement);
    let innerPElement = document.createElement('p');
    innerPElement.innerText = 'End of gallery';
    divElement.appendChild(innerPElement);
    stripCounter++;
  }
}