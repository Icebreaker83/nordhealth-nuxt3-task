import { describe, it, expect, vi } from 'vitest';

describe('findFirstFocusableElement', () => {
  it('should return null for empty container', () => {
    const container = document.createElement('div');
    expect(findFirstFocusableElement(container)).toBeNull();
  });

  it('should find standard focusable elements', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1">Button</button>
      <input id="input1" type="text">
      <a id="link1" href="#">Link</a>
      <div id="div1" tabindex="0">Div with tabindex</div>
    `;

    const result = findFirstFocusableElement(container);
    expect(result?.id).toBe('btn1');
  });

  it('should skip disabled elements', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1" disabled>Disabled Button</button>
      <input id="input1" type="text" disabled>
      <button id="btn2">Enabled Button</button>
    `;

    const result = findFirstFocusableElement(container);
    expect(result?.id).toBe('btn2');
  });

  it('should skip hidden elements', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1" style="display: none">Hidden Button</button>
      <input id="input1" type="text" style="visibility: hidden">
      <button id="btn2">Visible Button</button>
    `;
    document.body.appendChild(container);

    const btn1 = container.querySelector('#btn1') as HTMLElement;
    const input1 = container.querySelector('#input1') as HTMLElement;

    // Double-check computed styles
    expect(window.getComputedStyle(btn1).display).toBe('none');
    expect(window.getComputedStyle(input1).visibility).toBe('hidden');

    const result = findFirstFocusableElement(container);
    expect(result?.id).toBe('btn2');
    document.body.removeChild(container);
  });

  it('should find Nord components', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <nord-input id="nord1"></nord-input>
      <nord-button id="nord2"></nord-button>
    `;

    // Mock shadow root and internal elements for Nord components
    const mockInput = document.createElement('input');
    const mockButton = document.createElement('button');

    const nord1 = container.querySelector('#nord1')!;
    const nord2 = container.querySelector('#nord2')!;

    nord1.attachShadow({ mode: 'open' }).appendChild(mockInput);
    nord2.attachShadow({ mode: 'open' }).appendChild(mockButton);

    const result = findFirstFocusableElement(container);
    expect(result?.id).toBe('nord1');
  });

  it('should skip Nord components without focusable internal elements', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <nord-input id="nord1"></nord-input>
      <button id="btn1">Regular Button</button>
    `;

    // Mock shadow root without focusable elements
    const nord1 = container.querySelector('#nord1')!;
    nord1
      .attachShadow({ mode: 'open' })
      .appendChild(document.createElement('div'));

    const result = findFirstFocusableElement(container);
    expect(result?.id).toBe('btn1');
  });
});

describe('focusNordComponent', () => {
  it('should focus standard HTML elements', () => {
    const button = document.createElement('button');
    button.focus = vi.fn();

    const result = focusNordComponent(button);
    expect(result).toBe(true);
    expect(button.focus).toHaveBeenCalled();
  });

  it('should call focus method on Nord components', () => {
    const nordInput = document.createElement('nord-input');
    nordInput.focus = vi.fn();

    const result = focusNordComponent(nordInput);
    expect(result).toBe(true);
    expect(nordInput.focus).toHaveBeenCalled();
  });

  it('should return false if focusing fails', () => {
    const button = document.createElement('button');
    button.focus = vi.fn(() => {
      throw new Error('Focus failed');
    });

    const result = focusNordComponent(button);
    expect(result).toBe(false);
  });

  it('should return false for Nord components without focus method', () => {
    const nordComponent = document.createElement('nord-custom');
    (nordComponent as any).focus = undefined;

    const result = focusNordComponent(nordComponent);
    expect(result).toBe(false);
  });
});
