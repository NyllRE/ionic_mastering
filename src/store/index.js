import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core'
import { codeSlash } from 'ionicons/icons';


const randomId = () => {
	return String(Math.floor(Math.random() * (10 ** 10)))
}

export const piniaStore = defineStore('main', {
	state: () => ({
		habits: useLocalStorage('vueUseMain', [
			{
				id: String(Math.floor(Math.random() * (10 ** 10))),
				date: new Date(),
				title: 'Github Commit',
				comments: [
					{
						text: 'You can Add Comments here Each day',
						date: new Date(),
						id: randomId()
					},
					{
						text: 'just like a diary, this way you can track your moods :)',
						date: new Date(),
						id: randomId(),
					}
				],
				color: '#339',
				icon: codeSlash,
			},
		])
	}),
	getters: {
		habit(state) {
			return (id) =>
				state.habits.find((habit) => habit.id === id)
		},
	},
	actions: {
		addHabit(habit) {
			this.habits.unshift({
				id: String(Math.floor(Math.random() * (10 ** 10))),
				date: new Date(),
				title: habit.title,
				comments: [],
				color: habit.color,
				icon: habit.icon,
			});
		},
		removeHabit(habitId) {
			this.habits.splice(this.habit(habitId), 1);
		},
		addComment(habitId, comment) {
			const habit = this.habit(habitId)
			habit.comments.unshift({
				text: comment,
				id: randomId(),
				date: new Date(),
			})
		},
		removeComment(habitId, commentId) {
			const habit = this.habits.find((habit) => habit.id === habitId)
			console.log(habit);
			const comment = habit
				.comments.find(
					(comment) => comment.id === commentId
				)
			habit.comments.splice(comment, 1)
		}
	}
})