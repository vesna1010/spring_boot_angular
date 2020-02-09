delete from questions;
delete from quizzes;

insert into quizzes(id, name) value(1, 'Quiz A');
insert into quizzes(id, name) value(2, 'Quiz B');
insert into quizzes(id, name) value(3, 'Quiz C');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(1, 'Question A', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'A', 1, 'TEN');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(2, 'Question B', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'B', 1, 'TEN');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(3, 'Question C', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'C', 2, 'TEN');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(4, 'Question D', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'D', 3, 'TEN');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(5, 'Question E', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'D', 1, 'TEN');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(6, 'Question F', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'D', 1, 'TEN');

insert into questions(id, text, answer_a, answer_b, answer_c, answer_d, correct_answer, quiz_id, points)
values(7, 'Question G', 'Answer A', 'Answer B', 'Answer C', 'Answer D', 'D', 1, 'TEN');
