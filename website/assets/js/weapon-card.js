// Weapon card rotation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Weapon data - this will be populated from the JSON data
    const weapons = window.weaponsData || [];
    
    if (weapons.length === 0) {
        console.warn('No weapons data found');
        return;
    }

    let currentWeaponIndex = 0;
    let isAnimating = false;

    // Get DOM elements
    const weaponImage = document.querySelector('.weapon-image');
    const weaponName = document.querySelector('.weapon-name');
    const weaponDescription = document.querySelector('.weapon-description');
    const statsContainer = document.querySelector('.stats');
    const prevButton = document.getElementById('weapon-prev');
    const nextButton = document.getElementById('weapon-next');
    const card = document.querySelector('.weapon-card');

    // Function to update the weapon card display with animations
    function updateWeaponCard(index, direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        const weapon = weapons[index];
        
        // Add exit animations
        weaponImage.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
        weaponName.classList.add('fade-out');
        weaponDescription.classList.add('fade-out');
        statsContainer.classList.add('fade-out');
        
        setTimeout(() => {
            // Update content
            weaponImage.src = weapon.image;
            weaponImage.alt = weapon.name;
            weaponName.textContent = weapon.name;
            weaponDescription.textContent = weapon.description;
            
            // Update stats
            statsContainer.innerHTML = weapon.stats.map(stat => `
                <div class="stat">
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${stat.value}</div>
                </div>
            `).join('');
            
            // Remove exit animations and add entrance animations
            weaponImage.classList.remove('slide-out-left', 'slide-out-right');
            weaponImage.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
            weaponName.classList.remove('fade-out');
            weaponName.classList.add('fade-in');
            weaponDescription.classList.remove('fade-out');
            weaponDescription.classList.add('fade-in');
            statsContainer.classList.remove('fade-out');
            statsContainer.classList.add('fade-in');
            
            // Clean up animation classes after animation completes
            setTimeout(() => {
                weaponImage.classList.remove('slide-in-left', 'slide-in-right');
                weaponName.classList.remove('fade-in');
                weaponDescription.classList.remove('fade-in');
                statsContainer.classList.remove('fade-in');
                isAnimating = false;
            }, 500);
        }, 300);
    }

    // Event listeners for navigation buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (isAnimating) return;
            currentWeaponIndex = (currentWeaponIndex - 1 + weapons.length) % weapons.length;
            updateWeaponCard(currentWeaponIndex, 'prev');
        });

        nextButton.addEventListener('click', () => {
            if (isAnimating) return;
            currentWeaponIndex = (currentWeaponIndex + 1) % weapons.length;
            updateWeaponCard(currentWeaponIndex, 'next');
        });
    }

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton?.click();
        } else if (e.key === 'ArrowRight') {
            nextButton?.click();
        }
    });
});
