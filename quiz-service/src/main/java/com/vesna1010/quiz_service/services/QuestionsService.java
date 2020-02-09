package com.vesna1010.quiz_service.services;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.vesna1010.quiz_service.models.Question;

public interface QuestionsService {

	List<Question> findAllQuestionsByQuizId(Long id);

	Page<Question> findAllQuestions(Pageable pageable);

	Question findQuestionById(Long id);

	Question saveQuestion(Question question);

	Question updateQuestion(Question question, Long id);

	void deleteQuestionById(Long id);

}
