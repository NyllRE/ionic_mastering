<script setup>
import { defineProps } from 'vue';
import {
   IonItem,
   IonThumbnail,
   IonLabel,
   IonIcon,
} from '@ionic/vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

   dayjs.extend(relativeTime);
   const props = defineProps(['habit']);

</script>


<template lang="pug">
IonItem
   IonThumbnail( slot="start" :router-link="`/habits/${habit.id}`" )
      IonIcon.icon( :icon="habit.icon" :style="{color: habit.color}" )

   IonLabel( :router-link="`/habits/${habit.id}`" )
      h1 {{ habit.title }}
      h3 {{ dayjs(habit.date).from() }}
</template>

<style lang="scss">
	ion-item {
		height: 4.5em;
		ion-thumbnail {
			// centers the icon placement
			display: flex;
			justify-content: center;
			align-items: center;
			.icon {
				font-size: 2.5em;
			}
		}
	}
</style>