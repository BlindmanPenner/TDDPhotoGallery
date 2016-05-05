// Problem: User when clicking on image goes to a dead end
// Solution: Create an overlay with the large image

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $prevArrow = $('<div id="prevArrow"><img src="img/prev.png" alt="previous" /></div>');
var $nextArrow = $('<div id="nextArrow"><img src="img/next.png" alt="next" /></div>');


// An image to overlay
$overlay.append($image);

// Caption add to overlay
$overlay.append($caption);

//Append buttons to overlay
$overlay.append($prevArrow);
$overlay.append($nextArrow);

// Add overlay
$("body").append($overlay);


// Capture click event on link to image
$("#imageGallery a").click(function(event) {
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  
  // Update overlay with the image linked in the link
  $image.attr("src", imageLocation);
  // Show the overlay
  $overlay.show();

    // Get child's title attribute and set caption
  var captionText = $(this).children("img").attr("data-title");
  $caption.text(captionText);
});
  
  // When overlay is clicked 
$image.click(function(){

  // Hide overlay
  $($overlay).hide();
});


// Navigation

var $index = 0;

// When the next button is clicked
$nextArrow.on("click", function(event) {
    nextImage();
});

// When right arrow key is pressed
$("body").keydown(function(event){
    if ( event.which == 39 ) {
        nextImage();
  }
});

 // When the previous button is clicked
$prevArrow.on("click", function(event){
    previousImage();
});

 // When left arrow key is pressed
$("body").keydown(function(event){
    if ( event.which == 37 ) {
        previousImage();
  }
});


function updateImage(imageLocation, imageCaption) {
   // update image source 
  $image.attr("src", imageLocation);

   // set caption text 
  $caption.text(imageCaption);
}

function nextImage() {
  // update index 
  $index++;

  // loop up to first image in gallery 
  if ($index >= $("#imageGallery li").length) {
    $index = 0;
  }

   // use index to get next image 
  var nextImage = $("#imageGallery li").get($index).getElementsByTagName("a");

   // get new image location and caption 
  var imageLocation = $(nextImage).attr("href");
  var imageCaption =  $(nextImage).children("img").attr("data-title");

   // update the overlay image 
  updateImage(imageLocation, imageCaption);
}

function previousImage() {
   // update the index 
  $index--;

  // loop back to last image in gallery 
  if ($index < 0) {
    $index = $("#imageGallery li").length - 1;
  }

  // get the previous image by index 
  var prevImage = $("#imageGallery li").get($index).getElementsByTagName("a");

  // update the image location and caption 
  var imageLocation = $(prevImage).attr("href");
  var imageCaption =  $(prevImage).children("img").attr("data-title");

  // update the overlay 
  updateImage(imageLocation, imageCaption);
}


