package com.manage.tool;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.jfinal.render.Render;
import com.jfinal.render.RenderException;

public class ImgRender extends Render {

	private File file;
	private String fileName;
	private byte[] blob;

	public ImgRender(File file) {
		this.file = file;
	}

	public ImgRender(String fileName) {
		this.fileName = fileName;
	}

	public ImgRender(byte[] blob) {
		this.blob = blob;
	}

	public static ImgRender render(byte[] blob) {
		ImgRender render = new ImgRender(blob);
		return render;
	}

	public static ImgRender render(String fileName) {
		ImgRender render = new ImgRender(fileName);
		return render;
	}

	public static ImgRender render(File file) {
		ImgRender render = new ImgRender(file);
		return render;
	}

	public void render() {
		if (file == null && fileName != null) {
			file = new File(fileName);
		}

		if ((file == null || !file.isFile() || file.length() > Integer.MAX_VALUE)
				&& blob == null) {
//			RenderFactory.me().getErrorRender(404)
//					.setContext(request, response).render();
			return;
		}

		String contentType = "image/jpeg";// servletContext.getMimeType(file.getName());

		response.setContentType(contentType);
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		InputStream inputStream = null;
		OutputStream outputStream = null;
		try {
			outputStream = response.getOutputStream();
			if (file != null) {
				inputStream = new BufferedInputStream(new FileInputStream(file));
				byte[] buffer = new byte[1024];
				for (int n = -1; (n = inputStream.read(buffer)) != -1;) {
					outputStream.write(buffer, 0, n);
				}
			} else if (blob != null) {
				outputStream.write(blob);
			}
			outputStream.flush();
		} catch (Exception e) {
			throw new RenderException(e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}