package com.vesna1010.quiz_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.quiz_service.models.Quiz;

public interface QuizzesRepository extends JpaRepository<Quiz, Long> {

}
