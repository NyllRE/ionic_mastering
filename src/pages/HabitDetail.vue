<style lang="scss">

.icon {
   font-size: 5em
}

</style>


<template lang="pug">

BaseLayout(
   :title="habit ? habit.title : 'No Memory :/'"
   page-default-back-link="/memories"
)
   .ion-text-center( v-if="habit" ) 
      IonIcon.icon( :icon="habit.icon" )
      p {{ habit.dailyComment }}

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

// console.log(store.habit(id.value));

</script>