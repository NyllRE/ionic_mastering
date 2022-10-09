<style lang="sass">
ion-list
   padding: 0 !important
</style>

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
import HabitListItem from './HabitItemHolder.vue';

const props = defineProps(["habits"])
</script>