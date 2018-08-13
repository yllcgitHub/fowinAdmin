package com.manage.tool;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

public class ValidationUtil {

	public static boolean isEmpty(Object aObj) {
		if ((aObj instanceof String)) {
			return isEmpty((String) aObj);
		}
		if ((aObj instanceof Long)) {
			return isEmpty((Long) aObj);
		}
		if ((aObj instanceof Date)) {
			return isEmpty((Date) aObj);
		}
		if ((aObj instanceof Collection)) {
			return isEmpty((Collection) aObj);
		}
		if ((aObj instanceof Map)) {
			return isEmpty((Map) aObj);
		}
		if ((aObj != null) && (aObj.getClass().isArray())) {
			return isEmptyArray(aObj);
		}

		return isNull(aObj);
	}

	public static boolean isEmpty(String aStr) {
		return (aStr == null) || (aStr.trim().isEmpty());
	}

	public static boolean isEmpty(Long aLong) {
		return aLong == null;
	}

	public static boolean isEmpty(Collection c) {
		return (c == null) || (c.size() == 0);
	}

	public static boolean isEmpty(Map m) {
		return (m == null) || (m.size() == 0);
	}

	public static boolean isEmpty(Date aDate) {
		return aDate == null;
	}

	public static String trim(String aStr) {
		if (aStr == null) {
			return "";
		}

		return aStr.trim();
	}

	private static boolean isEmptyArray(Object array) {
		int length = 0;
		if ((array instanceof int[])) {
			length = ((int[]) array).length;
		} else if ((array instanceof byte[])) {
			length = ((byte[]) array).length;
		} else if ((array instanceof short[])) {
			length = ((short[]) array).length;
		} else if ((array instanceof char[])) {
			length = ((char[]) array).length;
		} else if ((array instanceof float[])) {
			length = ((float[]) array).length;
		} else if ((array instanceof double[])) {
			length = ((double[]) array).length;
		} else if ((array instanceof long[])) {
			length = ((long[]) array).length;
		} else if ((array instanceof boolean[])) {
			length = ((boolean[]) array).length;
		} else {
			length = ((Object[]) array).length;
		}

		return length == 0;
	}

	public static boolean isNull(Object oStr) {
		return oStr == null;
	}
}
