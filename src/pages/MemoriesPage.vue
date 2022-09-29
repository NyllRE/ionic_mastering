<template lang="pug">
BaseLayout( title="The Memories" )
   MemoriesList

</template>

<script setup>
import { computed } from 'vue';
import { store } from '@/store'
import MemoriesList from '#/memories/MemoriesList.vue';

const memories = computed(() => {
   console.log(store.getters.memories)
   return store.getters.memories;
})

</script>
