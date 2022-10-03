<style lang="scss">
.image-placeholder {
   font-size: 3em;
   display: grid;
   place-self: center;
   // justify-content: center;
   height: 100%;
   width: 100%;
}
</style>

<template lang="pug">

BaseLayout( title="add a memory" page-default-back-link="/memories" )
   form.ion-padding( @submit.prevent="saveMemory" )
      IonList
         IonItem 
            IonLabel( position="floating" ) Title
            IonInput( required v-model="form.title" )
         IonItem
            IonButton( fill="clear" type="button" @click="modal = !modal" )
               IonIcon( :icon="happy" slot="start" )
               | Choose Emoji
         IonItem
            IonLabel( position="floating" ) Description 
            IonTextarea( rows="5" v-model="form.description" )
         IonButton( expand="block" fill="outline" type="submit" ) submit


   IonModal( :is-open="modal" )
      IconChooser

</template>

<script setup>
import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonThumbnail, IonIcon, IonActionSheet, IonModal } from '@ionic/vue'
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
import { piniaStore } from '@/store'
import { camera, happy } from 'ionicons/icons'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import * as icons from 'ionicons/icons'
import IconChooser from '../components/habits/IconChooser.vue'


const router = useRouter()
const store = piniaStore()

const modal = ref(false)
const chooseEmoji = async () => {
   const photo = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
   resultType: CameraResultType.Uri,
   source: CameraSource.Camera 
   })

   form.image = photo.webPath;
}

const form = reactive({
   title: '',
   image: '',
   description: '',
})

const saveMemory = () => {
   store.addMemory({
      title: form.title,
      image: form.image,
      description: form.description,
   });

   router.replace('/memories')
}

</script>