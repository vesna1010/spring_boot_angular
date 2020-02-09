package com.vesna1010.quiz_service.services.impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.vesna1010.quiz_service.models.Question;
import com.vesna1010.quiz_service.repositories.QuestionsRepository;
import com.vesna1010.quiz_service.services.QuestionsService;

@Transactional
@Service
public class QuestionsServiceImpl implements QuestionsService {

	@Autowired
	private QuestionsRepository questionsRepository;

	@Override
	public List<Question> findAllQuestionsByQuizId(Long id) {
		List<Question> questions = questionsRepository.findAllByQuizId(id);
		Collections.shuffle(questions);

		return questions;
	}

	@Override
	public Page<Question> findAllQuestions(Pageable pageable) {
		return questionsRepository.findAll(pageable);
	}

	@Override
	public Question findQuestionById(Long id) {
		Optional<Question> optional = questionsRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No question with id " + id));
	}

	@Override
	public Question saveQuestion(Question question) {
		return questionsRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question, Long id) {
		if (!questionsRepository.existsById(id)) {
			throw new RuntimeException("No question with id " + id);
		}

		return questionsRepository.save(question);
	}

	@Override
	public void deleteQuestionById(Long id) {
		if (!questionsRepository.existsById(id)) {
			throw new RuntimeException("No question with id " + id);
		}

		questionsRepository.deleteById(id);
	}

}
