package com.manage.common.vo;

import com.manage.common.annotation.FieldMeta;

public class LogAccFreeVo {
	private int id;
	
	@FieldMeta(name="会员编号")
	private String vipNo;
	
	@FieldMeta(name="交易前余额")
	private String beforeBalance;
	
	@FieldMeta(name="交易金额")
	private String tradeBalance;
	
	@FieldMeta(name="交易后金额")
	private String afterBalance;
	
	@FieldMeta(name="交易类型")
	private String type;
	
	@FieldMeta(name="交易时间")
	private String createTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getVipNo() {
		return vipNo;
	}

	public void setVipNo(String vipNo) {
		this.vipNo = vipNo;
	}

	public String getBeforeBalance() {
		return beforeBalance;
	}

	public void setBeforeBalance(String beforeBalance) {
		this.beforeBalance = beforeBalance;
	}

	public String getTradeBalance() {
		return tradeBalance;
	}

	public void setTradeBalance(String tradeBalance) {
		this.tradeBalance = tradeBalance;
	}

	public String getAfterBalance() {
		return afterBalance;
	}

	public void setAfterBalance(String afterBalance) {
		this.afterBalance = afterBalance;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
