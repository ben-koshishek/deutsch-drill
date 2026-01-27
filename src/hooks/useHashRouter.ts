import { useState, useEffect, useCallback, useRef } from "react";
import { parseHash, viewToHash, setHash, type View } from "@/utils/hashRouter";

/**
 * Custom hook for hash-based routing.
 * - Initializes view from URL hash on mount
 * - Provides navigate() to update URL and state
 * - Handles browser back/forward buttons
 */
export function useHashRouter() {
  // Initialize view from current URL hash
  const [view, setView] = useState<View>(() =>
    parseHash(window.location.hash)
  );

  // Track if navigation was triggered internally to prevent double-handling
  const isInternalNavigation = useRef(false);

  /**
   * Navigate to a new view, updating both URL and state.
   * @param newView - The view to navigate to
   * @param replace - If true, replaces current history entry instead of pushing
   */
  const navigate = useCallback((newView: View, replace = false) => {
    const hash = viewToHash(newView);
    isInternalNavigation.current = true;
    setHash(hash, replace);
    setView(newView);
  }, []);

  // Handle browser back/forward buttons and manual hash changes
  useEffect(() => {
    const handleHashChange = () => {
      // Skip if this was triggered by our own navigation
      if (isInternalNavigation.current) {
        isInternalNavigation.current = false;
        return;
      }

      const newView = parseHash(window.location.hash);
      setView(newView);
    };

    // Listen for hash changes (covers both popstate and manual edits)
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  // Set initial hash if empty (ensures URL always reflects view)
  useEffect(() => {
    if (!window.location.hash || window.location.hash === "#") {
      setHash("#/", true);
    }
  }, []);

  return { view, navigate };
}
