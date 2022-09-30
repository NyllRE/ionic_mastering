<template lang="pug">
IonPage
   IonHeader
      IonToolbar
         IonTitle {{ title }}
         IonButtons( slot="start" )
            IonBackButton
         IonButtons( slot="end" )
            slot( name="actions" )
   IonContent 
      slot
</template>

<script setup>
import {
   IonPage,
   IonToolbar,
   IonHeader,
   IonTitle,
   IonContent,
   IonButtons,
   IonBackButton,
} from '@ionic/vue'
import {defineProps} from 'vue'
const props = defineProps(['title'])
</script>