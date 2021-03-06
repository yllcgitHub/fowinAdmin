package com.manage.dao.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseAccountFree<M extends BaseAccountFree<M>> extends Model<M> implements IBean {

	public void setFreeId(java.lang.Integer freeId) {
		set("free_id", freeId);
	}

	public java.lang.Integer getFreeId() {
		return get("free_id");
	}

	public void setVipNo(java.lang.String vipNo) {
		set("vip_no", vipNo);
	}

	public java.lang.String getVipNo() {
		return get("vip_no");
	}

	public void setFreeBalance(java.lang.String freeBalance) {
		set("free_balance", freeBalance);
	}

	public java.lang.String getFreeBalance() {
		return get("free_balance");
	}

	public void setCreateTime(java.util.Date createTime) {
		set("create_time", createTime);
	}

	public java.util.Date getCreateTime() {
		return get("create_time");
	}

	public void setUpdateTime(java.util.Date updateTime) {
		set("update_time", updateTime);
	}

	public java.util.Date getUpdateTime() {
		return get("update_time");
	}

	public void setRemark(java.lang.String remark) {
		set("remark", remark);
	}

	public java.lang.String getRemark() {
		return get("remark");
	}

}
