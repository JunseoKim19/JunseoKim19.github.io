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
   menu item is clicked: "0" light, "1" dark, "2" follow the OS.

   A first-time visitor gets DEFAULT_THEME rather than the OS setting, so the
   site keeps its intended look until someone chooses otherwise. We seed the
   key instead of just applying the class, because the theme script reads it
   too — to tick the active menu item, and to decide whether to react when the
   OS preference changes. Leaving it unset would make it think the visitor had
   chosen "Automatic". To follow the OS by default instead, set DEFAULT_THEME
   to '2'.
   --------------------------------------------------------------------------- */

(function () {
  'use strict';

  var DEFAULT_THEME = '1';          // '0' light, '1' dark, '2' follow the OS
  var SITE_THEME_IS_DARK = true;    // used when the OS reports no preference

  window.wc = {
    darkLightEnabled: true,
    isSiteThemeDark: SITE_THEME_IS_DARK
  };

  var choice = DEFAULT_THEME;
  try {
    var stored = window.localStorage.getItem('wcTheme');
    if (stored === null) {
      window.localStorage.setItem('wcTheme', DEFAULT_THEME);
    } else {
      choice = stored;
    }
  } catch (e) {
    // Private browsing or blocked storage: fall back to the default.
  }

  var dark;
  if (choice === '0') {
    dark = false;
  } else if (choice === '1') {
    dark = true;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    dark = true;
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    dark = false;
  } else {
    dark = SITE_THEME_IS_DARK;
  }

  document.body.classList.toggle('dark', dark);
})();
