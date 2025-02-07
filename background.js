console.log("Service Worker Loaded!");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

chrome.storage.sync.get(null, (result) => console.log(result));

