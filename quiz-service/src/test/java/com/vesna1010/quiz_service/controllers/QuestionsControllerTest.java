package com.vesna1010.quiz_service.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.Arrays;
import org.junit.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import com.vesna1010.quiz_service.controllers.QuestionsController;
import com.vesna1010.quiz_service.enums.Answer;
import com.vesna1010.quiz_service.enums.Points;
import com.vesna1010.quiz_service.models.Question;
import com.vesna1010.quiz_service.models.Quiz;
import com.vesna1010.quiz_service.services.QuestionsService;

@WebMvcTest(QuestionsController.class)
public class QuestionsControllerTest extends BaseControllerTest {

	@MockBean
	private QuestionsService questionsService;

	@Test
	public void findQuestionsByQuizIdTest() throws Exception {
		when(questionsService.findAllQuestionsByQuizId(1L)).thenReturn(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY),
				new Question(3L, "Question C", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY)));

		mockMvc.perform(get("/questions/quiz/1/2"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$", hasSize(2)))
			   .andExpect(jsonPath("$[0].text", is("Question A")))
			   .andExpect(jsonPath("$[1].text", is("Question B")));

		verify(questionsService, times(1)).findAllQuestionsByQuizId(1L);
	}

	@Test
	public void findAllQuestionsTest() throws Exception {
		when(questionsService.findAllQuestions(PAGEABLE)).thenReturn(new PageImpl<Question>(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY))));

		mockMvc.perform(
				get("/questions")
				.param("page", "0")
				.param("size", "5")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.content", hasSize(2)))
			   .andExpect(jsonPath("$.content[0].text", is("Question A")))
			   .andExpect(jsonPath("$.content[1].text", is("Question B")));

		verify(questionsService, times(1)).findAllQuestions(PAGEABLE);
	}

	@Test
	public void findQuestionByIdTest() throws Exception {
		when(questionsService.findQuestionById(1L)).thenReturn(new Question(1L, "Question A", "Answer A", "Answer B",
				"Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN));

		mockMvc.perform(get("/questions/1"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.text", is("Question A")));

		verify(questionsService, times(1)).findQuestionById(1L);
	}

	@Test
	public void saveQuestionTest() throws Exception {
		Question question = new Question("Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionsService.saveQuestion(question)).thenReturn(new Question(1L, "Question A", "Answer A", "Answer B",
				"Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN));

		mockMvc.perform(
				post("/questions")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(OBJECT_MAPPER.writeValueAsString(question))
				)
		       .andExpect(status().isCreated())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.id", is(1)));

		verify(questionsService, times(1)).saveQuestion(question);
	}

	@Test
	public void updateQuestionTest() throws Exception {
		Question question = new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionsService.updateQuestion(question, 1L)).thenReturn(question);

		mockMvc.perform(
				put("/questions/1")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(OBJECT_MAPPER.writeValueAsString(question))
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.text", is("Question A")));

		verify(questionsService, times(1)).updateQuestion(question, 1L);
	}

	@Test
	public void deleteQuestionByIdTest() throws Exception {
		doNothing().when(questionsService).deleteQuestionById(1L);

		mockMvc.perform(delete("/questions/1"))
		       .andExpect(status().isNoContent());

		verify(questionsService, times(1)).deleteQuestionById(1L);
	}

}
