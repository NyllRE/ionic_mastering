<template lang="pug">
BaseLayout( title="The Memories" )

   template( #actions )
      IonButton( router-link="/memories/add" )
         IonIcon( slot="icon-only" :icon='addIcon' )

   MemoriesList( :memories="store.memories" )

</template>

<script setup>
import { computed, ref } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import MemoriesList from '@/components/memories/MemoriesList.vue';
import { piniaStore } from '@/store'

const store = piniaStore()
const addIcon = ref(add);


</script>
