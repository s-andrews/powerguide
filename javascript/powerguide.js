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

				groups: {
					question_text: 'How many experimental conditions do you have?',
					question_explanation: 'Different tests are appropriate for different numbers of comparisons',
					answers: [
						{ 
							text: '1',
							explanation: 'A single condition will be compared to a fixed value (usually zero)',
						},
						{
							text: '2',
							explanation: 'Two conditions will be compared to each other',
						},
						{
							text: '3+',
							explanation: 'Multiple conditions will be tested for a difference between any of them',
						}

					],
					multiple_choice: true,
					text_input: false,
				},

				effect_size: {
					question_text: 'What is the minimum difference you would consider to be biologically relevant?',
					question_explanation: 'Use whatever units you would use to measure the data',
					multiple_choice: false,
					text_input: true,
				},

				variance: {
					question_text: 'What is your expected level of variation between samples in the same condition?',
					question_explanation: 'Use whatever units you would use to measure the data',
					multiple_choice: false,
					text_input: true,
				},

				power: {
					question_text: 'How likely (in percent) do you want to make it that you will detect a minimal effect if it is present?',
					question_explanation: 'Normally most power analyses will use an 80% chance of detection',
					multiple_choice: false,
					text_input: true,
				},

				significance: {
					question_text: 'What statistical cutoff (p-value) do you want to use to identify hits?',
					question_explanation: 'Normally most power analyses will use a p-value cutoff of 0.05',
					multiple_choice: false,
					text_input: true,
				},

				start_proportion: {
					question_text: 'What is your expected proportion of your first category in your background?',
					question_explanation: 'This is what you\'d normally expect to see before changing anything in your system',
					multiple_choice: false,
					text_input: true,
				},

				end_proportion: {
					question_text: 'What would be the proportion of a condition which you considered to be interesting?',
					question_explanation: 'Enter the closest value to your expected proportion which you would consider to be biologically interesting',
					multiple_choice: false,
					text_input: true,
				},
		}

	



var question = 'type'

var app = new Vue({
	el: '#app',

	data: {
		question_text: '',
		question_explanation: '',
		answers: [],
		selected_answer: '',
		text_answer: '',
		answer_explanation: '',
		multiple_choice: true,
		text_input: false,
		user_answers: {},
	},


	created : function () {
		this.question = 'type';
		this.refresh_question();
	},

	methods: {

		update_explanation: function (explanation) {
			this.answer_explanation = explanation
		},

		next_question: function () {

			if (questions[this.question].multiple_choice) {
				this.user_answers[this.question] = this.selected_answer;
			}
			else {
				this.user_answers[this.question] = this.text_answer;
			}		

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
			this.text_input = questions[this.question].text_input;
			this.selected_answer = questions[this.question].text_input;
			this.question_text = questions[this.question].question_text;
			this.question_explanation = questions[this.question].question_explanation;
			this.answers = questions[this.question].answers;
			this.selected_answer = '';
			this.answer_explanation = '';

		},

	}
})


