import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useSupportStore = defineStore('support store', () => {
  const topic = ref<string>('');
  const deadline = ref<string>('');
  const file = ref<string>('');
  const msg = ref<string>('');

  const clearFields = () => {
    topic.value = '';
    deadline.value = '';
    file.value = '';
    msg.value = '';
  };

  const submitMessage = () => {
    alert('Submitted');
    clearFields();
  };

  return { topic, deadline, file, msg, clearFields, submitMessage };
});
