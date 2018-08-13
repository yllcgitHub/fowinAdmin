/**
 *  用户列表
 */ 
#namespace("user")
#sql("getUserList")
SELECT
	a.*,b.lock_balance , c.free_balance
FROM
	`user_base` a  left join `account_lock` b on a.vip_no = b.vip_no left join `account_free` c on a.vip_no = c.vip_no 
where
	1=1
	#if(com.jfinal.kit.StrKit::notBlank(parentShareCode))
		and b.shareCode like '%#(parentShareCode)%'
	#end 
	#if(com.jfinal.kit.StrKit::notBlank(shareCode))
		and a.shareCode like '%#(shareCode)%'
	#end 
	#if(com.jfinal.kit.StrKit::notBlank(phone))
		and a.phone like '%#(phone)%'
	#end 
order by id desc
	
#end


#sql("getAccountFreeList")

SELECT
	a.*
FROM
	`log_account_free` a 
where
	1=1
	#if(com.jfinal.kit.StrKit::notBlank(vipNo))
		and a.vip_no like '%#(vipNo)%'
	#end 
order by create_time desc

#end


#end






