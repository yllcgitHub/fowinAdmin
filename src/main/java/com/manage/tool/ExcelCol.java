package com.manage.tool;

public class ExcelCol {
	
	private String hidden = "false";
	private String dataIndex;
	private String text;
	
	public ExcelCol( String dataIndex, String text){
		this.dataIndex = dataIndex;
		this.text = text;
	}

	public String getHidden() {
		return hidden;
	}

	public void setHidden(String hidden) {
		this.hidden = hidden;
	}

	public String getDataIndex() {
		return dataIndex;
	}

	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	
	

}
