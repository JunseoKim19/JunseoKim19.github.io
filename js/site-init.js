/* ---------------------------------------------------------------------------
   Applies the visitor's light/dark preference.

   This has to be the first thing inside <body>: it sets a class on the body
   element, so it cannot run from <head>, and running it any later would show a
   flash of the wrong theme.

   It also declares the contract the bundled theme script reads off window.wc:
     darkLightEnabled  unlocks that script's theme menu and its listener for OS
                       preference changes — with it false, clicking does nothing
     isSiteThemeDark   the fallback when the visitor has expressed no preference
                       and the OS reports none either

   localStorage `wcTheme` holds the choice, written by the theme script when a
   menu item is clicked: "0" light, "1" dark. The theme script also recognises
   "2" (follow the OS), but this site's menu does not offer it, so any other
   stored value is normalised back to DEFAULT_THEME — that migrates anyone
   still carrying a "2" from before.

   A first-time visitor gets DEFAULT_THEME. We seed the key rather than just
   applying the class, because the theme script reads it too, to tick the
   active menu item. Leaving it unset would make it think the visitor had
   chosen "Automatic".
   --------------------------------------------------------------------------- */

(function () {
  'use strict';

  var DEFAULT_THEME = '1';          // '0' light, '1' dark
  var SITE_THEME_IS_DARK = true;    // used when the OS reports no preference

  window.wc = {
    darkLightEnabled: true,
    isSiteThemeDark: SITE_THEME_IS_DARK
  };

  var choice = DEFAULT_THEME;
  try {
    var stored = window.localStorage.getItem('wcTheme');
    if (stored === '0' || stored === '1') {
      choice = stored;
    } else {
      window.localStorage.setItem('wcTheme', DEFAULT_THEME);
    }
  } catch (e) {
    // Private browsing or blocked storage: fall back to the default.
  }

  document.body.classList.toggle('dark', choice !== '0');
})();
