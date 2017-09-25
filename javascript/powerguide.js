var questions = {
				type: {
					question_text: 'What type of data do you have?',
					question_explanation: 'Data comes in different types',
					answers: [
						{ 
							text: 'Continuous',
							explanation: 'Continuous data is something like height or weight',
						},
						{
							text: 'Categorical',
							explanation: 'Categorical data is something like yes/no, black/white',
						}
					],
					multiple_choice: true,
					text_input: false,
				},

				normal: {
					question_text: 'Is your data normal?',
					question_explanation: 'Relies on a mean and stdev being meaningful',
					answers: [
						{ 
							text: 'Yes',
							explanation: 'Normal data has a symmetrical distribution around a central mean',
						},
						{
							text: 'No',
							explanation: 'Non-normal data can have skewed, biased or even bimodal distributions',
						}
					],
					multiple_choice: true,
					text_input: false,
				},
		}

var question = 'type'

var app = new Vue({
	el: '#app',

	data: {
		question_text: '',
		question_explanation: '',
		answers: '',
		selected_answer: '',
		answer_explanation: '',
		multiple_choice: true,
		text_input: false,
		user_answers: [],
	},


	created : function () {
		this.question = 'type';
		this.refresh_question();
	},

	methods: {

		next_question: function () {

			this.user_answers.push(this.question,this.selected_answer)

			if (this.question == 'type') {
				this.question='normal'
			}
			else {
				this.question='type'
			}	
			this.refresh_question()
		},

		refresh_question: function () {
			this.multiple_choice = questions[this.question].multiple_choice;
			this.selected_answer = questions[this.question].text_input;
			this.question_text = questions[this.question].question_text;
			this.question_explanation = questions[this.question].question_explanation;
			this.answers = questions[this.question].answers;
			this.selected_answer = '';
			this.answer_explanation = '';

		},

	}
})


