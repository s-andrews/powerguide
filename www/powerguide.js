var questions = {

				type: {
					question_text: 'What type of data do you have?',
					question_explanation: 'Data comes in different types and different statistical tests apply to different types of data. In this case we just need to know the general nature of the measures you\'ll be analysing.',
					answers: [
						{ 
							text: 'Continuous',
							explanation: 'Continuous data is something like height or weight. It can potentially adopt any value and the precision is limited only by the accuracy of the measurement.',
						},
						{
							text: 'Categorical',
							explanation: 'Categorical data is something like yes/no, black/white.  It is where the measures are simply the counts of the number of observations for the different categories.',
						}
					],
					multiple_choice: true,
					text_input: false,
				},

				normal: {
					question_text: 'Are your data normally distributed?',
					question_explanation: 'Most statistical tests on quantitative data assume that replicates will produce measures which follow a normal distribution.  These types of data show a symmetrical distribution around a central average value, and the distribution can be summarised by 2 values - the mean (average) and the standard deviation',
					answers: [
						{ 
							text: 'Yes',
							explanation: 'The data is either naturally normally distributed or can be made to be so through a simple transformation such as log transforming.',
						},
						{
							text: 'No',
							explanation: 'The data has a more unusual distribution with skews, subgroups or other characterisitcs which mean that it can\'t be made to behave normally.',
						}
					],
					multiple_choice: true,
					text_input: false,
				},

				groups: {
					question_text: 'How many experimental conditions do you have?',
					question_explanation: 'We need to know how many deliberately different biological conditions you will study in the experiment. There are often different statistics which are used depending on how many conditions are in the design.',
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

				group_number: {
					question_text: 'Exactly how many experimental conditions do you have?',
					question_explanation: 'Where there are more than 2 groups the power to detect changes will depend on exactly how many there are.',
					multiple_choice: false,
					text_input: true,
				},

				effect_size: {
					question_text: 'What is the minimum difference you would consider to be biologically relevant?',
					question_explanation: 'Statistical tests generally don\'t care about the size of an effect, just how reproducible it is.  You should therefore also think about the smallest absolute difference which you would consider to be biologically interesting.  In general, smaller effects will require higher sample numbers in order to confidently detect them.',
					multiple_choice: false,
					text_input: true,
				},

				variance: {
					question_text: 'What is your expected level of variation between samples in the same condition?',
					question_explanation: 'The value we need is the standard deviation, ie how far on average each individually measured value is likely to fall from the mean',
					multiple_choice: false,
					text_input: true,
				},

				variance_between: {
					question_text: 'What is your expected level of variation between the means of different groups?',
					question_explanation: 'When comparing multiple (more than 2) groups we also need an estimate of how much noise will be in the means of the different groups if no biological change is occurring.',
					multiple_choice: false,
					text_input: true,
				},


				power: {
					question_text: 'How likely (in percent) do you want to make it that you will detect a minimal effect if it is present?',
					question_explanation: 'No statistical test can guarantee that you will detect a change, even if it is happening.  You are always sampling from a population so there is an element of uncertainty. Normally most power analyses will use an 80% chance of detection but you could increase this somewhat if you wanted to be more sure of detecting any change which was present.',
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
		question_number: 1
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
				if (this.selected_answer =="") {
					return;
				}
				this.user_answers[this.question] = this.selected_answer;
			}
			else {
				if (this.text_answer == null || this.text_answer == "") {
					return;
				}
				// Check that what they've provided is actually a number

				if (isNaN(parseFloat(this.text_answer)) || !isFinite(this.text_answer)) {
					return;
				}	
				this.user_answers[this.question] = this.text_answer;
			}

			this.question_number += 1;

			switch(this.question) {

				case "type":
					this.question = 'groups';
					break;	

				case 'groups':
					if (this.user_answers['groups'] == '3+') {
						this.question = 'group_number';
					}
					else {
						if (this.user_answers['type'] == 'Continuous') {
							this.question = 'normal'
						}
						else {
							this.question = 'start_proportion'
						}
					}
					break

				case 'group_number':
					if (this.user_answers['type'] == 'Continuous') {
						this.question = 'normal'
					}
					else {
						this.question = 'start_proportion'
					}
					break;


				case 'start_proportion':
					if (this.user_answers['groups'] == '1') {
						this.question = 'power'
					}
					else {
						this.question = 'end_proportion'
					}	
					break

				case 'end_proportion':
					this.question = 'power'
					break

				case 'normal':
					this.question = 'effect_size';
					break
				
				case 'effect_size':
					this.question = 'variance';
					break
				
				case 'variance':
					if (this.user_answers['type'] == 'Continuous' && this.user_answers['groups'] == '3+') {
						this.question = 'variance_between'
					}
					else {
						this.question = 'power';
					}
					break

				case 'variance_between':
					this.question = 'power';
					break

				case 'power':
					this.question = 'significance';
					break

				case 'significance':
					url = "powerguide.py?"

					for (key in this.user_answers) {
						url += key
						url += "="
						url += this.user_answers[key]
						url += "&"
					}	

					window.location.href=url
					break;

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
			this.text_answer = '';
			this.answer_explanation = '';

		},

	}
})


