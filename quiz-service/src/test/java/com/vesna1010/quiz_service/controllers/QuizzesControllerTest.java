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
import org.springframework.http.MediaType;
import com.vesna1010.quiz_service.controllers.QuizzesController;
import com.vesna1010.quiz_service.models.Quiz;
import com.vesna1010.quiz_service.services.QuizzesService;

@WebMvcTest(QuizzesController.class)
public class QuizzesControllerTest extends BaseControllerTest {

	@MockBean
	private QuizzesService quizzesService;

	@Test
	public void findAllQuizzesTest() throws Exception {
		when(quizzesService.findAllQuizzes(SORT))
				.thenReturn(Arrays.asList(new Quiz(1L, "Quiz A"), new Quiz(2L, "Quiz B")));

		mockMvc.perform(get("/quizzes"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$", hasSize(2)))
			   .andExpect(jsonPath("$[0].name", is("Quiz A")))
			   .andExpect(jsonPath("$[1].name", is("Quiz B")));

		verify(quizzesService, times(1)).findAllQuizzes(SORT);
	}

	@Test
	public void findQuizByIdTest() throws Exception {
		when(quizzesService.findQuizById(1L)).thenReturn(new Quiz(1L, "Quiz A"));

		mockMvc.perform(get("/quizzes/1"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.name", is("Quiz A")));

		verify(quizzesService, times(1)).findQuizById(1L);
	}

	@Test
	public void saveQuizTest() throws Exception {
		Quiz quiz = new Quiz("Quiz");

		when(quizzesService.saveQuiz(quiz)).thenReturn(new Quiz(1L, "Quiz"));

		mockMvc.perform(
				post("/quizzes")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(OBJECT_MAPPER.writeValueAsString(quiz))
				)
		       .andExpect(status().isCreated())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.id", is(1)));

		verify(quizzesService, times(1)).saveQuiz(quiz);
	}

	@Test
	public void updateQuizTest() throws Exception {
		Quiz quiz = new Quiz(1L, "Quiz");

		when(quizzesService.updateQuiz(quiz, 1L)).thenReturn(quiz);

		mockMvc.perform(
				put("/quizzes/1")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(OBJECT_MAPPER.writeValueAsString(quiz))
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
			   .andExpect(jsonPath("$.name", is("Quiz")));

		verify(quizzesService, times(1)).updateQuiz(quiz, 1L);
	}

	@Test
	public void deleteQuizByIdTest() throws Exception {
		doNothing().when(quizzesService).deleteQuizById(1L);

		mockMvc.perform(delete("/quizzes/1"))
		       .andExpect(status().isNoContent());

		verify(quizzesService, times(1)).deleteQuizById(1L);
	}

}
