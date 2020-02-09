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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import com.vesna1010.quiz_service.enums.Answer;
import com.vesna1010.quiz_service.enums.Points;
import com.vesna1010.quiz_service.models.Question;
import com.vesna1010.quiz_service.models.Quiz;
import com.vesna1010.quiz_service.repositories.QuestionsRepository;

public class QuestionsServiceTest extends BaseServiceTest {

	@MockBean
	private QuestionsRepository questionsRepository;
	@Autowired
	private QuestionsService questionsService;

	@Test
	public void findAllQuestionsByQuizIdTest() {
		when(questionsRepository.findAllByQuizId(1L)).thenReturn(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY)));

		List<Question> questions = questionsService.findAllQuestionsByQuizId(1L);

		assertThat(questions, hasSize(2));
		verify(questionsRepository, times(1)).findAllByQuizId(1L);
	}

	@Test
	public void findAllQuestionsTest() {
		when(questionsRepository.findAll(PAGEABLE)).thenReturn(new PageImpl<Question>(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY))));

		Page<Question> page = questionsService.findAllQuestions(PAGEABLE);

		assertThat(page.getContent(), hasSize(2));
		verify(questionsRepository, times(1)).findAll(PAGEABLE);
	}

	@Test
	public void findQuestionByIdTest() {
		when(questionsRepository.findById(1L)).thenReturn(Optional.of(new Question(1L, "Question A", "Answer A",
				"Answer B", "Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN)));

		Question question = questionsService.findQuestionById(1L);

		assertThat(question.getText(), is("Question A"));
		verify(questionsRepository, times(1)).findById(1L);
	}

	@Test(expected = RuntimeException.class)
	public void findQuestionByIdNotFoundTest() {
		when(questionsRepository.findById(1L)).thenReturn(Optional.empty());

		questionsService.findQuestionById(1L);
	}

	@Test
	public void saveQuestionTest() {
		Question question = new Question("Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionsRepository.save(question)).thenReturn(new Question(1L, "Question A", "Answer A", "Answer B",
				"Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN));

		Question questionSaved = questionsService.saveQuestion(question);

		assertThat(questionSaved.getId(), is(1L));
		verify(questionsRepository, times(1)).save(question);
	}

	@Test
	public void updateQuestionTest() {
		Question question = new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionsRepository.existsById(1L)).thenReturn(true);
		when(questionsRepository.save(question)).thenReturn(question);

		question = questionsService.updateQuestion(question, 1L);

		assertThat(question.getText(), is("Question A"));
		verify(questionsRepository, times(1)).existsById(1L);
		verify(questionsRepository, times(1)).save(question);
	}

	@Test(expected = RuntimeException.class)
	public void updateQuestionNotFoundTest() {
		Question question = new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionsRepository.existsById(1L)).thenReturn(false);
		when(questionsRepository.save(question)).thenReturn(question);

		question = questionsService.updateQuestion(question, 1L);
	}

	@Test
	public void deleteQuestionByIdTest() {
		when(questionsRepository.existsById(1L)).thenReturn(true);
		doNothing().when(questionsRepository).deleteById(1L);

		questionsService.deleteQuestionById(1L);

		verify(questionsRepository, times(1)).existsById(1L);
		verify(questionsRepository, times(1)).deleteById(1L);
	}

	@Test(expected = RuntimeException.class)
	public void deleteQuestionByIdNotFoundTest() {
		when(questionsRepository.existsById(1L)).thenReturn(false);
		doNothing().when(questionsRepository).deleteById(1L);

		questionsService.deleteQuestionById(1L);
	}

}
