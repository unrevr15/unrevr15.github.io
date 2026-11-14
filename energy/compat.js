'use strict';
// Runs first. The static page host (deploy/static/README.md section 1) serves
// this page from an opaque origin, where history.pushState/replaceState can
// throw. workspace.js calls both on every desk change and would stop at the
// first click, so a failed pushState of a "#id" URL falls back to setting
// location.hash: same address, and the hashchange listener in workspace.js
// reveals the desk. A failed replaceState only loses a saved scroll offset.
(function () {
  var proto = window.History && window.History.prototype;
  if (!proto) return;
  ['pushState', 'replaceState'].forEach(function (name) {
    var original = proto[name];
    if (typeof original !== 'function') return;
    proto[name] = function (state, title, url) {
      try {
        return original.apply(this, arguments);
      } catch (err) {
        if (name === 'pushState' && typeof url === 'string' && url.charAt(0) === '#') {
          try {
            if (location.hash !== url) location.hash = url;
          } catch (e) { /* the page keeps working without an address change */ }
        }
        return undefined;
      }
    };
  });
  // workspace.js sets history.scrollRestoration at load; if the host refuses
  // the write, swallow it rather than stop the script.
  try {
    history.scrollRestoration = history.scrollRestoration;
  } catch (err) {
    try {
      Object.defineProperty(proto, 'scrollRestoration', {
        configurable: true,
        get: function () { return 'auto'; },
        set: function () {},
      });
    } catch (e) { /* nothing else to do */ }
  }
})();
