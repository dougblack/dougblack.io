/**
 * Theme toggle functionality
 * Handles dark/light mode switching with localStorage persistence
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  /**
   * Get the stored theme preference
   */
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  /**
   * Store the theme preference
   */
  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage not available
    }
  }

  /**
   * Apply a theme to the document
   */
  function applyTheme(theme) {
    if (theme === DARK) {
      document.documentElement.setAttribute('data-theme', DARK);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  /**
   * Get the current active theme
   */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === DARK ? DARK : LIGHT;
  }

  /**
   * Update the toggle button appearance
   */
  function updateToggleButton(theme) {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label',
        theme === DARK ? 'Switch to light mode' : 'Switch to dark mode'
      );
      btn.textContent = theme === DARK ? '\u2600' : '\u263E';
    }
  }

  /**
   * Set the theme and update everything
   */
  function setTheme(theme) {
    applyTheme(theme);
    storeTheme(theme);
    updateToggleButton(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    var current = getCurrentTheme();
    setTheme(current === DARK ? LIGHT : DARK);
  }

  /**
   * Initialize the theme system
   */
  function init() {
    var stored = getStoredTheme();

    // Apply stored preference
    if (stored === DARK) {
      applyTheme(DARK);
    }

    // Update toggle button
    updateToggleButton(stored === DARK ? DARK : LIGHT);

    // Add click handler to toggle button
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  }

  // Apply theme immediately to prevent flash
  var storedTheme = getStoredTheme();
  if (storedTheme === DARK) {
    applyTheme(DARK);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
