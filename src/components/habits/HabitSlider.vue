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
   background: linear-gradient(to right, red, #4f4)
   display: flex
   position: absolute
   flex-direction: row
   align-items: center
   justify-content: space-between
   height: 4em
   width: 100%

</style>