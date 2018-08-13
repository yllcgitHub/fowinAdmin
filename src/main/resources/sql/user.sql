/**
 *  用户列表
 */ 
#namespace("user")
#sql("getUserList")
SELECT
	a.*,b.shareCode parentShareCode, c.num
FROM
	`user_base` a left join `user_base` b on a.parent_no = b.vip_no left join `account_hda` c on a.vip_no = c.vip_no
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

#end






