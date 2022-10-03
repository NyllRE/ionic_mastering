<style lang="scss" scoped>
.icon {
   font-size: 3em;
}
ion-thumbnail {
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>

<template lang="pug">

IonItem( :router-link="`/habits/${habit.id}`" )
   IonThumbnail( slot="start" )
      IonIcon.icon( :icon="icons[habit.icon]" )
   IonLabel
      h1 {{ habit.title }}
      h3 {{ habit.description }}
      

</template>

<script setup>
import { defineProps } from 'vue';
import * as icons from 'ionicons/icons';
import { IonItem, IonThumbnail, IonImg, IonLabel, IonIcon } from '@ionic/vue';
const props = defineProps(["habit"])

</script>
