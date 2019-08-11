require "km_assignment/version"

module KmAssignment

  class Engine < ::Rails::Engine;end
  class Error < StandardError; end

  class QuestionsParser
    def self.parse_formbuilder_json(formbuilder_json)
      form_fields = JSON.parse(formbuilder_json)
      form_fields = form_fields.map do |form_field|
        #Converting the openstruct 
        form_field = OpenStruct.new(form_field)
        field_type = form_field.type
        field_subtype = form_field.subtype
        if ["checkbox-group","radio-group"].include?(field_type)
           processed_field =  proccess_radio_checkbox_field(form_field)
        else
         processed_field =  process_text_field(form_field)  
       end 
        processed_field.to_h.to_json
      end
      return form_fields
     end
  
      
      def self.process_result(quiz_questions,user_answers)
        quiz_questions =  quiz_questions.map{|q| OpenStruct.new(JSON.parse(q))}.select{|q| q.valid}
        analysis_per_question = {}
        total_correct_answer = 0
        total_questions = quiz_questions.length
        quiz_questions.each do |quiz_question|
          analysis_per_question[quiz_question.id] = {}
          analysis_per_question[quiz_question.id][:question] = quiz_question.question
          analysis_per_question[quiz_question.id][:candidate_answer] = (user_answers[quiz_question.id].kind_of?(Array) ? user_answers[quiz_question.id].join(",") : user_answers[quiz_question.id])
          analysis_per_question[quiz_question.id][:correct_answer] = (quiz_question.correct_answer.kind_of?(Array) ? quiz_question.correct_answer.join(",") : quiz_question.correct_answer)
          if check_answer(quiz_question,user_answers[quiz_question.id])
            analysis_per_question[quiz_question.id][:remarks] = "correct" 
            total_correct_answer += 1
          else
            analysis_per_question[quiz_question.id][:remarks] = "incorrect"
          end
        end
        return {
          analysis_per_question: analysis_per_question,
          result_summary: {
            generated_on: Time.now,
            total_questions: total_questions,
            total_correct_answers: total_correct_answer,
            rating: (total_correct_answer / total_questions.to_f) * 100.0 
          }
        }
      end  

  private

  def self.check_answer(form_field,candidate_answer)
    is_correct = false
    if ["radio","checkbox"].include?(form_field.html_input_type)
      if form_field.html_input_type == "checkbox"
        is_correct = true if (form_field.correct_answer.map { |i| i.downcase } - candidate_answer.map { |i| i.downcase }).empty?
      elsif form_field.html_input_type == "radio"
        is_correct = true if candidate_answer[0].downcase == form_field.correct_answer[0].downcase     
      end  
    elsif ["text","textarea"].include?(form_field.html_input_type)  
      is_correct = true if candidate_answer.downcase == form_field.correct_answer.downcase
    end  
    return is_correct
  end
  
  def self.process_text_field(field)
    quiz_form_field = OpenStruct.new({})
    quiz_form_field.id = SecureRandom.hex(16)
    quiz_form_field.html_input_type = field.type
    quiz_form_field.question = field.label
    quiz_form_field.correct_answer = field.correct_answer
    quiz_form_field.valid = check_validity(quiz_form_field)
    return quiz_form_field
  end

  def self.check_validity(field)
    (!field.question.blank? && !field.correct_answer.blank?) ? true : false
  end
  
  def self.proccess_radio_checkbox_field(field)
    quiz_form_field = OpenStruct.new({})
    quiz_form_field.html_input_type = (field.type == "checkbox-group" ? "checkbox" : "radio" )
    quiz_form_field.id = SecureRandom.hex(16)
    quiz_form_field.question = field.label
    quiz_form_field.choices = []
    quiz_form_field.correct_answer = []
    field.values = field.values.each_with_index do |choice,index|
      quiz_form_field.choices.append(choice["label"])
      puts (choice["is_answer"].strip() == "true"),choice["label"],choice["is_answer"] 
      quiz_form_field.correct_answer.append(choice["label"]) if choice["is_answer"].strip() == "true"          
    end
    quiz_form_field.valid = check_validity(quiz_form_field)
    return  quiz_form_field
  end
  end
end
