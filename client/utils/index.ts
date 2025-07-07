// Function to find the first focusable element
export const findFirstFocusableElement = (
  container: HTMLElement
): HTMLElement | null => {
  // Common focusable selectors including Nord Health components
  const focusableSelectors = [
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    // Nord Health specific components
    'nord-input:not([disabled])',
    'nord-select:not([disabled])',
    'nord-textarea:not([disabled])',
    'nord-checkbox:not([disabled])',
    'nord-radio:not([disabled])',
    'nord-toggle:not([disabled])',
    'nord-date-picker:not([disabled])',
    'nord-autocomplete:not([disabled])',
  ].join(', ');

  // Find all potentially focusable elements
  const elements = container.querySelectorAll(focusableSelectors);

  for (const element of elements) {
    // Check if element is visible and focusable
    if (element instanceof HTMLElement && isElementFocusable(element)) {
      return element;
    }
  }

  return null;
};

// Helper function to check if element is actually focusable
const isElementFocusable = (element: HTMLElement): boolean => {
  // Check if element is visible
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }

  // Check if element has disabled attribute
  if (element.hasAttribute('disabled')) {
    return false;
  }

  // For Nord Health components, check if they have a focusable internal element
  if (element.tagName.startsWith('NORD-')) {
    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const internalInput = shadowRoot.querySelector(
        'input, select, textarea, button'
      );
      return internalInput !== null;
    }
  }

  return true;
};

// Alternative approach: Focus specific Nord component types
export const focusNordComponent = (element: HTMLElement): boolean => {
  // For Nord components, we might need to call their focus method
  if (element.tagName.startsWith('NORD-')) {
    try {
      // Most Nord components have a focus() method
      (element as any).focus?.();
      return true;
    } catch (error) {
      console.warn('Could not focus Nord component:', error);
      return false;
    }
  }

  // For regular HTML elements
  try {
    element.focus();
    return true;
  } catch (error) {
    console.warn('Could not focus element:', error);
    return false;
  }
};
