const numberOfPhotos = 10;

function Initialize() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const galleryImage = document.getElementById("gallery-image");
    document.getElementById("next-btn").addEventListener("click", showNextPhoto);
    document.getElementById("prev-btn").addEventListener("click", showPreviousPhoto);

    galleryImage.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    });
    
    galleryImage.addEventListener('touchmove', function(event) {
        // Prevent the default touchmove event to prevent page scrolling
        event.preventDefault();
    });

    galleryImage.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 25; // Adjust this value based on your preference
    
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                // Swipe right
                console.log('Swipe right');
                // Implement logic to navigate to the previous photo
                showPreviousPhoto();
            } else {
                // Swipe left
                console.log('Swipe left');
                // Implement logic to navigate to the next photo
                showNextPhoto();
            }
        }
    }

}
 
Initialize();
  
  // Initialize index to display the first image
  let currentIndex = 0;
  
  // Function to update the displayed image
  function showPhoto(width, height) {
    const containerDiv = document.getElementById("container");
    containerDiv.style.width = `${window.innerWidth}px`;
    containerDiv.style.height = `${window.innerHeight}px`;
    const img = document.getElementById("gallery-image");
    if(width > height){
        console.log("landscape");
        img.style.width = `${containerDiv.offsetWidth-100}px`;
        img.style.height = 'auto';
    }
    else {
        console.log("portrait");
        img.style.width = 'auto';
        img.style.height = `${containerDiv.offsetHeight}px`;
    }
   
    //img.className = orientation;
    img.src = `photos\\${currentIndex}.jpg`;
  }
  
  function CheckandShowPhoto(direction){
    const chkImage = document.getElementById("image-size-check");
    chkImage.src = `photos\\${currentIndex}.jpg`;

    chkImage.onload = function() {
        console.log(`image: ${chkImage.src} - Width: ${chkImage.width}, Height: ${chkImage.height}` );
        var orientation = chkImage.width > chkImage.height? "landscape": "portrait";
        showPhoto(chkImage.width, chkImage.height);
    };
    chkImage.onerror = function() {
        console.log("Error loading image:", currentIndex );
        if(direction == 1){
            currentIndex = (currentIndex + 1) % numberOfPhotos;
        }
        else{
            currentIndex = (currentIndex - 1 + numberOfPhotos) % numberOfPhotos;
        }
        
        CheckandShowPhoto(direction);
        console.log("Next: " + currentIndex);
    };
  }

  function showNextPhoto() {
    currentIndex = (currentIndex + 1) % numberOfPhotos;
    CheckandShowPhoto(1);
  }

  function showPreviousPhoto() {
    currentIndex = (currentIndex - 1 + numberOfPhotos) % numberOfPhotos;
    CheckandShowPhoto(-1);
  }
  
  // Show the initial image
  CheckandShowPhoto(currentIndex);
  