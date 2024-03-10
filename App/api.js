const { contextBridge, ipcRenderer } = require('electron')
const events = {}

contextBridge.exposeInMainWorld('model', {
  generete: (text) => ipcRenderer.invoke("model_generete", text)
})

ipcRenderer.on('event', (event, type, data) => {
  if (!events[type]) return;
  events[type](data)
});