package com.vesna1010.quiz_service.controllers;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import com.vesna1010.quiz_service.BaseTest;

@RunWith(SpringJUnit4ClassRunner.class)
public abstract class BaseControllerTest extends BaseTest {

	@Autowired
	protected MockMvc mockMvc;

}
