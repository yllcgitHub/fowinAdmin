package com.manage.common.vo;

import com.manage.common.annotation.FieldMeta;

public class UserVo {
	private int id;
	
	@FieldMeta(name="会员编号")
	private String vipNo;
	
	@FieldMeta(name="手机号码")
	private String phone;
	
	@FieldMeta(name="身份证号")
	private String idCard;
	
	@FieldMeta(name="用户姓名")
	private String userName;
	
	@FieldMeta(name="分红比例")
	private String shareBonusRate;
	
	@FieldMeta(name="锁仓币总量")
	private String lockNum;
	
	@FieldMeta(name="锁仓币账户余额")
	private String lockBalance;
	
	@FieldMeta(name="自由账户余额")
	private String freeBalance;
	
	@FieldMeta(name="创建时间")
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getLockNum() {
		return lockNum;
	}

	public void setLockNum(String lockNum) {
		this.lockNum = lockNum;
	}

	public String getLockBalance() {
		return lockBalance;
	}

	public void setLockBalance(String lockBalance) {
		this.lockBalance = lockBalance;
	}

	public String getFreeBalance() {
		return freeBalance;
	}

	public void setFreeBalance(String freeBalance) {
		this.freeBalance = freeBalance;
	}

	public String getShareBonusRate() {
		return shareBonusRate;
	}

	public void setShareBonusRate(String shareBonusRate) {
		this.shareBonusRate = shareBonusRate;
	}


	
}
