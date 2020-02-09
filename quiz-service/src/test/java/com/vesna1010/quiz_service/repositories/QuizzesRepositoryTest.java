package com.vesna1010.quiz_service.repositories;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import com.vesna1010.quiz_service.models.Quiz;

public class QuizzesRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private QuizzesRepository quizzesRepository;

	@Test
	public void findAllQuizzesBySortTest() {
		List<Quiz> quizzes = quizzesRepository.findAll(SORT);

		assertThat(quizzes, hasSize(3));
	}

	@Test
	public void findAllQuizzesByPageTest() {
		Page<Quiz> page = quizzesRepository.findAll(PAGEABLE);

		assertThat(page.getContent(), hasSize(3));
		assertThat(page.getTotalPages(), is(1));
	}

	@Test
	public void findQuizByIdTest() {
		Optional<Quiz> optional = quizzesRepository.findById(1L);
		Quiz quiz = optional.get();

		assertThat(quiz.getName(), is("Quiz A"));
		assertThat(quiz.getQuestions(), hasSize(5));
	}

	@Test(expected = NoSuchElementException.class)
	public void findQuizByIdNotFoundTest() {
		Optional<Quiz> optional = quizzesRepository.findById(4L);

		optional.get();
	}

	@Test
	public void saveQuizTest() {
		Quiz quiz = new Quiz("Quiz D");

		quiz = quizzesRepository.save(quiz);

		assertNotNull(quiz.getId());
	}

	@Test
	public void deleteQuizByIdTest() {
		quizzesRepository.deleteById(1L);

		assertFalse(quizzesRepository.existsById(1L));
	}

}
