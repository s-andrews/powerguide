var app = new Vue({
	el: '#app',
	data: {
		question_text: 'What is your name',
		question_explanation: 'We need to know what to call you for the rest of the day',
		answers: [
			{ text: 'Option 1' },
			{ text: 'Option 2' },
			{ text: 'Option 3' },
			{ text: 'Option 4' },
		],
		selected_answer: 'no answer'
	},

	methods: {
		next_question: function () {
			this.question_text = 'What is your quest'
		}
	}
})

