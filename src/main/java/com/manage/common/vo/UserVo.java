package com.manage.common.vo;

import com.manage.common.annotation.FieldMeta;

public class UserVo {
	private int id;
	
	@FieldMeta(name="会员编号")
	private String vipNo;
	
	@FieldMeta(name="手机号码")
	private String phone;
	
	@FieldMeta(name="邀请码")
	private String shareCode;
	
	@FieldMeta(name="邀请人数")
	private String shareNum;
	
	@FieldMeta(name="钱包地址")
	private String ethAddr;
	
	@FieldMeta(name="推荐人编号")
	private String parentNo;
	
	@FieldMeta(name="推荐人邀请码")
	private String parentShareCode;
	
	@FieldMeta(name="代币数量")
	private String num;
	
	@FieldMeta(name="发奖状态")
	private String bonusStatus;
	
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

	public String getParentNo() {
		return parentNo;
	}

	public void setParentNo(String parentNo) {
		this.parentNo = parentNo;
	}

	public String getShareCode() {
		return shareCode;
	}

	public void setShareCode(String shareCode) {
		this.shareCode = shareCode;
	}

	public String getShareNum() {
		return shareNum;
	}

	public void setShareNum(String shareNum) {
		this.shareNum = shareNum;
	}

	public String getEthAddr() {
		return ethAddr;
	}

	public void setEthAddr(String ethAddr) {
		this.ethAddr = ethAddr;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getParentShareCode() {
		return parentShareCode;
	}

	public void setParentShareCode(String parentShareCode) {
		this.parentShareCode = parentShareCode;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getBonusStatus() {
		return bonusStatus;
	}

	public void setBonusStatus(String bonusStatus) {
		this.bonusStatus = bonusStatus;
	}

	
}
