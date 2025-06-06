document.addEventListener('DOMContentLoaded', () => {
    const firstLoader = document.getElementById('firstLoader');
    const secondLoader = document.getElementById('secondLoader');

    // Duration for the first animation set to complete fully.
    const firstAnimationCompleteDuration = 4500; // milliseconds (4.5 seconds)
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

        // Schedule the fade-out of the second animation
        // This will start the fade-out animation before the total secondAnimationDisplayDuration is over,
        // so it finishes exactly at the 3-second mark.
        setTimeout(() => {
            secondLoader.classList.add('fade-out');
        }, secondAnimationDisplayDuration - fadeTransitionDuration);

    }, firstAnimationCompleteDuration);

    // Phase 2: After both loaders have done their thing, hide the first loader completely
    // and then redirect to the main page.
    setTimeout(() => {
        firstLoader.style.display = 'none'; // Completely hide the first loader

        // This timeout ensures the redirection happens exactly after the secondAnimationDisplayDuration,
        // which now includes its own fade-out.
        setTimeout(() => {
            window.location.href = 'mainpage.html'; // Redirect to the main mods page
        }, secondAnimationDisplayDuration);

    }, firstAnimationCompleteDuration + fadeTransitionDuration); // This calculates when the first loader is fully faded out
});
