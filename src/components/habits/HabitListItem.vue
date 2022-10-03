<style lang="scss" scoped>
.icon {
   font-size: 3em;
}
.remover {
   font-size: 1.4em;
}
ion-thumbnail {
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>

<template lang="pug">

IonItem
   IonThumbnail( slot="start" :router-link="`/habits/${habit.id}`" )
      IonIcon.icon( :icon="habit.icon" :style="{color: habit.color}" )
   
   IonLabel( :router-link="`/habits/${habit.id}`" )
      h1 {{ habit.title }}
      h3 {{ habit.description }}
   
   IonButton( slot="end" @click="deleter" )
      IonIcon.remover( :icon="trashBinOutline" )
      

</template>

<script setup>
import { defineProps } from 'vue';
import { trashBinOutline } from 'ionicons/icons';
import { IonItem, IonThumbnail, IonImg, IonLabel, IonIcon } from '@ionic/vue';
import { piniaStore } from '@/store';

const props = defineProps(["habit"])
const store = piniaStore()

const deleter = (id) => {
   store.removeHabit(props.habit.id);
}

</script>
