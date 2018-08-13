package com.manage.tool;

public class ParaExplain {
	
	public static String getPid(String platform) throws Exception {
		String pid = "";
		switch(platform){
			case CommonConstant.PLATFORM.TEST_PLATFORM:
				pid = CommonConstant.PID.TEST_PLATFORM;
				break;
			default:
				pid = "";
		}
		
//		if(ValidationUtil.isEmpty(pid)) 
//			throw new BusinessException(ResultCode.PID_OR_PCODE_NULL,ResultCode.getDescription(ResultCode.PID_OR_PCODE_NULL));
		
		return pid;
	}
	
	public static String getPCode(String platform) throws Exception {
		String pCode = "";
		switch(platform){
			case CommonConstant.PLATFORM.TEST_PLATFORM:
				pCode = CommonConstant.P_CODE.TEST_PLATFORM;
				break;
			default:
				pCode = "";
		}
		
//		if(ValidationUtil.isEmpty(pCode)) 
//			throw new BusinessException(ResultCode.PID_OR_PCODE_NULL,ResultCode.getDescription(ResultCode.PID_OR_PCODE_NULL));
		
		return pCode;
	}

	
	
	
}
