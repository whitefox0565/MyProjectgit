package com.finalProject.gym.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class CommentVO {
	private int commentNo;
	private int boardNo;
	private String memNick;
	private String comment;
	private String memId;
	private int agreePoint;
	private int disagreePoint;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;
	
	public int getCommentNo() {
		return commentNo;
	}
	public void setCommentNo(int commentNo) {
		this.commentNo = commentNo;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getMemNick() {
		return memNick;
	}
	public void setMemNick(String memNick) {
		this.memNick = memNick;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public int getAgreePoint() {
		return agreePoint;
	}
	public void setAgreePoint(int agreePoint) {
		this.agreePoint = agreePoint;
	}
	public int getDisagreePoint() {
		return disagreePoint;
	}
	public void setDisagreePoint(int disagreePoint) {
		this.disagreePoint = disagreePoint;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
