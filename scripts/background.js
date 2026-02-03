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

// On install, create context menu items
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "open-in-archive",
        title: "Open in Internet Archive",
        contexts: ["page", "link", "image", "video", "audio"]
    });
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "open-in-archive") {
        const urlToArchive = info.linkUrl || info.srcUrl || info.pageUrl;
        openUrlInArchive(urlToArchive);
    }
});
