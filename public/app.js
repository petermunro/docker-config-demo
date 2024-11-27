let config = {};

function updateUI() {
    // Update theme
    document.documentElement.setAttribute('data-theme', config.theme);
    
    // Update welcome message and subtitle
    document.getElementById('welcomeMessage').textContent = config.welcomeMessage;
    document.getElementById('subtitle').textContent = config.content.subtitle;
    
    // Update footer
    document.getElementById('footer').textContent = config.content.footerText;
    
    // Update datetime if enabled
    if (config.featureFlags.showDateTime) {
        document.getElementById('datetime').textContent = new Date().toLocaleString();
    } else {
        document.getElementById('datetime').style.display = 'none';
    }
    
    // Update styles
    document.documentElement.style.setProperty('--primary-color', config.styles.primaryColor);
    document.documentElement.style.setProperty('--font-size', config.styles.fontSize);
    document.documentElement.style.setProperty('--border-radius', config.styles.borderRadius);
    
    // Display current config
    document.getElementById('configDisplay').textContent = JSON.stringify(config, null, 2);
}

async function fetchConfig() {
    try {
        const response = await fetch('/api/config');
        config = await response.json();
        updateUI();
    } catch (error) {
        console.error('Error fetching config:', error);
    }
}

// Initial fetch
fetchConfig();

// Refresh config every 5 seconds to demonstrate live updates
setInterval(fetchConfig, 5000);

// Update datetime every second if enabled
setInterval(() => {
    if (config.featureFlags?.showDateTime) {
        document.getElementById('datetime').textContent = new Date().toLocaleString();
    }
}, 1000); 