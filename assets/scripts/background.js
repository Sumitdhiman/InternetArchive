// background.js

function getArchiveUrl(pageUrl) {
    if (pageUrl) {
        // Clean the URL: remove query parameters and fragment
        const queryIndex = pageUrl.indexOf('?');
        if (queryIndex !== -1) {
            pageUrl = pageUrl.substring(0, queryIndex);
        }
        const fragmentIndex = pageUrl.indexOf('#');
        if (fragmentIndex !== -1) {
            pageUrl = pageUrl.substring(0, fragmentIndex);
        }
        return `https://archive.today/${pageUrl}`;
    }
    return null;
}

function openUrlInArchive(url) {
    const archiveUrl = getArchiveUrl(url);
    if (archiveUrl) {
        chrome.tabs.create({ url: archiveUrl });
    } else {
        console.log('Could not create archive URL from:', url);
    }
}

// On install, create context menu items and open welcome page
chrome.runtime.onInstalled.addListener((details) => {
    chrome.contextMenus.create({
        id: "open-in-archive",
        title: "Open in Internet Archive",
        contexts: ["page", "link", "image", "video", "audio"]
    });

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
    }
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "open-in-archive") {
        const urlToArchive = info.linkUrl || info.srcUrl || info.pageUrl;
        openUrlInArchive(urlToArchive);
    }
});

// Listener for keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
    if (command === "archive_current_page") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length > 0) {
                const url = tabs[0].url;
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                    openUrlInArchive(url);
                }
            }
        });
    }
});
