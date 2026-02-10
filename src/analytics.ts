import posthog from 'posthog-js';

let initialized = false;

export function initAnalytics() {
  if (import.meta.env.DEV) return;

  posthog.init('phc_ouIKaDgeFfQMsyHlzfhzHADHOmCB0gVibnSKReM8jqd', {
    api_host: 'https://eu.i.posthog.com',
    persistence: 'localStorage',
    capture_pageview: false,
    autocapture: false,
  });
  initialized = true;
}

function capture(event: string, properties?: Record<string, unknown>) {
  if (initialized) posthog.capture(event, properties);
}

export function trackPageView(view: string) {
  capture('$pageview', { $current_url: window.location.href, view });
}

export function trackDeckStarted(deckIds: string[], totalCards: number) {
  capture('deck_started', { deck_ids: deckIds, total_cards: totalCards });
}

export function trackDeckCompleted(
  deckIds: string[],
  accuracy: number,
  timeMs: number,
  mistakes: number,
) {
  capture('deck_completed', {
    deck_ids: deckIds,
    accuracy,
    time_ms: timeMs,
    mistakes,
  });
}
