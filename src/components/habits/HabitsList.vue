<template lang="pug">
IonList
   HabitListItem(
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit"
   )
</template>

<script setup>
import { IonList, IonIcon } from '@ionic/vue'
import { defineProps } from 'vue'
import HabitListItem from './HabitListItem.vue';

const props = defineProps(["habits"])
</script>