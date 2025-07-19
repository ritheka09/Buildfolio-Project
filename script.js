// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Keyboard interaction functionality
    const keyboardFrame = document.getElementById('keyboardFrame');
    const hiddenContent = document.getElementById('hiddenContent');
    const keyboardFull = document.querySelector('.keyboard-full');
    const goBackButton = document.getElementById('goBack');
    
    if (keyboardFrame && hiddenContent && keyboardFull && goBackButton) {
        let keyPressTimer;
        let isKeyPressed = false;
        let keyPressStartTime = 0;
        
        // We need to listen for messages from the iframe
        window.addEventListener('message', function(event) {
            // Check if the message is from our Spline iframe
            if (event.data && event.data.type === 'spline') {
                // If a key is pressed in the Spline scene
                if (event.data.action === 'keydown') {
                    if (!isKeyPressed) {
                        isKeyPressed = true;
                        keyPressStartTime = Date.now();
                        
                        // Start the timer
                        keyPressTimer = setInterval(function() {
                            const elapsedTime = Date.now() - keyPressStartTime;
                            
                            // If key has been pressed for 5 seconds
                            if (elapsedTime >= 5000) {
                                clearInterval(keyPressTimer);
                                
                                // Show hidden content
                                keyboardFull.style.opacity = '0.2';
                                keyboardFull.style.transform = 'scale(0.95)';
                                hiddenContent.classList.add('active');
                            }
                        }, 100);
                    }
                }
                
                // If a key is released in the Spline scene
                if (event.data.action === 'keyup') {
                    isKeyPressed = false;
                    clearInterval(keyPressTimer);
                }
            }
        });
        
        // Since we can't directly access iframe events, we'll also add keyboard events to the window
        // This is a fallback in case the iframe doesn't send messages
        window.addEventListener('keydown', function(e) {
            if (!isKeyPressed) {
                isKeyPressed = true;
                keyPressStartTime = Date.now();
                
                keyPressTimer = setInterval(function() {
                    const elapsedTime = Date.now() - keyPressStartTime;
                    
                    if (elapsedTime >= 5000) {
                        clearInterval(keyPressTimer);
                        keyboardFull.style.opacity = '0.2';
                        keyboardFull.style.transform = 'scale(0.95)';
                        hiddenContent.classList.add('active');
                    }
                }, 100);
            }
        });
        
        window.addEventListener('keyup', function() {
            isKeyPressed = false;
            clearInterval(keyPressTimer);
        });
        
        // Go back button functionality
        goBackButton.addEventListener('click', function() {
            hiddenContent.classList.remove('active');
            keyboardFull.style.opacity = '1';
            keyboardFull.style.transform = 'scale(1)';
        });
        
        // Also add click/touch events to the keyboard iframe container as another fallback
        keyboardFull.addEventListener('mousedown', function() {
            if (!isKeyPressed) {
                isKeyPressed = true;
                keyPressStartTime = Date.now();
                
                keyPressTimer = setInterval(function() {
                    const elapsedTime = Date.now() - keyPressStartTime;
                    
                    if (elapsedTime >= 5000) {
                        clearInterval(keyPressTimer);
                        keyboardFull.style.opacity = '0.2';
                        keyboardFull.style.transform = 'scale(0.95)';
                        hiddenContent.classList.add('active');
                    }
                }, 100);
            }
        });
        
        keyboardFull.addEventListener('mouseup', function() {
            isKeyPressed = false;
            clearInterval(keyPressTimer);
        });
        
        keyboardFull.addEventListener('mouseleave', function() {
            isKeyPressed = false;
            clearInterval(keyPressTimer);
        });
        
        // Touch events for mobile
        keyboardFull.addEventListener('touchstart', function() {
            if (!isKeyPressed) {
                isKeyPressed = true;
                keyPressStartTime = Date.now();
                
                keyPressTimer = setInterval(function() {
                    const elapsedTime = Date.now() - keyPressStartTime;
                    
                    if (elapsedTime >= 5000) {
                        clearInterval(keyPressTimer);
                        keyboardFull.style.opacity = '0.2';
                        keyboardFull.style.transform = 'scale(0.95)';
                        hiddenContent.classList.add('active');
                    }
                }, 100);
            }
        });
        
        keyboardFull.addEventListener('touchend', function() {
            isKeyPressed = false;
            clearInterval(keyPressTimer);
        });
    }
});