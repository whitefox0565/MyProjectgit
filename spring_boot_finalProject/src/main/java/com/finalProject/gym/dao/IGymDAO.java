package com.finalProject.gym.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.finalProject.gym.model.GymVO;
import com.finalProject.gym.model.MemberVO;


public interface IGymDAO {
	public MemberVO getGymData(String memId); //체육관 정보 가져오기 
	public  ArrayList<MemberVO> getAllGymPosition(); // 체육관 위치정보 가져오기
	public ArrayList<MemberVO> getAllGymName(); //체육관 이름 전체 조회
	public ArrayList<MemberVO> gymNameSearch(String searchWord); //체육관 이름 검색
	public MemberVO getGymDataByName(String name); //이름으로 체육관 정보 가져오기
	public MemberVO getGymPriceByGymName(String name); //이름으로 체육관 가격정보 가져오기
	public String getGymNo(String memId); // 업주계정인지 확인 
}
