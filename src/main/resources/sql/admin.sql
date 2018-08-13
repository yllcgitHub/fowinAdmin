/**
 * 活动列表
 */ 
#namespace("admin")

#sql("getOrderList")

SELECT
	a.*
FROM
	`order` a
WHERE
	1 = 1
	#if(com.jfinal.kit.StrKit::notBlank(playerId))
		and a.player_id=#(playerId)
	#end 
	
	#if(com.jfinal.kit.StrKit::notBlank(agentId))
		and a.agent_id=#(agentId)
	#end 
	
	#if(com.jfinal.kit.StrKit::notBlank(venueId))
		and a.venue_id=#(venueId)
	#end 
	
	#if(com.jfinal.kit.StrKit::notBlank(startTime))
		and a.start_time >= str_to_date('#(startTime) 00:00:00', '%Y-%m-%d %H:%i:%s')
	#end 
	
	#if(com.jfinal.kit.StrKit::notBlank(endTime))
		and a.end_time <= str_to_date('#(endTime) 23:59:59', '%Y-%m-%d %H:%i:%s')
	#end 
	
	#if(com.jfinal.kit.StrKit::notBlank(searchName))
		and a.player_name like '%#(searchName)%'
	#end 
	
	#if(com.jfinal.kit.StrKit::notBlank(status))
		and a.order_status = '#(status)'
	#end 
	
ORDER BY
	a.update_time DESC
		
#end

#end






