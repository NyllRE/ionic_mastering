<style lang="scss">
.ion-align-self-center {
   text-align: center;
   height: 8em;
}
.icon {
   font-size: 2em;
}
</style>


<template lang="pug">
IonHeader
   IonToolbar
      IonTitle Choose Emoji
      IonButtons( slot="start" )
         IonBackButton
IonContent( role="feed" )
   IonGrid
      IonRow( role="article" )
         template(
            v-for="(icon, name) in icons"
          )
            IonCol.ion-align-self-center(
               v-if="!name.includes('Outline') && !name.includes('Sharp')" 
               size="4"
               key="idx"
            )
               IonIcon.icon( :icon="icon" @click="choose(name)" )
               p {{ name.charAt(0).toUpperCase() + name.slice(1).match(/[A-Za-z][a-z]*/g).join(" ") }}
</template>


<script setup>
import * as icons from 'ionicons/icons'
import { IonIcon, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/vue';
import { defineEmits } from 'vue';

const emits = defineEmits(['chosen'])

const choose = (name) => {
   console.log(name.charAt(0).toUpperCase() + name.slice(1).match(/[A-Za-z][a-z]*/g).join(" "));
   emits(
      'chosen',
      [
         icons[name],
         name.charAt(0).toUpperCase() + name.slice(1).match(/[A-Za-z][a-z]*/g).join(" ")
      ]
   )
}

</script>
