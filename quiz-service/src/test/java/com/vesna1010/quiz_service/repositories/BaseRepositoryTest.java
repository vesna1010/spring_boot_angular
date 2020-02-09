package com.vesna1010.quiz_service.repositories;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.vesna1010.quiz_service.BaseTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@Sql(scripts = "classpath:init.sql")
public abstract class BaseRepositoryTest extends BaseTest {

}
