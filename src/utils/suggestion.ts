// @ts-ignore
import type { SuggestionProps } from '@tiptap/suggestion/src/suggestion.ts';
import { VueRenderer } from '@tiptap/vue-3';
import { storeToRefs } from 'pinia';
import type { Instance, Props } from 'tippy.js';
import tippy from 'tippy.js';

import MentionList from '@components/Editor/EditorMentions.vue';
import { useAdminUserStore } from '@/stores/admin/usersStore/usersStore';
import { getFilePath } from '@utils/getFilePath';

const { usersList } = storeToRefs(useAdminUserStore());
const { getUsers } = useAdminUserStore();

getUsers();

export default {
  items: ({ query }: { query: string }) => {
    return usersList.value
      .filter(user => user.email.toLowerCase().startsWith(query.toLowerCase()))
      .map(user => {
        const email = user.email;
        const avatar = user.avatar ? getFilePath(user.avatar.mediaUrl) : '/avatarSample.png';
        const username = user.name ? `${user.name} ${user.surname}` : '';
        return { email, avatar, username };
      });
  },

  render: () => {
    let component: VueRenderer | null = null;
    let popup: Instance<Props> | Instance<Props>[] | null = null;

    return {
      onStart: (props: SuggestionProps | SuggestionProps[]) => {
        component = new VueRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          maxWidth: 450,
        });
      },

      onUpdate(props: SuggestionProps | SuggestionProps[]) {
        (component as VueRenderer).updateProps(props);

        if (!props.clientRect) {
          return;
        }

        (popup as Instance<Props>[])[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: SuggestionProps | SuggestionProps[]) {
        if (props?.event.key === 'Escape') {
          (popup as Instance<Props>[])[0].hide();

          return true;
        }

        return component?.ref?.onKeyDown(props.event);
      },

      onExit() {
        (popup as Instance<Props>[])[0].destroy();
        (component as VueRenderer).destroy();
      },
    };
  },
};
