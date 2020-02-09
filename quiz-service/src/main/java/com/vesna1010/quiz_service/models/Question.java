package com.vesna1010.quiz_service.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.vesna1010.quiz_service.enums.Answer;
import com.vesna1010.quiz_service.enums.Points;

@Entity
@Table(name = "QUESTIONS")
public class Question {

	private Long id;
	private String text;
	private String answerA;
	private String answerB;
	private String answerC;
	private String answerD;
	private Answer correctAnswer;
	private Quiz quiz;
	private Points points;

	public Question() {
	}

	public Question(String text, String answerA, String answerB, String answerC, String answerD, Answer correctAnswer,
			Quiz quiz, Points points) {
		this(null, text, answerA, answerB, answerC, answerD, correctAnswer, quiz, points);
	}

	public Question(Long id, String text, String answerA, String answerB, String answerC, String answerD,
			Answer correctAnswer, Quiz quiz, Points points) {
		this.id = id;
		this.text = text;
		this.answerA = answerA;
		this.answerB = answerB;
		this.answerC = answerC;
		this.answerD = answerD;
		this.correctAnswer = correctAnswer;
		this.quiz = quiz;
		this.points = points;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "TEXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Column(name = "ANSWER_A")
	public String getAnswerA() {
		return answerA;
	}

	public void setAnswerA(String answerA) {
		this.answerA = answerA;
	}

	@Column(name = "ANSWER_B")
	public String getAnswerB() {
		return answerB;
	}

	public void setAnswerB(String answerB) {
		this.answerB = answerB;
	}

	@Column(name = "ANSWER_C")
	public String getAnswerC() {
		return answerC;
	}

	public void setAnswerC(String answerC) {
		this.answerC = answerC;
	}

	@Column(name = "ANSWER_D")
	public String getAnswerD() {
		return answerD;
	}

	public void setAnswerD(String answerD) {
		this.answerD = answerD;
	}

	@Enumerated(EnumType.STRING)
	@Column(name = "CORRECT_ANSWER")
	public Answer getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(Answer correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	@ManyToOne
	@JoinColumn(name = "QUIZ_ID")
	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	@Enumerated(EnumType.STRING)
	@Column(name = "POINTS")
	public Points getPoints() {
		return points;
	}

	public void setPoints(Points points) {
		this.points = points;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Question other = (Question) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
