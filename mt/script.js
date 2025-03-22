// Wait for the DOM to load
window.addEventListener('load', () => {
    let currentIndex = 0;

    const changingWordElement = document.querySelector('.changing-word');
    const words = changingWordElement.textContent.split(' '); // Build words array directly from the content of the span
    console.log(words)
    // Set up GSAP for smooth fade and slide-in animations
    gsap.from('.header-info', {
        opacity: 0,
        x: -200,  // Slide in from the left
        duration: 1.5,
        ease: "power3.out",
    });

    gsap.from('.changing-word', {
        opacity: 0,
        y: 50,  // Slide in from below
        duration: 1,
        delay: 0.2,  // Add delay to wait for the header-info animation to complete
        ease: "power3.out",
    });

    gsap.from('.header-buttons', {
        opacity: 0,
        y: 30,  // Slide up from below
        duration: 1.5,
        delay: 0.5,  // Slight delay to stagger the button animation
        ease: "power3.out",
        stagger: 0.3,  // Stagger buttons with a small gap
    });

    // Word change function
    function changeWord() {
        changingWordElement.style.opacity = 0;  // Fade out
        setTimeout(() => {
            changingWordElement.classList.remove('d-none');
            currentIndex = (currentIndex + 1) % words.length; // Move to next word, loop back to first word
            changingWordElement.textContent = words[currentIndex]; // Change word text
            changingWordElement.style.opacity = 1;  // Fade in
        }, 750); // Wait for 1 second before changing the word
    }

    // Start the loop
    setInterval(changeWord, 1500); // Change word every 2 seconds
});
