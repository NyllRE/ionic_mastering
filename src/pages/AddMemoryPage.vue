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
            IonThumbnail( slot="start" )
               img( :src="form.image" v-if="form.image != ''" )
               IonIcon.image-placeholder( v-else :src="images" )
            IonButton( fill="clear" @click="takePhoto" type="button" )
               IonIcon( :icon="camIcon" slot="start" )
               |Take Photo
         IonItem
            IonLabel( position="floating" ) Description 
            IonTextarea( rows="5" v-model="form.description" )
         IonButton( expand="block" fill="outline" type="submit" ) submit

</template>

<script setup>
import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonThumbnail, IonIcon, IonActionSheet } from '@ionic/vue';
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { store } from '@/store';
import { camera, images } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'


const router = useRouter();

const camIcon = ref(camera);

const takePhoto = async () => {
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
   store.dispatch('addMemory', {
      title: form.title,
      image: form.image,
      description: form.description,
   });

   router.replace('/memories')
}

</script>