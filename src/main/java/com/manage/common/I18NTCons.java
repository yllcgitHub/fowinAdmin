package com.manage.common;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class I18NTCons {
	public static boolean isInit = true;
	public static String sessionId = "-1";
	private static final String key = "i18nt";
			
	public static void choseLanguage(HttpServletRequest request,
			HttpServletResponse response, Locale language) {
		HttpSession session = request.getSession();
		session.removeAttribute(key);
		
		  //资源包基名(包名+myproperties)
        String basename = "myproperties";
		
        //根据基名和语言环境加载对应的语言资源文件
        ResourceBundle myResources = ResourceBundle.getBundle(basename,language);
        
        Map<String,String> map = new HashMap<String,String>();
        map.put("language", String.valueOf(language));
        
//        map.put("Chinese",  myResources.getString("i18nt.Chinese"));
//        map.put("English", myResources.getString("i18nt.English"));
        map.put("Login", myResources.getString("i18nt.Login"));
        map.put("Register",  myResources.getString("i18nt.Register"));
        map.put("Welcome", myResources.getString("i18nt.Welcome"));
        map.put("Logout", myResources.getString("i18nt.Logout"));
        map.put("SplitEntrance", myResources.getString("i18nt.SplitEntrance"));
        map.put("MarketReferencePrice", myResources.getString("i18nt.MarketReferencePrice"));
        map.put("Recreationchain", myResources.getString("i18nt.Recreationchain"));
        map.put("Gambling", myResources.getString("i18nt.Gambling"));
        map.put("ApplyForSubscription", myResources.getString("i18nt.ApplyForSubscription"));
        map.put("DataStatus", myResources.getString("i18nt.DataStatus"));
        map.put("TotalIssuance", myResources.getString("i18nt.TotalIssuance"));
        map.put("DownloadTheWallet", myResources.getString("i18nt.DownloadTheWallet"));
        map.put("ReleaseCountdown", myResources.getString("i18nt.ReleaseCountdown"));
        map.put("StrategicPartners", myResources.getString("i18nt.StrategicPartners"));
        map.put("WhatIsRecreationChain", myResources.getString("i18nt.WhatIsRecreationChain"));
        map.put("RecreationChainisAService", myResources.getString("i18nt.RecreationChainisAService"));
        map.put("AtPresent", myResources.getString("i18nt.AtPresent"));
        map.put("TechnologyHighlights", myResources.getString("i18nt.TechnologyHighlights"));
        map.put("SECURED", myResources.getString("i18nt.SECURED"));
        map.put("BasedOnComplete", myResources.getString("i18nt.BasedOnComplete"));
        map.put("UsersCanUse", myResources.getString("i18nt.UsersCanUse"));
        map.put("TheEncryption", myResources.getString("i18nt.TheEncryption"));
        map.put("UserRegistration", myResources.getString("i18nt.UserRegistration"));
        map.put("UserName", myResources.getString("i18nt.UserName"));
        map.put("Password", myResources.getString("i18nt.Password"));
        map.put("RepeatPassword", myResources.getString("i18nt.RepeatPassword"));
        map.put("ValidationCode", myResources.getString("i18nt.ValidationCode"));
        map.put("UserRegister", myResources.getString("i18nt.UserRegister"));
        map.put("Return", myResources.getString("i18nt.Return"));
        map.put("OnceRound", myResources.getString("i18nt.OnceRound"));
        map.put("Withinone", myResources.getString("i18nt.Withinone"));
        map.put("Wellexpand", myResources.getString("i18nt.Wellexpand"));
        map.put("Tokenrelease", myResources.getString("i18nt.Tokenrelease"));
        map.put("Itsdeveloped", myResources.getString("i18nt.Itsdeveloped"));
        map.put("Closeloop", myResources.getString("i18nt.Closeloop"));
        map.put("Convenient", myResources.getString("i18nt.Convenient"));
        map.put("Investment", myResources.getString("i18nt.Investment"));
        map.put("Alltokens", myResources.getString("i18nt.Alltokens"));
        map.put("Security", myResources.getString("i18nt.Security"));
        map.put("Currency", myResources.getString("i18nt.Currency"));
        map.put("Thetechnology", myResources.getString("i18nt.Thetechnology"));
        map.put("Theshareprice", myResources.getString("i18nt.Theshareprice"));
        map.put("Itsimperative", myResources.getString("i18nt.Itsimperative"));
        
        session.setAttribute(key, map);
	}
}
