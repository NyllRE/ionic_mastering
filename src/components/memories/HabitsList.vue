<template lang="pug">
IonList
   HabitListItem(
      v-for="memory in memories"
      :key="memory.id"
      :memory="memory"
   )
</template>

<script setup>
import { IonList, IonIcon } from '@ionic/vue'
import { defineProps } from 'vue'
import HabitListItem from './HabitListItem.vue';

const props = defineProps(["memories"])
</script>