// see conversation version
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchRecapData, type RecapContent } from '../services/githubService';

export const useContentStore = defineStore('content', () => {
  const currentRecap = ref<RecapContent | null>(null);
  const isLoading = ref<boolean>(false);
  const processingStatus = ref<string>('Idle');

  const loadRecap = async (path: string) => {
    isLoading.value = true;
    currentRecap.value = await fetchRecapData(path);
    isLoading.value = false;
  };

  const processLocalVideo = async (inputFile: string, outputFile: string) => {
    processingStatus.value = 'Processing...';
    try {
      const response = await fetch('http://localhost:3000/api/process-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputFileName: inputFile, outputFileName: outputFile }),
      });
      const data = await response.json();
      processingStatus.value = data.status === 'success' ? 'Completed!' : 'Failed';
    } catch (error) {
      console.error(error);
      processingStatus.value = 'Error connecting to local backend';
    }
  };

  return { currentRecap, isLoading, processingStatus, loadRecap, processLocalVideo };
});
