export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  browser.action.onClicked.addListener(async (tab) => {
    if (tab.id && tab.windowId) {
      await browser.sidePanel.open({ windowId: tab.windowId });
    }
  });
});
