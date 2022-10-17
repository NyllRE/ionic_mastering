<!-- @format -->

<script setup>
	import BaseLayout from '@/components/base/BaseLayout.vue';
	import { LocalNotifications } from '@capacitor/local-notifications';
	import { IonButton, pickerController, IonContent } from '@ionic/vue'
	import { ref, reactive, computed } from 'vue';

	const time = reactive({
		limit: 20,
		passed: 0,
		timerInterval: null,
		isOn: false
	});


	const timeLimit = ref(60 * 5);
	const timePassed = ref(0);
	const timeLeft = computed(() => timeLimit.value - timePassed.value);
	
const startTimer = async () => {
		time.isOn = true
		clearInterval(time.timerInterval);
		time.timerInterval = setInterval( () => {
			timePassed.value += 1;
			if (timeLeft.value <= 0) {
				clearInterval(time.timerInterval);
				time.isOn = false
			}
		}, 1000)
		await LocalNotifications.registerActionTypes({
			types: [
				{
					id: 'your_choice',
					actions: [
						{
							id: 'dismiss',
							title: 'Dismiss',
							destructive: true,
						},
						// {
						// 	id: 'open',
						// 	title: 'Open app',
						// },
						{
							id: 'respond',
							title: 'Respond',
							input: true,
						},
					],
				},
			],
		})

		// 4. https://youtu.be/bww4a4B43tM
		LocalNotifications.schedule({
			notifications: [
				{
					id: 1,
					title: 'Timer Finished!',
					body:
						`the ${timeLimit.value / 60} minute timer has finished`,
					actionTypeId: 'your_choice',
					schedule: {at: new Date(Date.now() + 1000 * timeLimit.value) }
				},
			],
		})

	};

	const formattedTimeLeft = computed(() => {
		const timeLeftConst = timeLeft.value;
		// The largest round integer less than or equal to the result of time divided being by 60.
		const minutes = Math.floor(timeLeftConst / 60);
		// Seconds are the remainder of the time divided by 60 (modulus operator)
		let seconds = timeLeftConst % 60;
		// If the value of seconds is less than 10, then display seconds with a leading zero
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		// The output in MM:SS format
		return `${minutes}:${seconds}`;
	});


	const timeFraction = computed(() => {
		return (1 / timeLimit.value) * (1 - timeLeft.value / timeLimit.value);
	});
	const circleDasharray = computed(() => {
		return `${(timeFraction.value * 3000).toFixed(0)} 283`;
	});

	const timeGenerator = (time) => {
		let listy = []
		for (let i=5; i <= time; i+=5) {
			listy.push({text: String(i), value: i})
		}
		return listy
	};

	const timePicker = async () => {
		if (time.isOn) return;	
        const picker = await pickerController.create({
          columns: [
            {
              name: 'minutes',
              options: timeGenerator(90)
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Confirm',
              handler: (value) => {
					  timeLimit.value = 60 * value.minutes.value
					// timeLimit.value = 10
              },
            },
          ],
        });
        await picker.present();
	}
</script>

<template lang="pug">

BaseLayout( title="Timer Page" )
	.timer
		svg(
			class="base-timer__svg"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg" )
			g.base-timer__circle
				circle.base-timer__path-elapsed(
					cx="50"
					cy="50"
					r="45" )
				path.base-timer__path-remaining(
					:stroke-dasharray="circleDasharray"
					d=" M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0 "
				)

		span.base-timer__label( @click="timePicker" ) {{ formattedTimeLeft }}
	
	br
	br
	IonButton( @click="startTimer" expand="full" shape="round" v-if="!time.isOn" ) Start Timer
	IonButton( expand="full" shape="round" fill="clear" color="danger" v-else ) stop timer

</template>

<style scoped lang="scss">
	/* Sets the containers height and width */
	.timer {
		display: flex;
		justify-content: center;
		align-items: center;
		// padding-top: 5px;

	}
	.base-timer {
		position: relative;
		width: 300px;
		height: 300px;
		/* Removes SVG styling that would hide the time label */
		
		&__circle {
			fill: none;
			stroke: none;
		}
		
		/* The SVG path that displays the timer's progress */
		&__path-elapsed {
			stroke-width: 0.43em;
			stroke:rgb(181, 181, 181);
		}
		
		&__label {
			position: absolute;
			
			/* Size should match the parent container */
			width: 97%;
			height: 381px;
			/* Keep the label aligned to the top */
			top: 6px;
			/* Create a flexible box that centers content vertically and horizontally */
			display: flex;
			align-items: center;
			justify-content: center;
			/* Sort of an arbitrary number; adjust to your liking */
			font-size: 48px;
			border-radius: 100em
		}

		&__path-remaining {
			/* Just as thick as the original ring */
			stroke-width: 7px;
			/* Rounds the line endings to create a seamless circle */
			stroke-linecap: round;
			/* Makes sure the animation starts at the top of the circle */
			transform: rotate(90deg);
			transform-origin: center;
			/* One second aligns with the speed of the countdown timer */
			transition: 1s linear all;
			/* Allows the ring to change color when the color value updates */
			stroke: rgb(65, 184, 131); // green
		}

		&__svg {
			/* Flips the svg and makes the animation to move left-to-right */
			transform: scaleX(-1);
		}
	}
</style>
