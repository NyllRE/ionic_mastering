<template lang="pug">

IonItem(
   :router-link="`memories/${memory.id}`"
) 
   IonThumbnail( slot="start" )
      IonImg( :src="memory.image" :alt="memory.title" )
   IonLabel
      h1 {{ memory.title }}
      h3 {{ memory.description }}
</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps(["memory"])

</script>