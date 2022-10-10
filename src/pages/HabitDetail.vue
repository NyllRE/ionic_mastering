<style lang="scss" scoped>

.icon-holder {
   font-size: 6em;
   margin: .5em 0;
}

.normal {
   font-size: 16px;
   margin: 0;
}

ion-item {
   height: 7em;
}


.days {
   display: flex;
   width: 100%;
   justify-content: space-evenly;
   .day {
      display: flex;
      flex-direction: column;
      align-items: center;
      ion-checkbox {
         --size: 30px;
         --background-checked: var(--ion-color-primary-tint);
         
         
         &::part(container) {
            border-radius: 8px;
            padding: .15em;
            border: 2px solid var(--ion-color-primary-tint);
         }
      }
      .b {
         font-family: 'Quicksand', sans-serif;
      }
   }
}


</style>


<template lang="pug">

BaseLayout(
   :title="habit ? habit.title : 'No habit found :/'"
   page-default-back-link="/habits"
)
   .ion-text-center( v-if="habit" )

      .icon-holder
         IonIcon(
            :icon="habit.icon"  @click="notify"
            :style="{color: habit.color}" )
         p.normal(style="font-weight: 500;") {{ dayjs(habit.date).from() }}

      IonList.days
         IonItem( v-for="idx in [4,3,2,1,0]" lines="none" )
            .day
               IonCheckbox(
                  :checked="habitIncludesToday(idx)"
                  @ion-change="checkABox(idx)"
               )
               IonLabel.b(:style="{'font-weight': idx == 0 ? 'bold' : '500'}") {{ dayjs(new Date()).subtract(idx, 'day').format('DD/MM') }}



      HabitComments( :comments="habit.comments" :habitId="id" )

   h1( v-else ) memory not found


</template>

<script setup>
import { ref } from 'vue';
import { piniaStore } from '@/store'
import HabitComments from '@/components/habits/HabitComments.vue'

import { IonIcon, IonItem, IonLabel, IonList, IonCheckbox } from '@ionic/vue'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)



const store = piniaStore()
const id = ref(window.location.pathname.split('/')[2])

const habit = ref(store.habit(id.value))
const habitIncludesToday = (idx) => {
   return habit.value.progress.includes(dayjs(new Date()).subtract(idx, 'day').format('DD/MM/YY'))
}


//=>> Checkboxes


const checkABox = (idx) => {
   const date = dayjs(new Date()).subtract(idx, 'day').format('DD/MM/YY');
   store.changeProgress(id.value, date)
}
</script>