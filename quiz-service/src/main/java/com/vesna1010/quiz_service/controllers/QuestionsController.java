package com.vesna1010.quiz_service.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vesna1010.quiz_service.models.Question;
import com.vesna1010.quiz_service.services.QuestionsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/questions")
public class QuestionsController {

	@Autowired
	private QuestionsService questionsService;

	@GetMapping("/quiz/{id}/{size}")
	public List<Question> findQuestionsByQuizId(@PathVariable Long id, @PathVariable Integer size) {
		List<Question> questions = questionsService.findAllQuestionsByQuizId(id);

		return questions.subList(0, size);
	}

	@GetMapping
	public Page<Question> findAllQuestions(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return questionsService.findAllQuestions(pageable);
	}

	@GetMapping("/{id}")
	public Question findQuestionById(@PathVariable Long id) {
		return questionsService.findQuestionById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Question saveQuestion(@RequestBody Question question) {
		return questionsService.saveQuestion(question);
	}

	@PutMapping("/{id}")
	public Question updateQuestion(@RequestBody Question question, @PathVariable Long id) {
		return questionsService.updateQuestion(question, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuestionById(@PathVariable Long id) {
		questionsService.deleteQuestionById(id);
	}

}
