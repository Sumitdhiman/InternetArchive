// background.js

// Listener for when the extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  // Ensure the tab has a URL and it's an http/https URL
  if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
    let pageUrl = tab.url;

    // Find the index of '?' to remove query parameters
    const queryIndex = pageUrl.indexOf('?');
    if (queryIndex !== -1) {
      pageUrl = pageUrl.substring(0, queryIndex); // Get the URL part before '?'
    }
    
    // Also remove any URL fragment (part after #)
    const fragmentIndex = pageUrl.indexOf('#');
    if (fragmentIndex !== -1) {
        pageUrl = pageUrl.substring(0, fragmentIndex);
    }


    const archiveUrl = `https://archive.today/${pageUrl}`;
    
    try {
      // Create a new tab with the archive.today URL
      await chrome.tabs.create({ url: archiveUrl });
    } catch (error)
      { // Log any errors to the console
      console.error(`Error opening tab: ${error.message}`, error);
      // You could potentially notify the user here if opening the tab fails
    }
  } else {
    console.log('No valid URL found in the current tab or URL is not http/https.');
    // Optionally, you could inform the user that the current tab's URL is not suitable,
    // for example, if it's a chrome:// URL or a local file.
  }
});

// Optional: You can include listeners for installation or updates if needed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Archive.ph Extension Installed/Updated');
  // You might want to set up default settings or show a welcome page here
});
