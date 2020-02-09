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
import com.vesna1010.quiz_service.enums.Answer;
import com.vesna1010.quiz_service.enums.Points;
import com.vesna1010.quiz_service.models.Question;
import com.vesna1010.quiz_service.models.Quiz;

public class QuestionsRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private QuestionsRepository questionsRepository;

	@Test
	public void findQuestionsByQuizIdTest() {
		List<Question> questions = questionsRepository.findAllByQuizId(1L);

		assertThat(questions, hasSize(5));
	}

	@Test
	public void findAllQuestionsTest() {
		Page<Question> page = questionsRepository.findAll(PAGEABLE);

		assertThat(page.getContent(), hasSize(5));
		assertThat(page.getTotalPages(), is(2));
	}

	@Test
	public void findQuestionByIdTest() {
		Optional<Question> optional = questionsRepository.findById(1L);
		Question question = optional.get();

		assertThat(question.getText(), is("Question A"));
	}

	@Test(expected = NoSuchElementException.class)
	public void findQuestionByIdNotFoundTest() {
		Optional<Question> optional = questionsRepository.findById(8L);

		optional.get();
	}

	@Test
	public void saveQuestionTest() {
		Quiz quiz = new Quiz(1L, "Quiz A");
		Question question = new Question("Question E", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A, quiz,
				Points.TEN);

		question = questionsRepository.save(question);

		assertNotNull(question.getId());
	}

	@Test
	public void deleteQuestionByIdTest() {
		questionsRepository.deleteById(1L);

		assertFalse(questionsRepository.existsById(1L));
	}
}
