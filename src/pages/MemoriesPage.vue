<template lang="pug">
BaseLayout( title="The Memories" )
   IonList 
      IonItem(
         v-for="memory in memories"
         :router-link="`memories/${memory.id}`"
         :key='memory.id'
      ) 
         IonThumbnail( slot="start" )
            IonImg( :src="memory.image" :alt="memory.title" )
         IonLabel
            h1 {{ memory.title }}
            h3 {{ memory.description }}

</template>

<script setup>
import { IonList, IonItem, IonImg, IonThumbnail, IonLabel } from '@ionic/vue';
import { computed } from 'vue';
import { store } from '@/store'

const memories = computed(() => {
   console.log(store.getters.memories)
   return store.getters.memories;
})

</script>
