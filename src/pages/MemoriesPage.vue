<template lang="pug">
BaseLayout( title="The Memories" )

   template( #actions )
      IonButton( router-link="/memories/add" )
         IonIcon( slot="icon-only" :icon='addIcon' )

   MemoriesList( :memories="memories" )

</template>

<script setup>
import { computed, ref } from 'vue';
import { store } from '@/store';
import { IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import MemoriesList from '@/components/memories/MemoriesList.vue';

const addIcon = ref(add);

const memories = computed(() => {
   return store.getters.memories;
})

</script>
