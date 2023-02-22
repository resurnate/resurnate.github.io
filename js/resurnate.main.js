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
  if (index < galleryMetadata.length) {
    let strip = galleryMetadata[index];
    let divElement = document.createElement('div');
    divElement.id = 'strip' + index;
    divElement.className = 'galleryStrip';
    let innerBrElement = document.createElement('br');
    divElement.appendChild(innerBrElement);
    let innerH2Element = document.createElement('h2');
    innerH2Element.innerText = strip.title;
    divElement.appendChild(innerH2Element);
    let innerImgElement = document.createElement('img');
    innerImgElement.src = '/img/' + strip.name;
    innerImgElement.alt = strip.title;
    divElement.appendChild(innerImgElement);
    document.getElementById(galleryElementId).appendChild(divElement);
    stripCounter++;
  } else if (index === galleryMetadata.length) {
    let divElement = document.createElement('div');
    divElement.id = galleryElementId+'End';
    divElement.className = galleryElementId+'End';
    let innerPElement = document.createElement('p');
    innerPElement.innerText = 'End of gallery';
    divElement.appendChild(innerPElement);
    document.getElementById(galleryElementId).appendChild(divElement);
    stripCounter++;
  } // Else, move along, nothing more to see here!
}