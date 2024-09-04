package com.finalProject.gym.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class GymVO {
	private String memId;
	private String memPwd;
	private String memName;
	private String memNick;
	private String memEmail;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date memJoinDate;
	private String memHp;
	private String memZipcode;
	private String memAddress1;
	private String memAddress2;
	private String memImgNo;
	private String gymNo;
	private String pointX;
	private String pointY;
	private String gymName;
	private String gymHp;
	private int gymPrice;
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public String getMemPwd() {
		return memPwd;
	}
	public void setMemPwd(String memPwd) {
		this.memPwd = memPwd;
	}
	public String getMemName() {
		return memName;
	}
	public void setMemName(String memName) {
		this.memName = memName;
	}
	public String getMemNick() {
		return memNick;
	}
	public void setMemNick(String memNick) {
		this.memNick = memNick;
	}
	public String getMemEmail() {
		return memEmail;
	}
	public void setMemEmail(String memEmail) {
		this.memEmail = memEmail;
	}
	public Date getMemJoinDate() {
		return memJoinDate;
	}
	public void setMemJoinDate(Date memJoinDate) {
		this.memJoinDate = memJoinDate;
	}
	public String getMemHp() {
		return memHp;
	}
	public void setMemHp(String memHp) {
		this.memHp = memHp;
	}
	public String getMemZipcode() {
		return memZipcode;
	}
	public void setMemZipcode(String memZipcode) {
		this.memZipcode = memZipcode;
	}
	public String getMemAddress1() {
		return memAddress1;
	}
	public void setMemAddress1(String memAddress1) {
		this.memAddress1 = memAddress1;
	}
	public String getMemAddress2() {
		return memAddress2;
	}
	public void setMemAddress2(String memAddress2) {
		this.memAddress2 = memAddress2;
	}
	public String getMemImgNo() {
		return memImgNo;
	}
	public void setMemImgNo(String memImgNo) {
		this.memImgNo = memImgNo;
	}
	public String getGymNo() {
		return gymNo;
	}
	public void setGymNo(String gymNo) {
		this.gymNo = gymNo;
	}
	public String getPointX() {
		return pointX;
	}
	public void setPointX(String pointX) {
		this.pointX = pointX;
	}
	public String getPointY() {
		return pointY;
	}
	public void setPointY(String pointY) {
		this.pointY = pointY;
	}
	public String getGymName() {
		return gymName;
	}
	public void setGymName(String gymName) {
		this.gymName = gymName;
	}
	public String getGymHp() {
		return gymHp;
	}
	public void setGymHp(String gymHp) {
		this.gymHp = gymHp;
	}
	public int getGymPrice() {
		return gymPrice;
	}
	public void setGymPrice(int gymPrice) {
		this.gymPrice = gymPrice;
	}
	
	
	
	
}
