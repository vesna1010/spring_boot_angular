package com.vesna1010.quiz_service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class BaseTest {

	public static final Pageable PAGEABLE;
	public static final Sort SORT;
	public static final ObjectMapper OBJECT_MAPPER;

	static {
		SORT = Sort.by(Direction.ASC, "id");
		PAGEABLE = PageRequest.of(0, 5, SORT);
		OBJECT_MAPPER = new ObjectMapper();
	}

}
