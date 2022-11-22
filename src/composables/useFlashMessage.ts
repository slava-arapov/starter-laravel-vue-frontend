import { ref, Ref } from 'vue';
import { ErrorDictionary } from '@/interfaces/ErrorDictionary';

export function useFlashMessage() {
  const message: Ref<string | null> = ref(null);
  const error: Ref<ErrorDictionary | null> = ref(null);

  return { message, error };
}
