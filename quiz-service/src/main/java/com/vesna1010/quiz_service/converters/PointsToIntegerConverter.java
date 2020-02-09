package com.vesna1010.quiz_service.converters;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.Converter;
import com.vesna1010.quiz_service.enums.Points;

public class PointsToIntegerConverter implements Converter<Points, Integer> {

	@Override
	public Integer convert(Points points) {
		return points.getPoints();
	}

	@Override
	public JavaType getInputType(TypeFactory typeFactory) {
		return typeFactory.constructType(Points.class);
	}

	@Override
	public JavaType getOutputType(TypeFactory typeFactory) {
		return typeFactory.constructType(Integer.class);
	}

}
