/* ---------------------------------------------------------------------------
   Behaviour owned by this site, layered on top of the bundled theme scripts.
   --------------------------------------------------------------------------- */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Publication topic filter.

     Each `.stream-item` in the Publications section carries a space-separated
     `data-topics` list; each button in `.pub-filter` carries a `data-topic`.
     A paper may hold several topics and so appear under several buttons.
     Without JavaScript no item is hidden, so every paper stays readable.
     ------------------------------------------------------------------------- */
  function initPublicationFilter() {
    var section = document.getElementById('publications');
    if (!section) return;

    var buttons = Array.prototype.slice.call(section.querySelectorAll('.pub-filter button'));
    var items = Array.prototype.slice.call(section.querySelectorAll('.stream-item'));
    if (!buttons.length || !items.length) return;

    function topicsOf(item) {
      return (item.getAttribute('data-topics') || '').split(/\s+/);
    }

    function matches(item, topic) {
      return topic === 'all' || topicsOf(item).indexOf(topic) !== -1;
    }

    // Derive the counts from the markup so they cannot drift out of date.
    buttons.forEach(function (button) {
      var topic = button.getAttribute('data-topic');
      var count = items.filter(function (item) { return matches(item, topic); }).length;
      var badge = document.createElement('span');
      badge.className = 'pub-filter-count';
      badge.textContent = count;
      button.appendChild(document.createTextNode(' '));
      button.appendChild(badge);
    });

    function select(topic) {
      items.forEach(function (item) {
        item.hidden = !matches(item, topic);
      });
      buttons.forEach(function (button) {
        var active = button.getAttribute('data-topic') === topic;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        select(button.getAttribute('data-topic'));
      });
    });
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

  initPublicationFilter();
  guardSearchHotkey();
})();
