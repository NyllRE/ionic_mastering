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
            v-for="(icon, idx) in icons"
          )
            IonCol.ion-align-self-center(
               v-if="!idx.includes('Outline') && !idx.includes('Sharp')" 
               size="4"
               key="idx"
            )
               IonIcon.icon( :icon="icon" @click="choose(idx)" )
               p {{ idx.charAt(0).toUpperCase() + idx.slice(1).match(/[A-Za-z][a-z]*/g).join(" ") }}
</template>


<script setup>
import * as icons from 'ionicons/icons'
import { IonIcon, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/vue';
import { defineEmits } from 'vue';

const emits = defineEmits(['chosen'])

const choose = (idx) => {
   emits('chosen', icons[idx])
}

</script>
