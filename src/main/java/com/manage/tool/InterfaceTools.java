package com.manage.tool;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class InterfaceTools {
	
	private static transient Log log = LogFactory.getLog(InterfaceTools.class);

	/** 
	 * 验签
	 * @param str 
	 * @return 
	 * @throws Exception 
	 */ 
	public static String getSignature(String param, String platform) throws Exception {
		String pid = ParaExplain.getPid(platform);
		String pCode = ParaExplain.getPCode(platform);
		log.info("pid = " + pid);
		log.info("pCode = " + pCode);
		String signStr = DigestUtils.md5Hex(param + DigestUtils.md5Hex((pid + pCode).toUpperCase()).toUpperCase());
		System.out.println(signStr);
		return signStr;
	}
}
