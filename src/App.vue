<!-- @format -->

<template lang="pug">
  
ion-app
  ion-router-outlet

</template>
<script>
	import { PushNotifications } from '@capacitor/push-notifications';
	import { LocalNotifications } from '@capacitor/local-notifications';
	import { IonApp, IonRouterOutlet } from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'App',
		components: {
			IonApp,
			IonRouterOutlet,
		},
	});
</script>

<script setup>
	import { useLocalStorage } from '@vueuse/core';
	import { onMounted } from 'vue';
	import Tabs from './pages/Tabs.vue';

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	onMounted(async () => {
		const version = window.localStorage.getItem('storageVersion');
		if (version == '0.1.4') {
			// dont do anything
		} else {
			//=> do the data migration
			window.localStorage.setItem('storageVersion', '0.1.4');
		}
		await sleep(5);
		await LocalNotifications.requestPermissions();

		await LocalNotifications.addListener(
			'localNotificationActionPerformed',
			(notification) => {
				console.log('Notification action received', notification.actionId);
			}
		);
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
						{
							id: 'open',
							title: 'Open app',
						},
						{
							id: 'respond',
							title: 'Respond',
							input: true,
						},
					],
				},
			],
		});

		// 4.
		LocalNotifications.schedule({
			notifications: [
				{
					id: 1,
					title: 'Sample title',
					body: 'Sample body',
					actionTypeId: 'your_choice',
				},
			],
		});

		// 5.
		LocalNotifications.addListener(
			'localNotificationActionPerformed',
			(notification) => {
				console.log(
					`Notification ${notification.notification.title} was ${notification.actionId}ed.`
				);
			}
		);
	});
</script>
