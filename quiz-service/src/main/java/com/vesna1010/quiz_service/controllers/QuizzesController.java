package com.vesna1010.quiz_service.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.SortDefault;
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
import com.vesna1010.quiz_service.models.Quiz;
import com.vesna1010.quiz_service.services.QuizzesService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/quizzes")
public class QuizzesController {

	@Autowired
	private QuizzesService quizzesService;

	@GetMapping
	public List<Quiz> findAllQuizzes(@SortDefault(sort = "id", direction = Direction.ASC) Sort sort) {
		return quizzesService.findAllQuizzes(sort);
	}

	@GetMapping("/{id}")
	public Quiz findQuizById(@PathVariable Long id) {
		return quizzesService.findQuizById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Quiz saveQuiz(@RequestBody Quiz quiz) {
		return quizzesService.saveQuiz(quiz);
	}

	@PutMapping("/{id}")
	public Quiz updateQuiz(@RequestBody Quiz quiz, @PathVariable Long id) {
		return quizzesService.updateQuiz(quiz, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuizById(@PathVariable Long id) {
		quizzesService.deleteQuizById(id);
	}

}
