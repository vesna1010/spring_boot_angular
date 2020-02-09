package com.vesna1010.quiz_service.services;

import java.util.List;
import org.springframework.data.domain.Sort;
import com.vesna1010.quiz_service.models.Quiz;

public interface QuizzesService {

	List<Quiz> findAllQuizzes(Sort sort);

	Quiz findQuizById(Long id);

	Quiz saveQuiz(Quiz quiz);

	Quiz updateQuiz(Quiz quiz, Long id);

	void deleteQuizById(Long id);

}
