import matchers from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import ThemeControl from './ThemeControl.vue';
import { describe, expect, test } from 'vitest';
import { key, store } from '@/store';
import vuetify from '@/plugins/vuetify';

expect.extend(matchers);

function renderComponent() {
  return render(ThemeControl, {
    global: {
      plugins: [[store, key], vuetify]
    }
  });
}

describe('ThemeControl Component', async () => {
  test('Initial theme is system if is not specified in store', async () => {
    const { getByTitle } = renderComponent();

    const darkButtonElement = await getByTitle('Dark Theme');
    const systemButtonElement = await getByTitle('System Theme');
    const lightButtonElement = await getByTitle('Light Theme');

    expect(darkButtonElement).not.toHaveClass('v-btn--active');
    expect(systemButtonElement).toHaveClass('v-btn--active');
    expect(lightButtonElement).not.toHaveClass('v-btn--active');
  });

  test('Dark button turns on dark theme', async () => {
    const { getByTitle } = renderComponent();

    const darkButtonElement = await getByTitle('Dark Theme');
    const systemButtonElement = await getByTitle('System Theme');
    const lightButtonElement = await getByTitle('Light Theme');

    await fireEvent.click(darkButtonElement);

    expect(darkButtonElement).toHaveClass('v-btn--active');
    expect(systemButtonElement).not.toHaveClass('v-btn--active');
    expect(lightButtonElement).not.toHaveClass('v-btn--active');
  });

  test('System button turns on system theme', async () => {
    const { getByTitle } = renderComponent();

    const darkButtonElement = await getByTitle('Dark Theme');
    const systemButtonElement = await getByTitle('System Theme');
    const lightButtonElement = await getByTitle('Light Theme');

    await fireEvent.click(systemButtonElement);

    expect(darkButtonElement).not.toHaveClass('v-btn--active');
    expect(systemButtonElement).toHaveClass('v-btn--active');
    expect(lightButtonElement).not.toHaveClass('v-btn--active');
  });

  test('Light button turns on dark theme', async () => {
    const { getByTitle } = renderComponent();

    const darkButtonElement = await getByTitle('Dark Theme');
    const systemButtonElement = await getByTitle('System Theme');
    const lightButtonElement = await getByTitle('Light Theme');

    await fireEvent.click(lightButtonElement);

    expect(darkButtonElement).not.toHaveClass('v-btn--active');
    expect(systemButtonElement).not.toHaveClass('v-btn--active');
    expect(lightButtonElement).toHaveClass('v-btn--active');
  });
});
