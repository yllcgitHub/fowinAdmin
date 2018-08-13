package com.manage.common.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface FieldMeta {  
	  
    /** 
     * 字段名称 
     * @return 
     */  
    String name() default "";  
}  
