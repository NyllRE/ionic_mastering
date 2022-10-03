<style lang="scss">
.b {
   font-weight: bold;
}

</style>


<template lang="pug">

BaseLayout( :title="habit ? habit.title : 'No Memory :/'" page-default-back-link="/memories" )
   .content.ion-text-center( v-if="habit" ) 
      IonIcon( :icon="habit.icon" )
      h1.ion-text-center.b {{ habit.title }}
      p {{ habit.description }}
   h1( v-else ) memory not found


</template>

<script setup>
import { ref, computed } from 'vue';
import { IonIcon } from '@ionic/vue'
import { piniaStore } from '@/store'

const store = piniaStore()
const id = ref(window.location.pathname.split('/')[2])

const habit = computed(() => {
   return store.habit(id.value)
})

console.log(store.habit(id.value));

</script>