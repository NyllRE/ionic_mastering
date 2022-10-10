<template lang="pug">
BaseLayout( title="Your Habits" )

   template( #actions )
      IonButton( router-link="/habits/add" )
         IonIcon( slot="icon-only" :icon='addIcon' )


   HabitsList( :habits="store.habits" )

</template>

<script setup>
import { computed, ref } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import HabitsList from '@/components/habits/HabitsList.vue';
import { piniaStore } from '@/store'

const store = piniaStore()
const addIcon = ref(add);


</script>
