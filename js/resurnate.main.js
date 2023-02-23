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
    // Header
    let headerDivElement = document.createElement('div');
    headerDivElement.className = 'stripHeader';
    let headerH2Element = document.createElement('h2');
    let headerH2AElement = document.createElement('a');
    headerH2AElement.href = '/comic/'+strip.id+'.html';
    headerH2AElement.innerText = strip.title;
    headerH2Element.append(headerH2AElement);
    headerDivElement.append(headerH2Element);
    let headerPElement = document.createElement('p');
    let headerCommentAElement = document.createElement('a');
    headerCommentAElement.href = '/comic/'+strip.id+'.html#comments';
    let headerCommentIElement = document.createElement('i');
    headerCommentIElement.className = 'fa-regular fa-comment fa-2x fa-fw';
    headerCommentIElement.style = 'color: #1877F2';
    headerCommentAElement.append(headerCommentIElement)
    headerPElement.append(headerCommentAElement);
    let headerFacebookAElement = document.createElement('a');
    headerFacebookAElement.target = '_blank';
    headerFacebookAElement.href = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.resurnate.com%2Fcomic%2F'+strip.id+'&amp;src=sdkpreparse';
    let headerFacebookIElement = document.createElement('i');
    headerFacebookIElement.className = 'fa-brands fa-facebook-square fa-2x';
    headerFacebookIElement.style = 'color: #1877F2';
    headerFacebookAElement.append(headerFacebookIElement)
    headerPElement.append(headerFacebookAElement);
    headerDivElement.append(headerPElement);
    divElement.append(headerDivElement);
    // Image
    let imageDivElement = document.createElement('div');
    imageDivElement.className = 'stripImage';
    let imageImgElement = document.createElement('img');
    imageImgElement.src = '/img/' + strip.image;
    imageImgElement.alt = strip.title;
    imageDivElement.append(imageImgElement);
    divElement.append(imageDivElement);
    // Quote
    let quoteDivElement = document.createElement('div');
    quoteDivElement.className = 'stripQuote';
    let quoteIElement = document.createElement('i');
    quoteIElement.className = 'fa-solid fa-quote-left fa-3x fa-border fa-pull-left';
    quoteDivElement.append(quoteIElement);
    let quoteSpanElement = document.createElement('span');
    quoteSpanElement.innerHTML = strip.description;
    quoteDivElement.append(quoteSpanElement);
    divElement.append(quoteDivElement);
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
    let spanElement = document.createElement('span');
    divElement.append(spanElement);
    let galleryElement = document.getElementById(galleryElementId);
    let brElement = document.createElement('br');
    if (isStart) {
      spanElement.innerText = 'Start of gallery';
      galleryElement.prepend(divElement);
      galleryElement.prepend(brElement);
    } else {
      spanElement.innerText = 'End of gallery';
      galleryElement.append(brElement);
      galleryElement.append(divElement);
    }
  }
}