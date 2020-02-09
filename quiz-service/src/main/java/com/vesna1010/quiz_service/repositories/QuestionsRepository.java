package com.vesna1010.quiz_service.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.quiz_service.models.Question;

public interface QuestionsRepository extends JpaRepository<Question, Long> {

	List<Question> findAllByQuizId(Long id);

}
