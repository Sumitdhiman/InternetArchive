// popup.js

async function getUrl() {
    // First, try to get the active tab in the current window
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs && tabs.length > 0 && tabs[0].url) {
        return tabs[0].url;
    }

    // If that fails, try to get the active tab in the last focused window
    tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tabs && tabs.length > 0 && tabs[0].url) {
        return tabs[0].url;
    }

    // If that also fails, return null
    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    const originalUrlElement = document.getElementById('originalUrl');
    const cleanedUrlElement = document.getElementById('cleanedUrl');
    const openInArchiveButton = document.getElementById('openInArchive');
    const errorMessageElement = document.getElementById('errorMessage');
    const errorTextElement = document.getElementById('errorText');
    const loaderElement = document.getElementById('loader');
    const mainContentElement = document.getElementById('main-content');
    const settingsButton = document.querySelector('.settings-btn');

    // Add event listener for settings button
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            chrome.tabs.create({ url: 'options.html' });
        });
    }

    function showLoader(show) {
        if (loaderElement) {
            loaderElement.style.display = show ? 'flex' : 'none';
        }
        if (mainContentElement) {
            if (show) {
                mainContentElement.classList.add('hidden');
            } else {
                mainContentElement.classList.remove('hidden');
            }
        }
    }

    function displayError(message) {
        if (errorMessageElement && errorTextElement) {
            errorTextElement.textContent = message;
            errorMessageElement.classList.remove('hidden');
        }
        console.error(message);
    }

    showLoader(true); // Show loader initially

    try {
        const pageUrl = await getUrl();

        if (pageUrl) {
            console.log('Current URL:', pageUrl); // Debug log
            
            if (originalUrlElement) {
                originalUrlElement.textContent = pageUrl;
                originalUrlElement.title = pageUrl; // Tooltip for full URL
            }

            // Check if URL is http/https
            if (!pageUrl.startsWith('http://') && !pageUrl.startsWith('https://')) {
                let errorMsg = 'Cannot archive this page.';
                if (pageUrl.startsWith('chrome://') || pageUrl.startsWith('chrome-extension://')) {
                    errorMsg = 'Cannot archive browser internal pages.';
                } else if (pageUrl.startsWith('file://')) {
                    errorMsg = 'Cannot archive local files.';
                } else {
                    errorMsg = 'Can only archive web pages (http/https URLs).';
                }
                displayError(errorMsg);
                openInArchiveButton.disabled = true;
                showLoader(false);
                return;
            }

            // Clean the URL: remove query parameters and fragment
            let cleanedPageUrl = pageUrl;
            const queryIndex = cleanedPageUrl.indexOf('?');
            if (queryIndex !== -1) {
                cleanedPageUrl = cleanedPageUrl.substring(0, queryIndex);
            }
            const fragmentIndex = cleanedPageUrl.indexOf('#');
            if (fragmentIndex !== -1) {
                cleanedPageUrl = cleanedPageUrl.substring(0, fragmentIndex);
            }

            const archiveUrl = `https://archive.today/${cleanedPageUrl}`;
            if (cleanedUrlElement) {
                cleanedUrlElement.textContent = archiveUrl;
                cleanedUrlElement.title = archiveUrl; // Tooltip for full URL
            }

            // Add event listener to the "Open in Archive" button
            if (openInArchiveButton) {
                openInArchiveButton.addEventListener('click', () => {
                    // Show feedback
                    openInArchiveButton.disabled = true;
                    openInArchiveButton.innerHTML = '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25"/><path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>Opening archive...';
                    
                    chrome.tabs.create({ url: archiveUrl });
                    
                    // Close after brief delay for feedback
                    setTimeout(() => {
                        window.close();
                    }, 300);
                });
            }

        } else {
            displayError('Could not get URL of the current tab.');
            openInArchiveButton.disabled = true;
        }
    } catch (error) {
        displayError(`An error occurred: ${error.message}`);
        if (openInArchiveButton) {
            openInArchiveButton.disabled = true;
        }
    } finally {
        showLoader(false); // Hide loader and show content
    }
});
