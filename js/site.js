/* ---------------------------------------------------------------------------
   Behaviour owned by this site, layered on top of the bundled theme scripts.
   --------------------------------------------------------------------------- */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Publication search and topic filter.

     Two controls over one list. Each `.stream-item` in the Publications
     section carries a space-separated `data-topics`; each button in
     `.pub-filter` carries a `data-topic`. A paper shows when it satisfies the
     selected topic AND the search box, so the two compose rather than override
     each other. A paper may hold several topics and appear under several
     buttons.

     Without JavaScript nothing is hidden and every paper stays readable.
     ------------------------------------------------------------------------- */
  function initPublications() {
    var section = document.getElementById('publications');
    if (!section) return;

    var buttons = Array.prototype.slice.call(section.querySelectorAll('.pub-filter button'));
    var items = Array.prototype.slice.call(section.querySelectorAll('.stream-item'));
    if (!buttons.length || !items.length) return;

    var search = section.querySelector('.pub-search');
    var empty = section.querySelector('.pub-empty');
    var state = { topic: 'all', query: [] };

    // Superscripts fold to digits so that "m3rs" finds "M³RS".
    function normalise(text) {
      return text
        .toLowerCase()
        .replace(/³/g, '3')
        .replace(/²/g, '2')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Index title, venue and authors once. Button labels are deliberately left
    // out, so typing "pdf" does not match every paper on the page.
    items.forEach(function (item) {
      item.searchText = normalise(['.article-title', '.article-style', '.stream-meta']
        .map(function (selector) {
          var el = item.querySelector(selector);
          return el ? el.textContent : '';
        })
        .join(' '));
    });

    function matchesTopic(item, topic) {
      return topic === 'all' ||
        (item.getAttribute('data-topics') || '').split(/\s+/).indexOf(topic) !== -1;
    }

    function matchesQuery(item) {
      return state.query.every(function (token) {
        return item.searchText.indexOf(token) !== -1;
      });
    }

    function render() {
      var found = items.filter(matchesQuery);

      items.forEach(function (item) {
        item.hidden = !(matchesTopic(item, state.topic) && matchesQuery(item));
      });

      buttons.forEach(function (button) {
        var topic = button.getAttribute('data-topic');
        var active = topic === state.topic;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');

        // Counts follow the search, so a button always says how many papers it
        // would actually reveal.
        var badge = button.querySelector('.pub-filter-count');
        if (badge) {
          badge.textContent = found.filter(function (item) {
            return matchesTopic(item, topic);
          }).length;
        }
      });

      if (empty) {
        empty.hidden = items.some(function (item) { return !item.hidden; });
      }
    }

    buttons.forEach(function (button) {
      var badge = document.createElement('span');
      badge.className = 'pub-filter-count';
      button.appendChild(document.createTextNode(' '));
      button.appendChild(badge);

      button.addEventListener('click', function () {
        state.topic = button.getAttribute('data-topic');
        render();
      });
    });

    if (search) {
      search.addEventListener('input', function () {
        var query = normalise(search.value);
        state.query = query ? query.split(' ') : [];
        render();
      });
    }

    render();
  }

  /* -------------------------------------------------------------------------
     Theme menu icon.

     The navbar icon shows which theme is active: a moon in dark, a sun in
     light. It follows the `dark` class on <body>, which is what actually
     decides the palette, rather than the theme script's wcThemeChange event —
     tracking the ground truth keeps the icon right no matter which code path
     changed the theme, and survives that script being swapped or upgraded.
     ------------------------------------------------------------------------- */
  function initThemeIcon() {
    var icon = document.querySelector('.js-theme-icon');
    if (!icon) return;

    function sync() {
      var isDark = document.body.classList.contains('dark');
      icon.classList.toggle('fa-moon', isDark);
      icon.classList.toggle('fa-sun', !isDark);
    }

    sync();

    if (typeof window.MutationObserver === 'function') {
      new window.MutationObserver(sync).observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  /* -------------------------------------------------------------------------
     The bundled theme script unconditionally binds "/" to a search modal, but
     this site ships no search index and no modal markup, so the shortcut would
     only lock page scrolling. Undo that state if it ever fires.
     ------------------------------------------------------------------------- */
  function guardSearchHotkey() {
    document.addEventListener('keyup', function () {
      if (!document.body.classList.contains('searching')) return;
      document.body.classList.remove('searching', 'compensate-for-scrollbar');
      var injected = document.getElementById('fancybox-style-noscroll');
      if (injected) injected.remove();
    });
  }

  initPublications();
  initThemeIcon();
  guardSearchHotkey();
})();
