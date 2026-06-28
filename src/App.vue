<script setup lang="ts">
import { onMounted } from 'vue';
import { useContentStore } from './store/useContentStore';

const contentStore = useContentStore();

onMounted(() => {
  // Load a default script on startup
  contentStore.loadRecap('scripts/latest-horror-recap.json');
});

const handleProcess = () => {
  // Triggers the local FFmpeg backend
  contentStore.processLocalVideo('raw_footage.mp4', 'processed_clip.mp4');
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 md:p-8">
    <header class="mb-8 border-b border-gray-700 pb-4">
      <h1 class="text-3xl font-bold text-blue-400">Cine Flux Studio</h1>
      <p class="text-sm text-gray-400">Automated Recap Pipeline</p>
    </header>

    <main class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-white">Current Script</h2>
        
        <div v-if="contentStore.isLoading" class="text-gray-400 animate-pulse">
          Fetching from GitHub...
        </div>
        
        <div v-else-if="contentStore.currentRecap">
          <h3 class="text-lg font-medium text-blue-300 mb-2">
            {{ contentStore.currentRecap.title }}
          </h3>
          <p class="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {{ contentStore.currentRecap.script }}
          </p>
        </div>
        
        <div v-else class="text-red-400">
          No script loaded or failed to fetch.
        </div>
      </section>

      <section class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-semibold mb-4 text-white">Render Engine</h2>
          <p class="text-gray-400 mb-6">
            Backend Status: <span class="font-mono text-yellow-400">{{ contentStore.processingStatus }}</span>
          </p>
        </div>

        <button 
          @click="handleProcess"
          :disabled="contentStore.processingStatus === 'Processing...'"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ contentStore.processingStatus === 'Processing...' ? 'Processing Video...' : 'Test FFmpeg Clip Render' }}
        </button>
      </section>
    </main>
  </div>
</template>

