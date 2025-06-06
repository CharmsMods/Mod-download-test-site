document.addEventListener('DOMContentLoaded', () => {
    const firstLoader = document.getElementById('firstLoader');
    const secondLoader = document.getElementById('secondLoader');

    // Duration for the first animation set to complete fully.
    // Based on original animation delays, roughly 2.8s for animation08 to start, plus its 1.5s duration.
    // Let's set it slightly above the longest animation to ensure it finishes.
    const firstAnimationCompleteDuration = 4500; // milliseconds (4.5 seconds) to ensure all animations play out
    const fadeTransitionDuration = 750; // milliseconds (0.75 seconds) for the fade effect
    const secondAnimationDisplayDuration = 3000; // milliseconds (3 seconds) as requested

    // Request fullscreen (optional)
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn("Fullscreen request denied or failed:", err);
        });
    }

    // Phase 1: After the first set of animations has completed, start its fade out
    // and simultaneously prepare the second loader to fade in.
    setTimeout(() => {
        // Start fading out the first loader
        firstLoader.classList.add('fade-out');

        // Immediately prepare the second loader to become visible and fade in
        secondLoader.style.display = 'flex'; // Make it flex so it occupies space
        // Force a reflow to ensure the browser registers display:flex before opacity transition
        void secondLoader.offsetHeight; // eslint-disable-line no-unused-expressions
        secondLoader.classList.add('show'); // This will trigger the opacity transition to 1
        secondLoader.style.zIndex = 20; // Ensure it's above the fading first loader

    }, firstAnimationCompleteDuration);

    // Phase 2: After the first loader has faded out and the second has faded in,
    // hide the first loader completely and then redirect after the second animation's display duration.
    setTimeout(() => {
        firstLoader.style.display = 'none'; // Completely hide the first loader

        // After the second animation has displayed for its set duration, redirect
        setTimeout(() => {
            window.location.href = 'mainpage.html'; // Redirect to the main mods page
        }, secondAnimationDisplayDuration);

    }, firstAnimationCompleteDuration + fadeTransitionDuration); // This calculates when the first loader is fully faded out
});
