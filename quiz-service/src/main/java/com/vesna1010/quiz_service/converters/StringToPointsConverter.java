package com.vesna1010.quiz_service.converters;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.Converter;
import com.vesna1010.quiz_service.enums.Points;

public class StringToPointsConverter implements Converter<String, Points> {

	@Override
	public Points convert(String str) {
		Points points = null;

		switch (str) {
		case "10":
			points = Points.TEN;
			break;
		case "20":
			points = Points.TWENTY;
			break;
		case "50":
			points = Points.FIFTY;
			break;
		case "100":
			points = Points.HUNDRED;
			break;
		}

		return points;
	}

	@Override
	public JavaType getInputType(TypeFactory typeFactory) {
		return typeFactory.constructType(String.class);
	}

	@Override
	public JavaType getOutputType(TypeFactory typeFactory) {
		return typeFactory.constructType(Points.class);
	}

}
