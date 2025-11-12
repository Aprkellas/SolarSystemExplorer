// core/updateLoop.js
const cbs = new Set();
export const onFrame = {
    add: fn => cbs.add(fn),
    remove: fn => cbs.delete(fn),
    invoke: () => { for (const fn of cbs) fn(); }
};
export const clearFrameCallbacks = () => cbs.clear();
