<template lang="pug">
IonList
   MemoryListItem(
      v-for="memory in memories"
      :key="memory.id"
      :memory="memory"
   )
</template>

<script setup>
import { IonList } from '@ionic/vue'
import { defineProps } from 'vue'
import MemoryListItem from './MemoryListItem.vue';

const props = defineProps(["memories"])
console.log(props.memories);
</script>