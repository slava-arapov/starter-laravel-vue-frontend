import * as API from '@/services/API';

export default {
  async uploadFile(payload: { endpoint: string, file: FormData | null }): Promise<void> {
    await API.apiClient.post(payload.endpoint, payload.file);
  }
};
