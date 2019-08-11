$(document).ready(function() {
	$(".form_bal_textfield").draggable({
		helper: function() {
			return getTextFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_bal_textarea").draggable({
		helper: function() {
			return getTextAreaFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_bal_number").draggable({
		helper: function() {
			return getNumberFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_bal_email").draggable({
		helper: function() {
			return getEmailFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_bal_date").draggable({
		helper: function() {
			return getDateFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_bal_radio").draggable({
		helper: function() {
			return getRadioFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_bal_checkbox").draggable({
		helper: function() {
			return getCheckboxFieldHTML();
		},
		connectToSortable: ".form_builder_area"
	});

	$(".form_builder_area").sortable({
		cursor: 'move',
		placeholder: 'placeholder',
		start: function(e, ui) {
			ui.placeholder.height(ui.helper.outerHeight());
		},
		stop: function(ev, ui) {
			getPreview();
		}
	});

	$(".form_builder_area").disableSelection();

	function getTextFieldHTML() {
		var field = generateField();
		var html = '<div class="all_div"> <div class="row li_row"> <div class="col-md-12"> <button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> </div></div></div><hr/><div class="row li_row form_output" data-type="text" data-field="' + field + '"> <div class="col-md-12"> <div class="form-group"> <input type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Enter Question here" required data-field="' + field + '"/> </div></div><div class="col-md-12"> <div class="form-group"> <input type="text" name="correct_answer_text_' + field + '" class="form-control form_correct_answer" placeholder="Correct Answer"/> </div></div></div>';
		return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
	}

	function getNumberFieldHTML() {
		var field = generateField();
		var html = '<div class="all_div"> <div class="row li_row"> <div class="col-md-12"> <button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> </div></div></div><hr/><div class="row li_row form_output" data-type="number" data-field="' + field + '"> <div class="col-md-12"> <div class="form-group"> <input type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Enter Question here" required data-field="' + field + '"/> </div></div><div class="col-md-12"> <div class="form-group"> <input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Placeholder"/> </div></div><div class="col-md-12"> <div class="form-group"> <input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/> </div></div><div class="col-md-12"> <div class="form-group"> <input type="text" name="text_correct_answer' + field + '" class="form-control form_correct_answer" placeholder="Correct Answer"/> </div></div></div>';
		return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
	}

	function getDateFieldHTML() {
		var field = generateField();
		var html = '<div class="all_div"> <div class="row li_row"> <div class="col-md-12"> <button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> </div></div></div><hr/><div class="row li_row form_output" data-type="date" data-field="' + field + '"> <div class="col-md-12"> <div class="form-group"> <input type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Enter Question here" data-field="' + field + '"/> </div></div><div class="col-md-12"> <div class="form-group"> <input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/> </div></div><div class="col-md-12"> <div class="form-group"> <input type="date" name="text_' + field + '" class="form-control form_correct_answer" placeholder="Correct Date (DD/MM/YYYY)"/> </div></div></div>';
		return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
	}

	function getTextAreaFieldHTML() {
		var field = generateField();
		var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="textarea" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Enter Question here" required data-field="' + field + '" /></div></div><div class="col-md-12"> <div class="form-group"> <input type="text" name="correct_answer_text_' + field + '" class="form-control form_correct_answer" placeholder="Correct Answer"/> </div></div></div>';
		return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
	}

	function getRadioFieldHTML() {
		var field = generateField();
		var opt1 = generateField();
		var html = '<div class="all_div"> <div class="row li_row"> <div class="col-md-12"> <button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> </div></div><hr/> <div class="row li_row form_output" data-type="radio" data-field="' + field + '"> <div class="col-md-12"> <div class="form-group"> <input type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Enter Question here" required data-field="' + field + '"/> </div></div><div class="col-md-12"> <div class="form-group"> <div class="mt-radio-list radio_list_' + field + '"> <label class="mt-radio mt-radio-outline"> <input data-opt="' + opt1 + '" type="radio" name="radio_' + field + '" placeholder="Value" answer=false> <p class="r_opt_name_' + opt1 + '">Option</p><span></span></label> </div></div></div></div><div class="row li_row"> <div class="col-md-12"> <div class="field_extra_info_' + field + '"> <div data-field="' + field + '" class="row radio_row_' + field + '" data-opt="' + opt1 + '"> <div class="col-md-6"> <div class="form-group"> <label>Visible Answer</label> <input type="text" placeholder="Option" class="r_opt form-control"/> </div></div><div class="col-md-0"> <div class="form-group"> <label></label> <input type="text" placeholder="Value" class="r_val form-control"/> </div></div><div class="col-md-4"> <div class="form-group"> <div class="col-md-12"> <label for="correct_answer">Correct Answer</label> </div><div class="col-md-12"> <input type="checkbox" name="correct_answer" placeholder="correct" class="rb_checkbox"/> </div></div></div><div class="col-md-1"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" data-field="' + field + '"></i></div></div></div></div></div></div>';
		return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
	}

	function getCheckboxFieldHTML() {
		var field = generateField();
		var opt1 = generateField();
		var html = '<div class="all_div"> <div class="row li_row"> <div class="col-md-12"> <button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> </div></div><hr/> <div class="row li_row form_output" data-type="checkbox" data-field="' + field + '"> <div class="col-md-12"> <div class="form-group"> <input type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Enter Question here" required data-field="' + field + '"/> </div></div><div class="col-md-12"> <div class="form-group"> <div class="mt-checkbox-list checkbox_list_' + field + '"> <label class="mt-checkbox mt-checkbox-outline"> <input data-opt="' + opt1 + '" type="checkbox" name="checkbox_' + field + '" placeholder="Value" answer=false> <p class="c_opt_name_' + opt1 + '">Option</p><span></span></label> </div></div></div></div><div class="row li_row"> <div class="col-md-12"> <div class="field_extra_info_' + field + '"> <div data-field="' + field + '" class="row checkbox_row_' + field + '" data-opt="' + opt1 + '"> <div class="col-md-6"> <div class="form-group"> <label>Visible Answer</label> <input type="text" placeholder="Option" class="c_opt form-control"/> </div></div><div class="col-md-0"> <div class="form-group"> <label></label> <input type="text" placeholder="Value" class="c_val form-control"/> </div></div><div class="col-md-3"> <div class="form-group"> <div class="col-md-12"> <label for="correct_answer">Correct Answer</label> </div><div class="col-md-12"> <input type="checkbox" name="correct_answer" placeholder="correct" class="cb_checkbox"/> </div></div></div><div class="col-md-1"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" data-field="' + field + '"></i></div></div></div></div></div></div>';
		return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
	}

	$(document).on('click', '.add_more_select', function() {
		$(this).closest('.form_builder_field').css('height', 'auto');
		var field = $(this).attr('data-field');
		var option = generateField();
		$('.field_extra_info_' + field).append('<div data-field="' + field + '" class="row select_row_' + field + '" data-opt="' + option + '"><div class="col-md-4"><div class="form-group"><input type="text" placeholder="Option" class="s_opt form-control"/></div></div><div class="col-md-3"><div class="form-group"><input type="text" placeholder="Value" class="s_val form-control"/></div></div><div class="col-md-3"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_select" data-field="' + field + '"></i><i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_select" data-field="' + field + '"></i></div></div>');
		var options = '';
		$('.select_row_' + field).each(function() {
			var opt = $(this).find('.s_opt').val();
			var val = $(this).find('.s_val').val();
			var s_opt = $(this).attr('data-opt');
			options += '<option data-opt="' + s_opt + '" value="' + val + '">' + opt + '</option>';
		});
		$('select[name=select_' + field + ']').html(options);
		getPreview();
	});

	$(document).on('click', '.add_more_radio', function() {
		$(this).closest('.form_builder_field').css('height', 'auto');
		var field = $(this).attr('data-field');
		var option = generateField();
		$('.field_extra_info_' + field).append('<div data-opt="' + option + '" data-field="' + field + '" class="row radio_row_' + field + '"><div class="col-md-6"><div class="form-group"><input type="text" placeholder="Option" class="r_opt form-control" /></div></div><div class="col-md-0"><div class="form-group"><input type="text" placeholder="Value" class="r_val form-control" /></div></div><div class="col-md-3"><div class="form-group"><input type="checkbox" name="correct_answer" placeholder="correct"  class="rb_checkbox"/></div></div><div class="col-md-1"> <i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_radio" data-field="' + field + '"/></div></div>');
		var options = '';
		$('.radio_row_' + field).each(function() {
			var opt = $(this).find('.r_opt').val();
			var val = $(this).find('.r_val').val();
			var checkbox = $(this).find('input[type=checkbox]').is(':checked');

			var s_opt = $(this).attr('data-opt');
			options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="radio" name="radio_' + field + '" placeholder="' + val + ' "answer=" ' + checkbox + '"> <p class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
		});
		$('.radio_list_' + field).html(options);
		getPreview();
	});

	$(document).on('click', '.add_more_checkbox', function() {
		$(this).closest('.form_builder_field').css('height', 'auto');
		var field = $(this).attr('data-field');
		var option = generateField();
		$('.field_extra_info_' + field).append('<div data-opt="' + option + '" data-field="' + field + '" class="row checkbox_row_' + field + '"><div class="col-md-6"><div class="form-group"><input type="text" placeholder="Option" class="c_opt form-control" /></div></div><div class="col-md-0"><div class="form-group"><input type="text" placeholder="Value" class="c_val form-control" /></div></div><div class="col-md-3"><div class="form-group"><div class="col-md-12"><input type="checkbox" name="correct_answer" placeholder="correct" class="cb_checkbox" /></div></div></div><div class="col-md-1"> <i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_checkbox" data-field="' + field + '"/></div></div>');
		var options = '';
		$('.checkbox_row_' + field).each(function() {
			var opt = $(this).find('.c_opt').val();
			var val = $(this).find('.c_val').val();
			var checkbox = $(this).find('input[type=checkbox]').is(':checked');

			var s_opt = $(this).attr('data-opt');
			options += '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + s_opt + '" name="checkbox_' + field + '" type="checkbox" placeholder="' + val + ' "answer=" ' + checkbox + '"> <p class="c_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
		});
		$('.checkbox_list_' + field).html(options);
		getPreview();
	});

	$(document).on('keyup', '.s_opt', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('select[name=select_' + field + ']').find('option[data-opt=' + option + ']').html(op_val);
		getPreview();
	});

	$(document).on('keyup', '.s_val', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('select[name=select_' + field + ']').find('option[data-opt=' + option + ']').val(op_val);
		getPreview();
	});

	$(document).on('keyup', '.r_opt', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('.radio_list_' + field).find('.r_opt_name_' + option).html(op_val);
		getPreview();
	});

	$(document).on('keyup', '.r_val', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('.radio_list_' + field).find('input[data-opt=' + option + ']').val(op_val);
		getPreview();
	});

	$(document).on('keyup', '.c_opt', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('.checkbox_list_' + field).find('.c_opt_name_' + option).html(op_val);
		getPreview();
	});

	$(document).on('keyup', '.c_val', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('.checkbox_list_' + field).find('input[data-opt=' + option + ']').val(op_val);
		getPreview();
	});

	$(document).on('click', '.edit_bal_textfield', function() {
		var field = $(this).attr('data-field');
		var el = $('.field_extra_info_' + field);
		el.html('<div class="form-group"><input type="text" name="label_' + field + '" class="form-control" placeholder="Enter Text Field Label"/></div><div class="mt-checkbox-list"><label class="mt-checkbox mt-checkbox-outline"><input name="req_' + field + '" type="checkbox" placeholder="1"> Required<span></span></label></div>');
		getPreview();
	});

	$(document).on('click', '.remove_bal_field', function(e) {
		e.preventDefault();
		var field = $(this).attr('data-field');
		$(this).closest('.li_' + field).hide('400', function() {
			$(this).remove();
			getPreview();
		});
	});

	$(document).on('click', '.remove_more_select', function() {
		var field = $(this).attr('data-field');
		$(this).closest('.select_row_' + field).hide('400', function() {
			$(this).remove();
			var options = '';
			$('.select_row_' + field).each(function() {
				var opt = $(this).find('.s_opt').val();
				var val = $(this).find('.s_val').val();
				var s_opt = $(this).attr('data-opt');
				options += '<option data-opt="' + s_opt + '" value="' + val + '">' + opt + '</option>';
			});
			$('select[name=select_' + field + ']').html(options);
			getPreview();
		});
	});

	$(document).on('click', '.remove_more_radio', function() {
		var field = $(this).attr('data-field');
		$(this).closest('.radio_row_' + field).hide('400', function() {
			$(this).remove();
			var options = '';
			$('.radio_row_' + field).each(function() {
				var opt = $(this).find('.r_opt').val();
				var val = $(this).find('.r_val').val();
				var checkbox = $(this).find('input[type=checkbox]').is(':checked');

				var s_opt = $(this).attr('data-opt');
				options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="radio" name="radio_' + field + '" value="' + val + ' "answer=" ' + checkbox + '"> <p class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
			});
			$('.radio_list_' + field).html(options);
			getPreview();
		});
	});

	$(document).on('click', '.remove_more_checkbox', function() {
		var field = $(this).attr('data-field');
		$(this).closest('.checkbox_row_' + field).hide('400', function() {
			$(this).remove();
			var options = '';
			$('.checkbox_row_' + field).each(function() {
				var opt = $(this).find('.c_opt').val();
				var val = $(this).find('.c_val').val();
				var s_opt = $(this).attr('data-opt');
				options += '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + s_opt + '" name="checkbox_' + field + '" type="checkbox" value="' + val + '"> <p class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
			});
			$('.checkbox_list_' + field).html(options);
			getPreview();
		});
	});

	$(document).on('click', '.rb_checkbox', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');
		$('.field_extra_info_' + field).find('input[type=checkbox]').each(function() {
			this.checked = false;
			$('.radio_list_' + field).find('input[type=radio]').attr('answer', false);

		});
		this.checked = true;

		$('.radio_list_' + field).find('input[data-opt=' + option + ']').attr('answer', $(this).is(':checked'));
		getPreview();
	});

	$(document).on('click', '.cb_checkbox', function() {
		var op_val = $(this).val();
		var field = $(this).closest('.row').attr('data-field');
		var option = $(this).closest('.row').attr('data-opt');

		$('.checkbox_list_' + field).find('input[data-opt=' + option + ']').attr('answer', $(this).is(':checked'));
		getPreview();
	});

	$(document).on('keyup', '.form_input_button_class', function() {
		getPreview();
	});

	$(document).on('keyup', '.form_input_button_value', function() {
		getPreview();
	});

	$(document).on('change', '.form_input_req', function() {
		getPreview();
	});

	$(document).on('keyup', '.form_input_placeholder', function() {
		getPreview();
	});

	$(document).on('keyup', '.form_input_label', function() {
		getPreview();
	});

	$(document).on('keyup', '.form_input_name, .form_correct_answer', function() {
		getPreview();
	});


	function generateField() {
		return Math.floor(Math.random() * (100000 - 1 + 1) + 57);
	}

	function getPreview(plain_html = '') {
		var el = $('.form_builder_area .form_output');
		var html = [];
		el.each(function() {
			var data_type = $(this).attr('data-type');

			var label = $(this).find('.form_input_label').val();
			var name = $(this).find('.form_input_name').val();
			if(data_type === 'text') {

				var option_html = {
					"type": "text",
					"subtype": "text",
					"label": $(this).find('.form_input_label').val(),
					"placeholder": $(this).find('.form_input_placeholder').val(),
					"name": $(this).find('.form_input_name').val(),
					"className": "form-control",
					"correct_answer": $(this).find('.form_correct_answer').val()
				};

				html.push(option_html);
			}
			if(data_type === 'number') {
				var option_html = {
					"type": "number",
					"subtype": "text",
					"label": $(this).find('.form_input_label').val(),
					"placeholder": $(this).find('.form_input_placeholder').val(),
					"name": $(this).find('.form_input_name').val(),
					"className": "form-control",
					"correct_answer": $(this).find('.form_correct_answer').val()
				};


				html.push(option_html);
			}

			if(data_type === 'textarea') {

				var option_html = {
					"type": "paragraph",
					"subtype": "p",
					"label": label,
					"placeholder": $(this).find('.form_input_placeholder').val()
				};

				html.push(option_html);
			}

			if(data_type === 'date') {
				var option_html = {
					"type": "date",
					"label": $(this).find('.form_input_label').val(),
					"placeholder": "Date (DD/MM/YYYY)",
					"name": $(this).find('.form_input_name').val(),
					"className": "form-control",
					"correct_answer": $(this).find('.form_correct_answer').val()
				};


				html.push(option_html);
			}

			if(data_type === 'radio') {
				var option_html = {
					"type": "radio-group",
					"label": label,
					"name": "radio-group-" + ($.now()),
					"values": []
				};

				$(this).find('.mt-radio').each(function() {
					var option = $(this).find('p').html();
					var value = $(this).find('input[type=radio]').val();
					var answer = $(this).find('input[type=radio]').attr('answer');
					radio_group = {}
					radio_group['label'] = option
					radio_group['value'] = value
					radio_group['is_answer'] = answer
					console.log(radio_group)
					option_html['values'].push(radio_group)
				});
				html.push(option_html);
			}

			if(data_type === 'checkbox') {
				var option_html = {
					"type": "checkbox-group",
					"label": label,
					"name": "checkbox-group-" + ($.now()),
					"values": []
				};
				$(this).find('.mt-checkbox').each(function() {
					var option = $(this).find('p').html();
					var value = $(this).find('input[type=checkbox]').val();
					var answer = $(this).find('input[type=checkbox]').attr('answer');

					checkbox_group = {}
					checkbox_group['label'] = option
					checkbox_group['value'] = value
					checkbox_group['is_answer'] = answer
					option_html['values'].push(checkbox_group)
				});

				html.push(option_html);
			}
		});

		if(html.length) {
			$('.export_html').show();
		} else {
			$('.export_html').hide();
		}
		if(plain_html === 'html') {
			$('.preview').hide();
			$('.plain_html').show().find('textarea').val(JSON.stringify(html));
		} else {
			$('.plain_html').hide();
			$('.preview').html(JSON.stringify(html)).show();
		}
		var array = html;

		result_json =  JSON.stringify(html)
	}

});