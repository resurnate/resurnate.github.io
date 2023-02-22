const galleryElementId = 'gallery';
let stripIndexStart = 0;
let stripIndexEnd = 0;
let loadMoreStripsBefore = true;
let loadMoreStripsAfter = true;

function loadGalleryStrips() {
  // Load strip start and end indexes
  loadGalleryStripIndexes();
  // Batch load some strips
  loadGalleryStripsBatch(false, 4);
}

function loadGalleryStripIndexes() {
  let id = loadGalleryStripId();
  if (id > 0) {
    for (let i = 0; i < galleryMetadata.length; i++) {
      let strip = galleryMetadata[i];
      if (id === strip.id) {
        stripIndexStart = (i > 0) ? i - 1 : 0;
        stripIndexEnd = i;
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
        loadGalleryStrip(isReverse, stripIndexStart);
        stripIndexStart -= 1;
      } else if (!isReverse && (stripIndexEnd < galleryMetadata.length)) {
        loadGalleryStrip(isReverse, stripIndexEnd);
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

function loadGalleryStrip(isReverse, index) {
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
    let innerDivPElement = document.createElement('p');
    innerDivPElement.innerHTML = strip.description;
    innerDivElement.append(innerDivPElement);
    let galleryElement = document.getElementById(galleryElementId);
    if (isReverse) {
      galleryElement.prepend(divElement);
    } else {
      galleryElement.append(divElement);
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