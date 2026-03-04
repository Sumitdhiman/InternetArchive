# Open in the Internet Archive

A Chrome extension that lets you instantly open the Internet Archive ([archive.today](https://archive.today)) version of any web page — via a keyboard shortcut, toolbar popup, or right-click context menu.

---

## Features

- **Keyboard shortcut** — Open the archive of the current page in one keystroke
- **Toolbar popup** — Preview the original and cleaned archive URL before opening
- **Right-click context menu** — Archive any page, link, image, video, or audio source
- **URL cleaning** — Automatically strips query parameters and fragments for cleaner archive links
- **Welcome page** — Shown once on install with usage instructions and no repeat interruptions

---

## Usage

### Keyboard Shortcut

| Platform | Shortcut |
|---|---|
| Windows / Linux | `Ctrl` + `Shift` + `F` |
| macOS | `Cmd` + `Shift` + `F` |

Pressing the shortcut on any `http`/`https` page immediately opens the archived version in a new tab.

> You can customize this shortcut at any time via `chrome://extensions/shortcuts`.

### Toolbar Icon

Click the extension icon in the Chrome toolbar to open the popup. The popup shows:
- The **original URL** of the current page
- The **cleaned archive URL** that will be opened
- A button to open the archive

### Right-Click Menu

Right-click anywhere on a page to access **"Open in Internet Archive"** from the context menu. Works on:
- The current page
- Hyperlinks
- Images
- Videos and audio

---

## Installation

### From Source (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the project folder.
5. The extension is now active. A welcome page will open automatically.

---

## Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Read the URL of the current tab when the popup is opened |
| `tabs` | Read the URL of the current tab when the keyboard shortcut is used |
| `scripting` | Required by Manifest V3 for tab interactions |
| `contextMenus` | Register the right-click context menu item |

---

## Project Structure

```
├── manifest.json           Extension manifest (MV3)
├── popup.html              Toolbar popup UI
├── welcome.html            First-install welcome page
├── options.html            Options/settings page
└── assets/
    ├── scripts/
    │   ├── background.js   Service worker (context menu, keyboard shortcut, install hook)
    │   ├── popup.js        Popup logic
    │   └── options.js      Options page logic
    ├── styles/
    │   └── styles.css      Shared styles
    └── images/
        ├── icon16.png
        ├── icon48.png
        └── icon128.png
```

---

## Support

If this extension is useful to you, consider supporting its development:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support-5955D1?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yourwindowsguide)

---

## License

This project is open-source. See [LICENSE](LICENSE) for details.
