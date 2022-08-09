export { onSuccess, onError };
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';

function onSuccess() {
  success({
    text: 'We found some pics for you',
    styling: 'material',
    delay: 2000,
  });
}
function onError() {
  error({
    text: 'Something wrong',
    styling: 'material',
    delay: 2000,
  });
}
