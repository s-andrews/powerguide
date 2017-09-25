var questions = {
				type: {
					question_text: 'What type of data do you have?',
					question_explanation: 'Data comes in different types',
					answers: [
						{ text: 'Continuous' },
						{ text: 'Categorical' }
					]
				},

				normal: {
					question_text: 'Is your data normal?',
					question_explanation: 'Relies on a mean and stdev being meaningful',
					answers: [
						{ text: 'Yes' },
						{ text: 'No' }
					]
				},
		}

var question = 'type'

var app = new Vue({
	el: '#app',

	data: {
		question_text: questions[question].question_text,
		question_explanation: questions[question].question_explanation,
		answers: questions[question].answers,
		selected_answer: 'no answer'
	},

	methods: {
		next_question: function () {
			this.question = 'normal';
			this.question_text = questions[this.question].question_text;
			this.question_explanation = questions[this.question].question_explanation;
			this.answers = questions[this.question].answers;
			this.selected_answer = 'no answer'
		}
	}
})

