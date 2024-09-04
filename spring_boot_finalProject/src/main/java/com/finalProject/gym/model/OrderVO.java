package com.finalProject.gym.model;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class OrderVO {
	private int ordNo;
	private String memId;
	private String ordReceiver;
	private String ordZipcode;
	private String ordAddress1;
	private String ordAddress2;
	private String ordRcvPhone;
	private String ordRcvMsg;
	private int ordPay;
	private String ordPayOption;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date ordDate;
	
	private int prdNo;
	private int ordQty;
	private String ordOption;
	private String ordDateFmt;
	private ArrayList<ProductVO> ordList;
	
	public int getOrdNo() {
		return ordNo;
	}
	public void setOrdNo(int ordNo) {
		this.ordNo = ordNo;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public String getOrdReceiver() {
		return ordReceiver;
	}
	public void setOrdReceiver(String ordReceiver) {
		this.ordReceiver = ordReceiver;
	}
	public String getOrdZipcode() {
		return ordZipcode;
	}
	public void setOrdZipcode(String ordZipcode) {
		this.ordZipcode = ordZipcode;
	}
	public String getOrdAddress1() {
		return ordAddress1;
	}
	public void setOrdAddress1(String ordAddress1) {
		this.ordAddress1 = ordAddress1;
	}
	public String getOrdAddress2() {
		return ordAddress2;
	}
	public void setOrdAddress2(String ordAddress2) {
		this.ordAddress2 = ordAddress2;
	}
	public String getOrdRcvPhone() {
		return ordRcvPhone;
	}
	public void setOrdRcvPhone(String ordRcvPhone) {
		this.ordRcvPhone = ordRcvPhone;
	}
	public String getOrdRcvMsg() {
		return ordRcvMsg;
	}
	public void setOrdRcvMsg(String ordRcvMsg) {
		this.ordRcvMsg = ordRcvMsg;
	}
	public int getOrdPay() {
		return ordPay;
	}
	public void setOrdPay(int ordPay) {
		this.ordPay = ordPay;
	}
	public Date getOrdDate() {
		return ordDate;
	}
	public void setOrdDate(Date ordDate) {
		this.ordDate = ordDate;
	}
	public int getPrdNo() {
		return prdNo;
	}
	public void setPrdNo(int prdNo) {
		this.prdNo = prdNo;
	}
	public int getOrdQty() {
		return ordQty;
	}
	public void setOrdQty(int ordQty) {
		this.ordQty = ordQty;
	}
	public String getOrdOption() {
		return ordOption;
	}
	public void setOrdOption(String ordOption) {
		this.ordOption = ordOption;
	}
	public String getOrdPayOption() {
		return ordPayOption;
	}
	public void setOrdPayOption(String ordPayOption) {
		this.ordPayOption = ordPayOption;
	}
	public String getOrdDateFmt() {
		return ordDateFmt;
	}
	public void setOrdDateFmt(String ordDateFmt) {
		this.ordDateFmt = ordDateFmt;
	}
	public ArrayList<ProductVO> getOrdList() {
		return ordList;
	}
	public void setOrdList(ArrayList<ProductVO> ordList) {
		this.ordList = ordList;
	}
	
	
}
