import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/vue-3';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';

import { computed, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import suggestion from '@utils/suggestion';
import { icons } from '@/utils/icons';
import type { EditorOptions } from '@/types/Editor';

export const useEditorOptions = (placeholder: string, initialValue: string = '') => {
  const { locale, t } = useI18n();

  const editor = useEditor({
    content: `<p>${initialValue}</p>`,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      TextStyle,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: true,
      }),
      Youtube.configure({
        ccLanguage: 'en',
      }),
      CharacterCount.configure({
        mode: 'nodeSize',
      }),
      Placeholder.configure({
        placeholder,
      }),
      Superscript,
      Subscript,
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Emoji.configure({
        emojis: gitHubEmojis,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
      }),
    ],
  });

  watch(
    locale,
    async () => {
      await nextTick();
      if (editor.value) {
        editor.value.extensionManager.extensions.filter(
          extension => extension.name === 'placeholder'
        )[0].options['placeholder'] = t(placeholder);
        editor.value?.view.dispatch(editor.value.state.tr);
      }
    },
    { immediate: true }
  );

  const popupOptions = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'orderedList',
    'bulletList',
    'left',
    'center',
    'right',
    'justify',
    'addLink',
    'removeLink',
  ];

  const tableSettingsOptions = [
    'colBefore',
    'colAfter',
    'colDelete',
    'rowBefore',
    'rowAfter',
    'rowDelete',
    'deleteTable',
  ];

  const secondaryPanelOptions = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'orderedList',
    'bulletList',
    'addLink',
    'removeLink',
  ];

  const mainPanelOptions = [
    'undo',
    'redo',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'orderedList',
    'bulletList',
    'code',
    'removeLink',
    'paragraph',
    'blockquote',
  ];

  const headingOptions = ['heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6'];

  const alignOptions = ['left', 'center', 'right', 'justify'];

  const addLink = () => {
    const previousUrl = editor.value?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.value?.chain().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.value
      ?.chain()

      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };

  const resetStyling = () => {
    editor.value?.chain().clearNodes().run();
    editor.value?.chain().unsetAllMarks().run();
  };

  const editorOptions = computed(
    (): EditorOptions => ({
      undo: {
        icon: icons.editorIcons.backward,
        title: 'Undo',
        name: 'undo',
        disabled: !editor.value?.can().chain().undo().run(),
        action: editor?.value?.chain().undo().run,
      },
      redo: {
        icon: icons.editorIcons.forward,
        title: 'Redo',
        name: 'redo',
        disabled: !editor.value?.can().chain().redo().run(),
        action: editor.value?.chain().redo().run,
      },
      bold: {
        icon: icons.editorIcons.bold,
        title: 'Bold',
        name: 'bold',
        action: editor.value?.chain().toggleBold().run,
        active: editor.value?.isActive('bold'),
        disabled: !editor.value?.can().chain().toggleBold().run(),
      },
      italic: {
        icon: icons.editorIcons.italic,
        title: 'Italic',
        name: 'italic',
        action: editor.value?.chain().toggleItalic().run,
        active: editor.value?.isActive('italic'),
        disabled: !editor.value?.can().chain().toggleItalic().run(),
      },
      underline: {
        icon: icons.editorIcons.underline,
        title: 'Underline',
        name: 'underline',
        action: editor.value?.chain().toggleUnderline().run,
        active: editor.value?.isActive('underline'),
        disabled: !editor.value?.can().chain().toggleUnderline().run(),
      },
      strikethrough: {
        icon: icons.editorIcons.strikethrough,
        title: 'Strikethrough',
        name: 'strikethrough',
        action: editor.value?.chain().toggleStrike().run,
        active: editor.value?.isActive('strike'),
        disabled: !editor.value?.can().chain().toggleStrike().run(),
      },
      subscript: {
        icon: icons.editorIcons.subscript,
        title: 'Subscript',
        name: 'subscript',
        action: editor.value?.chain().toggleSubscript().run,
        active: editor.value?.isActive('subscript'),
        disabled: !editor.value?.can().chain().toggleSubscript().run(),
      },
      superscript: {
        icon: icons.editorIcons.superscript,
        title: 'Superscript',
        name: 'superscript',
        action: editor.value?.chain().toggleSuperscript().run,
        active: editor.value?.isActive('superscript'),
        disabled: !editor.value
          ?.can()
          .chain()

          .toggleSuperscript()
          .run(),
      },
      left: {
        icon: icons.editorIcons.alignLeft,
        title: 'Left',
        name: 'left',
        active: editor.value?.isActive({ textAlign: 'left' }),
        action: editor.value?.chain().setTextAlign('left').run,
      },
      right: {
        icon: icons.editorIcons.alignRight,
        title: 'Right',
        name: 'right',
        active: editor.value?.isActive({ textAlign: 'right' }),
        action: editor.value?.chain().setTextAlign('right').run,
      },
      center: {
        icon: icons.editorIcons.alignCenter,
        title: 'Center',
        name: 'center',
        active: editor.value?.isActive({ textAlign: 'center' }),
        action: editor.value?.chain().setTextAlign('center').run,
      },
      justify: {
        icon: icons.editorIcons.alignJustify,
        title: 'Justify',
        name: 'justify',
        active: editor.value?.isActive({ textAlign: 'justify' }),
        action: editor.value?.chain().setTextAlign('justify').run,
      },
      orderedList: {
        icon: icons.editorIcons.orderedList,
        title: 'Ordered list',
        name: 'orderedList',
        active: editor.value?.isActive('orderedList'),
        action: editor.value?.commands.toggleOrderedList,
      },
      bulletList: {
        icon: icons.editorIcons.bulletList,
        title: 'Unordered list',
        name: 'bulletList',
        active: editor.value?.isActive('bulletList'),
        action: editor.value?.commands.toggleBulletList,
      },
      code: {
        icon: icons.editorIcons.code,
        title: 'Insert code',
        name: 'code',
        action: editor.value?.chain().toggleCode().run,
        active: editor.value?.isActive('code'),
      },
      codeblock: {
        icon: icons.editorIcons.codeblock,
        title: 'Insert codeblock',
        name: 'codeblock',
        action: editor.value?.chain().toggleCodeBlock().run,
        active: editor.value?.isActive('codeBlock'),
      },
      addLink: {
        icon: icons.editorIcons.link,
        title: 'Add link',
        name: 'addLink',
        active: editor.value?.isActive('link'),
        action: addLink,
      },
      removeLink: {
        icon: icons.editorIcons.unlink,
        title: 'Remove link',
        name: 'removeLink',
        action: editor.value?.chain().unsetLink().run,
        disabled: !editor.value?.isActive('link'),
      },
      divider: {
        icon: icons.editorIcons.divider,
        title: 'Add dividing line',
        name: 'divider',
        active: editor.value?.isActive('bulletList'),
        action: editor.value?.chain().setHorizontalRule().run,
      },
      paragraph: {
        icon: icons.editorIcons.paragraph,
        title: 'Paragraph',
        name: 'paragraph',
        active: editor.value?.isActive('paragraph'),
        action: editor.value?.chain().setParagraph().run,
      },
      heading1: {
        icon: icons.editorIcons.heading1,
        title: 'Heading 1',
        name: 'heading1',
        active: editor.value?.isActive('heading', { level: 1 }),
        action: editor.value?.chain().toggleHeading({ level: 1 }).run,
      },
      heading2: {
        icon: icons.editorIcons.heading2,
        title: 'Heading 2',
        name: 'heading2',
        active: editor.value?.isActive('heading', { level: 2 }),
        action: editor.value?.chain().toggleHeading({ level: 2 }).run,
      },
      heading3: {
        icon: icons.editorIcons.heading3,
        title: 'Heading 3',
        name: 'heading3',
        active: editor.value?.isActive('heading', { level: 3 }),
        action: editor.value?.chain().toggleHeading({ level: 3 }).run,
      },
      heading4: {
        icon: icons.editorIcons.heading4,
        title: 'Heading 4',
        name: 'heading4',
        active: editor.value?.isActive('heading', { level: 4 }),
        action: editor.value?.chain().toggleHeading({ level: 4 }).run,
      },
      heading5: {
        icon: icons.editorIcons.heading5,
        title: 'Heading 5',
        name: 'heading5',
        active: editor.value?.isActive('heading', { level: 5 }),
        action: editor.value?.chain().toggleHeading({ level: 5 }).run,
      },
      heading6: {
        icon: icons.editorIcons.heading6,
        title: 'Heading 6',
        name: 'heading6',
        active: editor.value?.isActive('heading', { level: 6 }),
        action: editor.value?.chain().toggleHeading({ level: 6 }).run,
      },
      blockquote: {
        icon: icons.editorIcons.quotes,
        title: 'Blockquote',
        name: 'blockquote',
        action: editor.value?.chain().toggleBlockquote().run,
        active: editor.value?.isActive('blockquote'),
      },
      reset: {
        icon: icons.editorIcons.reset,
        title: 'Reset all styling',
        name: 'reset',
        action: resetStyling,
      },
      colBefore: {
        icon: icons.editorIcons.quotes,
        title: 'Insert column before',
        name: 'colBefore',
        action: editor.value?.chain().addColumnBefore().run,
      },
      colAfter: {
        icon: icons.editorIcons.quotes,
        title: 'Insert column after',
        name: 'colAfter',
        action: editor.value?.chain().addColumnAfter().run,
      },
      colDelete: {
        icon: icons.editorIcons.quotes,
        title: 'Delete column',
        name: 'colDelete',
        action: editor.value?.chain().deleteColumn().run,
      },
      rowBefore: {
        icon: icons.editorIcons.quotes,
        title: 'Insert row before',
        name: 'rowBefore',
        action: editor.value?.chain().addRowBefore().run,
      },
      rowAfter: {
        icon: icons.editorIcons.quotes,
        title: 'Insert row after',
        name: 'rowAfter',
        action: editor.value?.chain().addRowAfter().run,
      },
      rowDelete: {
        icon: icons.editorIcons.quotes,
        title: 'Delete row',
        name: 'rowDelete',
        action: editor.value?.chain().deleteRow().run,
      },
      deleteTable: {
        icon: icons.editorIcons.quotes,
        title: 'Delete table',
        name: 'deleteTable',
        action: editor.value?.chain().deleteTable().run,
      },
    })
  );

  return {
    editor,
    popupOptions,
    secondaryPanelOptions,
    mainPanelOptions,
    headingOptions,
    editorOptions,
    alignOptions,
    tableSettingsOptions,
  };
};
