<template lang="pug">
BaseLayout( title="The Memories" )
   MemoriesList( :memories="memories" )

</template>

<script setup>
import { computed } from 'vue';
import { store } from '@/store'
import MemoriesList from '@/components/memories/MemoriesList.vue';

const memories = computed(() => {
   console.log(store.getters.memories)
   return store.getters.memories;
})

</script>
