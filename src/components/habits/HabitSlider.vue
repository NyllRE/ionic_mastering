<script setup>
import { IonIcon } from '@ionic/vue'
import { trashBinOutline, archiveOutline } from 'ionicons/icons' 
</script>

<template lang="pug">

.wrapper 
   .column
      IonIcon.ion-margin-start( color="light" :icon="trashBinOutline" )
   .column.ion-text-right
      IonIcon.ion-margin-end( color="light" :icon="archiveOutline" )

</template>

<style lang="sass">
.wrapper
   background: red
   display: flex
   // position: absolute
   flex-direction: row
   align-items: center
   height: 3em
   width: 100%

   .column
      display: flex
      flex: 1
      flex-basis: 100%
      flex-direction: column
</style>