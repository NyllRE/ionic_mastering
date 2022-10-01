<style lang="scss">
.b {
   font-weight: bold;
}
</style>


<template lang="pug">

BaseLayout( :title="memory ? memory.title : 'No Memory :/'" page-default-back-link="/memories" )
   .content( v-if="memory" ) 
      IonImg( :src="memory.image" )
      h1.ion-text-center.b {{ memory.title }}
      p.ion-text-center {{ memory.description }}
   h1( v-else ) memory not found


</template>

<script setup>
import { ref, computed } from 'vue';
import { IonImg } from '@ionic/vue'
import { store } from '@/store'

const id = ref(window.location.pathname.split('/')[2])

const memory = computed(() => {
   return store.getters.memory(id.value)
})

console.log(store.getters.memory(id.value));

</script>