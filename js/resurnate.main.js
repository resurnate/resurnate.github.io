const galleryElementId = 'gallery';
let stripCounter = 0;
let loadMoreStrips = false;

function loadGalleryStrips() {
  loadMoreStrips = false; // Let's be cautious!
  loadGalleryStrip(stripCounter);
  loadGalleryStrip(stripCounter);
  loadGalleryStrip(stripCounter);
  loadGalleryStrip(stripCounter);
  if (stripCounter < galleryMetadata.length) {
    loadMoreStrips = true;
  }
}

function loadMoreGalleryStrips() {
  if (loadMoreStrips) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // At the bottom of the page
      loadGalleryStrips();
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
    divElement.id = 'strip' + index;
    divElement.className = 'galleryStrip';
    galleryElement.appendChild(divElement);
    let innerH2Element = document.createElement('h2');
    innerH2Element.innerText = strip.title;
    divElement.appendChild(innerH2Element);
    let innerImgElement = document.createElement('img');
    innerImgElement.src = '/img/' + strip.name;
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