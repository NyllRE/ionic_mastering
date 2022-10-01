<template lang="pug">

BaseLayout( title="add a memory" page-default-back-link="/memories" )
   form.ion-padding( @submit.prevent="saveMemory" )
      IonList
         IonItem 
            IonLabel( position="floating" ) Title
            IonInput( required v-model="form.title" )
         IonItem
            IonLabel( position="floating" ) Image URL
            IonInput( type='url' required v-model="form.image" )
         IonItem
            IonLabel( position="floating" ) Description 
            IonTextarea( rows="5" v-model="form.description" )
         IonButton( expand="block" fill="outline" type="submit" ) submit

</template>

<script setup>
import BaseLayout from '@/components/base/BaseLayout.vue';
import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import { store } from '@/store'

const router = useRouter();

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