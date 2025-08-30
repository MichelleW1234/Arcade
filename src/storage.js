let store;

try {
  // Check if running inside Electron
    if (window && window.process && window.process.type) {
        const Store = window.require("electron-store");
        store = new Store();
    }
} catch {
  // Not in Electron
}

export const storage = {
    get(key, fallback) {
        try {
            if (store) {
                return store.get(key, fallback);
            } else {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : fallback;
            }
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        if (store) {
            store.set(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    delete(key) {
        if (store) {
            store.delete(key);
        } else {
            localStorage.removeItem(key);
        }
    },
};