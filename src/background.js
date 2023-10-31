/*global chrome*/

function extractPageInfo() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      const tabId = tabs[0].id
      chrome.scripting.executeScript(
        {
          target: {tabId: tabId},
          function: () => {
            const data = {
              pageTitle: document.title,
              metaDescription: document.querySelector('meta[name="description"]')?.content || '',
              bodyContent: document.body.textContent.replace(/[^\w\s.,?!]/g, '')
            }
            return data
          }
        },
        (result) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError)
          } else {
            const data = result[0]
            chrome.runtime.sendMessage({data})
            
          }
        }
      )
    }
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractPageInfo') {
    extractPageInfo()
  }
})