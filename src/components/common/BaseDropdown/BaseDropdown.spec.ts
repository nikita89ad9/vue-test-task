import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';

import { getElementRect } from '@utils/getElementRect'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BaseDropdown from './BaseDropdown.vue';

describe('BaseDropdown', () => {
  vi.mock('@utils/getElementRect', () => {
    const rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const value = vi.fn().mockResolvedValue(rect);
    return {
      getElementRect: value,
    };
  });

  it('Dropdown has activator in slot', () => {
    const wrapper = mount(BaseDropdown, {
      slots: {
        trigger: '<button>Dropdown activator</button>',
      },
    });
    expect(wrapper.text()).toContain('Dropdown activator');
  });

  it('Dropdown has content in slot and content is hidden', () => {
    const wrapper = mount(BaseDropdown, {
      slots: {
        content: '<div>Dropdown content</div>',
      },
    });
    expect(wrapper.text()).toContain('Dropdown content');
    const content = wrapper.find('.dropdown__content');
    expect(content.isVisible()).toBe(false);
  });

  it('Dropdown activator works as intended', async () => {
    const wrapper = mount(BaseDropdown, {
      slots: {
        trigger: '<button>Dropdown activator</button>',
        content: '<div class="inner">Dropdown content</div>',
      },
    });
    const trigger = wrapper.find('.dropdown__activator').element as HTMLElement;
    await trigger.click();
    const content = wrapper.find('.dropdown__content');
    expect(content.isVisible()).toBe(true);
  });

  it('Should not close when clicking inside dropdown content, when closeOnClick is false', async () => {
    const wrapper = mount(BaseDropdown, {
      slots: {
        trigger: '<button>Dropdown activator</button>',
        content: '<div>Dropdown content</div>',
      },
      props: {
        closeOnClick: false,
      },
    });
    const trigger = wrapper.find('.dropdown__activator').element as HTMLElement;
    trigger.click();
    const content = wrapper.find('.dropdown__content');
    await (content.element as HTMLElement).click();
    expect(content.isVisible()).toBe(true);
  });

  it('Should close when clicking inside dropdown content, when closeOnClick is true', async () => {
    const wrapper = mount(BaseDropdown, {
      props: {
        closeOnClick: true,
      },
    });
    const trigger = wrapper.find('.dropdown__activator').element as HTMLElement;
    trigger.click();
    const content = wrapper.find('.dropdown__content');
    await (content.element as HTMLElement).click();
    expect(content.isVisible()).toBe(false);
  });

  it('Should close on click outside', async () => {
    const OuterElement = {
      template: `
        <section>
          <p>Close</p>
          <BaseDropdown :closeOnClickOutside="false"></BaseDropdown>
        </section>
      `,
      components: {
        BaseDropdown,
      },
    };

    const wrapper = mount(OuterElement);
    const trigger = wrapper.find('.dropdown__activator').element as HTMLElement;
    trigger.click();
    const outerEl = wrapper.find('p');
    (outerEl.element as HTMLElement).click();
    const content = wrapper.find('.dropdown__content');
    expect(content.isVisible()).toBe(false);
  });
});
