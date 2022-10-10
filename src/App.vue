<template lang="pug">
  
ion-app
  ion-router-outlet

</template>
<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted } from 'vue'
import Tabs from './pages/Tabs.vue';

onMounted(() => {
  const version = window.localStorage.getItem('storageVersion')
  if (version == '0.1.4') {
    // dont do anything
  } else {
    //=> do the data migration
    window.localStorage.setItem('storageVersion', '0.1.4')
  }
  

})
</script>