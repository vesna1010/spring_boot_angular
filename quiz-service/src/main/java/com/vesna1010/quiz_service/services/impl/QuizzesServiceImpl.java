package com.vesna1010.quiz_service.services.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.vesna1010.quiz_service.models.Quiz;
import com.vesna1010.quiz_service.repositories.QuizzesRepository;
import com.vesna1010.quiz_service.services.QuizzesService;

@Transactional
@Service
public class QuizzesServiceImpl implements QuizzesService {

	@Autowired
	private QuizzesRepository quizzesRepository;

	@Override
	public List<Quiz> findAllQuizzes(Sort sort) {
		return quizzesRepository.findAll(sort);
	}

	@Override
	public Quiz findQuizById(Long id) {
		Optional<Quiz> optional = quizzesRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No quiz with id " + id));
	}

	@Override
	public Quiz saveQuiz(Quiz quiz) {
		return quizzesRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz, Long id) {
		if (!quizzesRepository.existsById(id)) {
			throw new RuntimeException("No quiz with id " + id);
		}

		return quizzesRepository.save(quiz);
	}

	@Override
	public void deleteQuizById(Long id) {
		if (!quizzesRepository.existsById(id)) {
			throw new RuntimeException("No quiz with id " + id);
		}

		quizzesRepository.deleteById(id);
	}

}
