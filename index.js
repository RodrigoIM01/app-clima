import createStore from './storage/createStore.js';
import render from './utils/render.js';
import reducer from './storage/reducer.js';

document.addEventListener("DOMContentLoaded", async () => {
    
    createStore.createStore(reducer, { unit: 'metric' }, 'app-clima');
    const unit = createStore.getStore().unit;
    
    render({ units: unit })
    await import('./events.js')
})
