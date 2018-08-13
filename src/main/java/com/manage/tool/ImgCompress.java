package com.manage.tool;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

import com.jfinal.upload.UploadFile;
import com.mchange.io.FileUtils;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 图片处理工具类
 * @author hp
 *
 */
public class ImgCompress {
	  private Image img; 
	  private int width; 
	  private int height; 
	  
	  private String basePath;
	  private String fixPath;
	  
	  
	 public String getBasePath() {
		return basePath;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}

	public String getFixPath() {
		return fixPath;
	}

	public void setFixPath(String fixPath) {
		this.fixPath = fixPath;
	}

	public ImgCompress(){
		  
	  };
	  
	  /**
	   * 压缩文件
	   * @param uploadFile
	   * @param width
	   * @param height
	   * @return
	   * @throws IOException
	   */
	  public byte[] foramtUpLoadImgPath(UploadFile uploadFile, int width, int height) {
		 byte[] imgPath =  {};
		  
		 if (uploadFile == null) {
			return imgPath;
		 }
		 
		 String parameterName =  uploadFile.getParameterName();
		 String uploadPath = uploadFile.getUploadPath();
		 String originalFileName = uploadFile.getOriginalFileName();
		 String contentType = uploadFile.getContentType();
		 String oldFileName = uploadFile.getFileName();
		 String newFileName = createRandomNo() + ".jpg";
		 
		try {
			this.setBasePath(uploadPath + File.separator + oldFileName);
			this.setFixPath(uploadPath + File.separator + newFileName);
			
			File file = new File(basePath);		// 读入文件 
			this.img = ImageIO.read(file);   	// 构造Image对象 
			this.width = img.getWidth(null);  	// 得到源图宽 
			this.height = img.getHeight(null);  // 得到源图长 
			this.resizeByWidth(width); 		// 产生压缩图片
			
		} catch (IOException e) {
			System.out.println(e.toString());
		} 
		 
		 
		UploadFile formtFile = new UploadFile(parameterName, uploadPath, newFileName, originalFileName, contentType);
        try {
         	imgPath = FileUtils.getBytes(formtFile.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			}
		return imgPath;
	  }
	  
	  
	  /**
	   * 删除缓存图片
	   */
	  public boolean removeCacheFile(){
		  boolean baseFlag = false;
		  boolean fixFlag = false;
		  File baseFile = new File(basePath);
		  if(baseFile.exists()){
			  baseFlag = baseFile.delete();
		  }
		  
		  File fixFile = new File(fixPath);
		  if(fixFile.exists()){
			  fixFlag = fixFile.delete();
		  }
		  if(baseFlag && fixFlag){
			  return true;
		  } 
		  return false;
	  }
	  
	  private String createRandomNo() {
			SimpleDateFormat simpleDateFormat;
			simpleDateFormat = new SimpleDateFormat("MMddhhmm");
			Date date = new Date();
			String str = simpleDateFormat.format(date);
			String orderNo = ToolString.getStringRandom(2) + str;
			return orderNo.toUpperCase();
	  }
	
	  /** 
	   * 构造函数 
	   */
	  public ImgCompress(String fileName) throws IOException { 
	    File file = new File(fileName);// 读入文件 
	    img = ImageIO.read(file);   // 构造Image对象 
	    width = img.getWidth(null);  // 得到源图宽 
	    height = img.getHeight(null); // 得到源图长 
	  } 
	  /** 
	   * 按照宽度还是高度进行压缩 
	   * @param w int 最大宽度 
	   * @param h int 最大高度 
	   */
	  public void resizeFix(int w, int h) throws IOException { 
	    if (width / height > w / h) { 
	      resizeByWidth(w); 
	    } else { 
	      resizeByHeight(h); 
	    } 
	  } 
	  /** 
	   * 以宽度为基准，等比例放缩图片 
	   * @param w int 新宽度 
	   */
	  public void resizeByWidth(int w) throws IOException { 
	    int h = (int) (height * w / width); 
	    resize(w, h); 
	  } 
	  /** 
	   * 以高度为基准，等比例缩放图片 
	   * @param h int 新高度 
	   */
	  public void resizeByHeight(int h) throws IOException { 
	    int w = (int) (width * h / height); 
	    resize(w, h); 
	  } 
	  /** 
	   * 强制压缩/放大图片到固定的大小 
	   * @param w int 新宽度 
	   * @param h int 新高度 
	   */
	  public void resize(int w, int h) throws IOException { 
	    // SCALE_SMOOTH 的缩略算法 生成缩略图片的平滑度的 优先级比速度高 生成的图片质量比较好 但速度慢 
	    BufferedImage image = new BufferedImage(w, h,BufferedImage.TYPE_INT_RGB );  
	    image.getGraphics().drawImage(img, 0, 0, w, h, null); // 绘制缩小后的图 
	    File destFile = new File(fixPath); 
	    FileOutputStream out = new FileOutputStream(destFile); // 输出到文件流 
	    // 可以正常实现bmp、png、gif转jpg 
	    JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out); 
	    encoder.encode(image); // JPEG编码 
	    out.close(); 
	  } 
} 
