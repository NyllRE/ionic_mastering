<style lang="scss" scoped>
.icon {
   font-size: 3em;
}
.remover {
   font-size: 2em;
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
   
   IonButton( slot="end" @click="deleter(habit.id)" fill="clear" )
      IonIcon.remover( :icon="trashBinOutline" )
      

</template>

<script setup>
import { defineProps } from 'vue';
import { trashBinOutline } from 'ionicons/icons';
import { IonItem, IonThumbnail, IonLabel, IonIcon, IonButton } from '@ionic/vue';
import { piniaStore } from '@/store';

const props = defineProps(["habit"])
const store = piniaStore()

const deleter = (id) => {
   console.log(id);
   store.removeHabit(id);
}

</script>
