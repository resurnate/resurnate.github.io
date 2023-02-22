const galleryElementId = 'gallery';
let stripIndexStart = 0;
let stripIndexEnd = 0;
let loadMoreStripsBefore = true;
let loadMoreStripsAfter = true;

function loadStripIndex(id) {
  for (let i = 0; i < galleryMetadata.length; i++) {
    let strip = galleryMetadata[i];
    if (id === strip.id) {
      return i;
    }
  }
  return 0;
}

function loadStripDiv(index) {
  let strip = galleryMetadata[index];
  let stripElement = document.getElementById(strip.id);
  if (!stripElement) {
    let divElement = document.createElement('div');
    divElement.id = strip.id;
    divElement.className = 'galleryStrip';
    let innerH2Element = document.createElement('h2');
    innerH2Element.innerText = strip.title;
    divElement.append(innerH2Element);
    let innerImgElement = document.createElement('img');
    innerImgElement.src = '/img/' + strip.image;
    innerImgElement.alt = strip.title;
    divElement.append(innerImgElement);
    let innerDivElement = document.createElement('div');
    divElement.append(innerDivElement);
    let innerIElement = document.createElement('i');
    innerIElement.className="fa-solid fa-quote-left fa-3x fa-border fa-pull-left";
    innerDivElement.append(innerIElement);
    let innerDivPElement = document.createElement('p');
    innerDivPElement.innerHTML = strip.description;
    innerDivElement.append(innerDivPElement);
    return divElement;
  }
  return undefined;
}

function loadStrip(id) {
  let index = loadStripIndex(id);
  let divElement = loadStripDiv(index);
  if (divElement) {
    document.getElementById(galleryElementId).append(divElement);
  }
}

function loadGalleryStrips() {
  // Load strip start and end indexes
  loadGalleryStripsIndexes();
  // Batch load some strips
  loadGalleryStripsBatch(false, 4);
}

function loadGalleryStripsIndexes() {
  let id = loadGalleryStripsId();
  if (id > 0) {
    let index = loadStripIndex(id);
    if (index > 0) {
        stripIndexStart = index - 1;
        stripIndexEnd = index;
    }
  }
}

function loadGalleryStripsId() {
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
  if (loadMoreStripsBefore && (scrollY === 0)) {
    // At the top of the page
    loadGalleryStripsBatch(true, 1);
  } else if (loadMoreStripsAfter && ((window.innerHeight + window.scrollY) >= document.body.scrollHeight)) {
    // At the bottom of the page
    loadGalleryStripsBatch(false, 4);
  }
}

function loadGalleryStripsBatch(isReverse, count) {
  if (loadMoreStripsBefore || loadMoreStripsAfter) {
    // Let's be cautious!
    loadMoreStripsBefore = false;
    loadMoreStripsAfter = false;
    // Load a maximum of count scripts (if available)
    for (let i = 0; i < count; i++) {
      if (isReverse && (stripIndexStart >= 0)) {
        let divElement = loadStripDiv(stripIndexStart);
        if (divElement) {
          document.getElementById(galleryElementId).prepend(divElement);
        }
        stripIndexStart -= 1;
      } else if (!isReverse && (stripIndexEnd < galleryMetadata.length)) {
        let divElement = loadStripDiv(stripIndexEnd);
        if (divElement) {
          document.getElementById(galleryElementId).append(divElement);
        }
        stripIndexEnd += 1;
      }
    }
    // Any more scripts to load?
    if (stripIndexStart < 0) {
      loadGalleryBoundary(true);
    } else {
      loadMoreStripsBefore = true;
    }
    if (stripIndexEnd >= (galleryMetadata.length)) {
      loadGalleryBoundary(false);
    } else {
      loadMoreStripsAfter = true;
    }
  }
}

function loadGalleryBoundary(isStart) {
  let boundaryElementId = isStart ? galleryElementId+'Start' : galleryElementId+'End';
  let boundaryElement = document.getElementById(boundaryElementId);
  if (!boundaryElement) {
    let divElement = document.createElement('div');
    divElement.id = boundaryElementId;
    divElement.className = galleryElementId + 'Boundary';
    let innerPElement = document.createElement('p');
    divElement.append(innerPElement);
    let galleryElement = document.getElementById(galleryElementId);
    if (isStart) {
      innerPElement.innerText = 'Start of gallery';
      galleryElement.prepend(divElement);
    } else {
      innerPElement.innerText = 'End of gallery';
      galleryElement.append(divElement);
    }
  }
}