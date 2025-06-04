document.addEventListener('DOMContentLoaded', () => {
    // Define the mod data
    // 'name' property will store the full zip filename (e.g., "Blue Sky.zip")
    // 'folder' property will store the folder name (e.g., "Blue Sky")
    // 'link' will be dynamically constructed based on 'name' and 'folder'
    // Removed duplicates and "Modded FOV & Aim Trainer, white.zip" as requested.
    const rawModsData = [
        "Blue Sky.zip",
        "Fugaz13-mod.zip",
        "Samu-mod.zip",
        "pred_mod.zip",
        "2FLYOG.zip",
        "PARADISE.zip",
        "NticxMod-v6.zip",
        "Peru-Mod.zip",
        "Nio-mod-purple-main.zip",
        "BO$$ MOD V8 - enjoy!.zip",
        "Cream Mod.zip",
        "Grey Mod.zip",
        "Illumination Mod.zip",
        "Sketch Mod.zip",
        "EROS MOD.zip",
        "skylux mod.zip",
        "vvsmod.zip",
        "Psychologixal-Mod.zip",
        // Removed the duplicate "Blue Sky.zip"
        "Charm Mod.zip",
        // Removed "Modded FOV & Aim Trainer, white.zip"
        "Ren-Mod.zip",
        "OOOPS-Mod.zip",
        "aim_trainer.zip",
        "Jolt Mod v1.zip",
        "ANIMALS HELL-Mod.zip",
        "BossMod.zip",
        "FOV MOD.zip"
    ];

    // Process raw data to create full mod objects
    const modsData = rawModsData.map(modName => {
        let folderName = modName;
        // Strip common extensions to get the folder name
        const extensions = ['.zip', '.7z', '.rar', '.exe', '.tar', '.gz', '.dmg'];
        for (const ext of extensions) {
            if (folderName.endsWith(ext)) {
                folderName = folderName.slice(0, -ext.length);
                break;
            }
        }
        folderName = folderName.trim().replace(/[-_.,]+$/, ''); // Clean up trailing characters if any

        return {
            name: modName, // Full zip filename
            link: null, // Will be generated, or set to null for "Coming Soon"
            images: ["1.png", "2.png", "3.png", "4.png"],
            folder: folderName // Folder name without extension
        };
    });


    const modsGrid = document.getElementById('modsGrid');
    const fullscreenModal = document.querySelector('.fullscreen-modal');
    const modalImage = document.querySelector('.fullscreen-modal img');
    const closeModal = document.querySelector('.close-button');

    // Function to create a mod card
    function createModCard(mod, index) {
        const card = document.createElement('div');
        card.classList.add('mod-card');
        card.style.animationDelay = `${0.1 * (index + 1)}s`;

        // The download link is now always constructed based on the folder and full zip name.
        // If you need specific "Coming Soon" mods, set mod.link to null *before* calling createModCard,
        // or add a property like 'isComingSoon: true' to the modData.
        const downloadLink = mod.link === null ? null : `mod-download-card-pictures/${mod.folder}/${mod.name}`;
        const buttonClass = downloadLink ? 'download-button' : 'download-button coming-soon';
        const buttonText = downloadLink ? 'Download' : 'Coming Soon';
        const buttonDataLink = downloadLink ? `data-link="${downloadLink}"` : '';

        // Derive the display name for the H2 tag (without extension)
        let displayName = mod.name;
        const extensions = ['.zip', '.7z', '.rar', '.exe', '.tar', '.gz', '.dmg'];
        for (const ext of extensions) {
            if (displayName.endsWith(ext)) {
                displayName = displayName.slice(0, -ext.length);
                break;
            }
        }
        displayName = displayName.trim().replace(/[-_.,]+$/, '');


        let imageGridHtml = '';
        mod.images.forEach(image => {
            // Image path uses the 'folder' property (without extension)
            imageGridHtml += `<img src="mod-download-card-pictures/${mod.folder}/${image}" alt="${displayName} Image">`;
        });

        card.innerHTML = `
            <h2>${displayName}</h2>
            <div class="mod-content">
                <button class="${buttonClass}" ${buttonDataLink}>${buttonText}</button>
                <div class="mod-tray">
                    <div class="image-grid">
                        ${imageGridHtml}
                    </div>
                </div>
            </div>
        `;

        // Add event listener for download button
        const downloadButton = card.querySelector('.download-button');
        downloadButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!downloadButton.classList.contains('coming-soon')) {
                const link = downloadButton.dataset.link;
                if (link) {
                    window.open(link, '_blank');
                }
            } else {
                alert("This mod is coming soon!");
            }
        });

        // Add event listener for card expansion
        const modTray = card.querySelector('.mod-tray');
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');

            // Close all other expanded cards
            document.querySelectorAll('.mod-card.expanded').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.mod-tray').style.maxHeight = '0';
                    otherCard.querySelector('.mod-tray').classList.remove('show-images');
                }
            });

            if (isExpanded) {
                card.classList.remove('expanded');
                modTray.style.maxHeight = '0';
                modTray.classList.remove('show-images');
            } else {
                card.classList.add('expanded');
                modTray.style.maxHeight = modTray.scrollHeight + 50 + 'px';
                modTray.classList.add('show-images');
            }
        });

        // Add event listeners for fullscreen image view
        const images = card.querySelectorAll('.image-grid img');
        images.forEach(image => {
            image.addEventListener('click', (event) => {
                event.stopPropagation();
                modalImage.src = event.target.src;
                fullscreenModal.style.display = 'flex';
            });
        });

        return card;
    }

    // Populate the mods grid
    modsData.forEach((mod, index) => {
        // This is the line to change:
        // Set mod.link to the dynamically constructed path, enabling downloads for all mods.
        mod.link = `mod-download-card-pictures/${mod.folder}/${mod.name}`;

        modsGrid.appendChild(createModCard(mod, index));
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        fullscreenModal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    fullscreenModal.addEventListener('click', (event) => {
        if (event.target === fullscreenModal) {
            fullscreenModal.style.display = 'none';
        }
    });
});