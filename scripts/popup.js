// popup.js

document.addEventListener('DOMContentLoaded', async () => {
    const originalUrlElement = document.getElementById('originalUrl');
    const cleanedUrlElement = document.getElementById('cleanedUrl');
    const openInArchiveButton = document.getElementById('openInArchive');    const errorMessageElement = document.getElementById('errorMessage');
    const loaderElement = document.getElementById('loader');
    const contentElement = document.getElementById('content');


    function showLoader(show) {
        if (loaderElement) loaderElement.style.display = show ? 'block' : 'none';
        if (contentElement) contentElement.style.display = show ? 'none' : 'block';
    }

    function displayError(message) {
        if (errorMessageElement) {
            errorMessageElement.textContent = message;
            errorMessageElement.classList.remove('hidden');
        }
        console.error(message);
    }

    showLoader(true); // Show loader initially

    try {
        // Get the current active tab
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tabs && tabs.length > 0 && tabs[0].url) {
            let pageUrl = tabs[0].url;
            originalUrlElement.textContent = pageUrl;

            // Check if URL is http/https
            if (!pageUrl.startsWith('http://') && !pageUrl.startsWith('https://')) {
                displayError('Cannot archive this page. URL must be http or https.');
                openInArchiveButton.disabled = true;
                openInArchiveButton.style.backgroundColor = '#9ca3af'; // gray-400
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

            cleanedUrlElement.textContent = cleanedPageUrl;

            // Add event listener to the "Open in Archive" button
            openInArchiveButton.addEventListener('click', () => {
                const archiveUrl = `https://archive.today/${cleanedPageUrl}`;
                chrome.tabs.create({ url: archiveUrl });
                window.close(); // Close the popup after clicking
            });

        } else {
            displayError('Could not get URL of the current tab.');
            openInArchiveButton.disabled = true;
             openInArchiveButton.style.backgroundColor = '#9ca3af'; // gray-400
        }
    } catch (error) {
        displayError(`An error occurred: ${error.message}`);
        if (openInArchiveButton) {
            openInArchiveButton.disabled = true;
            openInArchiveButton.style.backgroundColor = '#9ca3af'; // gray-400
        }
    } finally {
        showLoader(false); // Hide loader and show content
    }
});
