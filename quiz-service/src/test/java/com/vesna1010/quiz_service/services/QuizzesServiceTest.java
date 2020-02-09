package com.vesna1010.quiz_service.services;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.vesna1010.quiz_service.models.Quiz;
import com.vesna1010.quiz_service.repositories.QuizzesRepository;

public class QuizzesServiceTest extends BaseServiceTest {

	@MockBean
	private QuizzesRepository quizzesRepository;
	@Autowired
	private QuizzesService quizzesService;

	@Test
	public void findAllQuizzesTest() {
		when(quizzesRepository.findAll(SORT)).thenReturn(Arrays.asList(new Quiz(1L, "Quiz A"), new Quiz(2L, "Quiz B")));

		List<Quiz> quizzes = quizzesService.findAllQuizzes(SORT);

		assertThat(quizzes, hasSize(2));
		verify(quizzesRepository, times(1)).findAll(SORT);
	}

	@Test
	public void findQuizByIdTest() {
		when(quizzesRepository.findById(1L)).thenReturn(Optional.of(new Quiz(1L, "Quiz A")));

		Quiz quiz = quizzesService.findQuizById(1L);

		assertThat(quiz.getName(), is("Quiz A"));
		verify(quizzesRepository, times(1)).findById(1L);
	}

	@Test(expected = RuntimeException.class)
	public void findQuizByIdNotFoundTest() {
		when(quizzesRepository.findById(1L)).thenReturn(Optional.empty());

		quizzesService.findQuizById(1L);
	}

	@Test
	public void saveQuizTest() {
		Quiz quiz = new Quiz("Quiz");

		when(quizzesRepository.save(quiz)).thenReturn(new Quiz(1L, "Quiz"));

		Quiz quizSaved = quizzesService.saveQuiz(quiz);

		assertThat(quizSaved.getId(), is(1L));
		verify(quizzesRepository, times(1)).save(quiz);
	}

	@Test
	public void updateQuizTest() {
		Quiz quiz = new Quiz(1L, "Quiz");

		when(quizzesRepository.save(quiz)).thenReturn(quiz);
		when(quizzesRepository.existsById(1L)).thenReturn(true);

		quiz = quizzesService.updateQuiz(quiz, 1L);

		assertThat(quiz.getName(), is("Quiz"));
		verify(quizzesRepository, times(1)).existsById(1L);
		verify(quizzesRepository, times(1)).save(quiz);
	}

	@Test(expected = RuntimeException.class)
	public void updateQuizNotFoundTest() {
		Quiz quiz = new Quiz(1L, "Quiz");

		when(quizzesRepository.save(quiz)).thenReturn(quiz);
		when(quizzesRepository.existsById(1L)).thenReturn(false);

		quiz = quizzesService.updateQuiz(quiz, 1L);
	}

	@Test
	public void deleteQuizByIdTest() {
		when(quizzesRepository.existsById(1L)).thenReturn(true);
		doNothing().when(quizzesRepository).deleteById(1L);

		quizzesService.deleteQuizById(1L);

		verify(quizzesRepository, times(1)).existsById(1L);
		verify(quizzesRepository, times(1)).deleteById(1L);
	}

	@Test(expected = RuntimeException.class)
	public void deleteQuizByIdNotFoundTest() {
		when(quizzesRepository.existsById(1L)).thenReturn(false);
		doNothing().when(quizzesRepository).deleteById(1L);

		quizzesService.deleteQuizById(1L);
	}

}
