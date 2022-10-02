<style lang="scss" scoped>
</style>

<template lang="pug">

IonItem( :router-link="`memories/${memory.id}`" )
   IonThumbnail( slot="start" )
      IonImg( :src="memory.image" :alt="memory.title" )
   IonLabel
      h1 {{ memory.title }}
      h3 {{ memory.description }}
      IonIcon( :icon="icons.add" )
      

</template>

<script setup>
import { defineProps } from 'vue';
import * as icons from 'ionicons/icons';
import { IonItem, IonThumbnail, IonImg, IonLabel, IonIcon } from '@ionic/vue';

const props = defineProps(["memory"])

</script>
