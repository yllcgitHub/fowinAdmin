package com.manage.dao.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseTbSysSequence<M extends BaseTbSysSequence<M>> extends Model<M> implements IBean {

	public void setName(java.lang.String name) {
		set("name", name);
	}

	public java.lang.String getName() {
		return get("name");
	}

	public void setCurrentValue(java.lang.String currentValue) {
		set("current_value", currentValue);
	}

	public java.lang.String getCurrentValue() {
		return get("current_value");
	}

	public void setIncrement(java.lang.String increment) {
		set("increment", increment);
	}

	public java.lang.String getIncrement() {
		return get("increment");
	}

}
