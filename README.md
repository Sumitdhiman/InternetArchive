# 📂 Open Internet Archive - Chrome Extension

## 📜 Overview

This Chrome extension allows users to quickly open the current webpage in [archive.today](https://archive.today) (also known as archive.is). It features a popup interface that displays the original and cleaned URL (query parameters and fragments removed) before opening the archived version. It also includes a "Buy Me a Coffee" link for support.

## ✨ Features

* **Popup Interface:** Clicking the extension icon opens a popup.
* **URL Cleaning:** Automatically removes URL query parameters (e.g., `?source=facebook`) and fragments (e.g., `#section`) before sending to archive.today.
* **Displays URLs:** Shows both the original and the cleaned URL in the popup.
* **One-Click Archive:** Easily open the cleaned URL in archive.today.
* **Support Link:** Includes a "Buy Me a Coffee" button.

## 🚀 Installation

To install this extension locally in Google Chrome:

1.  **Download or Clone Files:**
    * Ensure you have all the extension files (`manifest.json`, `popup.html`, `popup.js`, `background.js`, and the `images` folder with icons) in a single directory on your computer. Let's call this directory `archiveph_extension`.

2.  **Open Chrome Extensions Page:**
    * Open Google Chrome.
    * Navigate to `chrome://extensions` by typing it into the address bar and pressing Enter.

3.  **Enable Developer Mode:**
    * In the top-right corner of the Extensions page, toggle the **Developer mode** switch to the "on" position.

4.  **Load Unpacked Extension:**
    * Click the **"Load unpacked"** button that appears.
    * In the file dialog, navigate to and select the `archiveph_extension` directory you created/downloaded.
    * Click "Select Folder".

5.  **Extension Ready:**
    * The "Open in archive.today" extension should now appear in your list of extensions and its icon should be visible in the Chrome toolbar.

## 🛠️ How to Use

1.  Navigate to any webpage you wish to archive (e.g., `https://example.com/article?ref=news`).
2.  Click the "Open in archive.today" extension icon in your Chrome toolbar.
3.  A popup will appear, showing:
    * **Original URL:** The full URL of the current page.
    * **Cleaned URL for Archive:** The URL with query parameters and fragments removed (e.g., `https://example.com/article`).
4.  Click the **"Open in archive.today"** button in the popup.
5.  A new tab will open with the archive.today version of the cleaned URL.
6.  Optionally, you can click the "Buy Me a Coffee" button to support the developer. 

## 📁 File Structure

The extension directory should have the following structure:


InternetArchie/
├── manifest.json         # Defines the extension's properties, permissions, and files.
├── popup.html            # The HTML structure for the extension's popup.
├── scripts     
├── popup.js              # The JavaScript logic for the popup.
├── background.js         # The service worker for background tasks (e.g., onInstalled).
└── images/
├── icon16.png        # 16x16 pixels icon for the extension.
├── icon48.png        # 48x48 pixels icon for the extension.
└── icon128.png       # 128x128 pixels icon for the extension (used in Chrome Web Store).



This README provides a guide to installing, using, and understanding the "Open in archive.today" Chrome extension.
