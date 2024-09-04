package com.finalProject.gym.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finalProject.gym.dao.IGymDAO;
import com.finalProject.gym.model.GymVO;
import com.finalProject.gym.model.MemberVO;


@Service
public class GymService implements IGymService {
	@Autowired
	IGymDAO dao;
	
	@Autowired
	PasswordEncoder pwdEncoder;

	@Override
	public MemberVO getGymData(String memId) {
		return dao.getGymData(memId);
	}
	
	//체육관 위치정보 가져오기
	@Override
	public ArrayList<MemberVO> getAllGymPosition() {
		return dao.getAllGymPosition();
	}
	
	// 체육관 이름 전체 조회
	@Override
	public ArrayList<MemberVO> getAllGymName() {
		return dao.getAllGymName();
	}
	 
	//체육관 관원 등록
	@Override
	public ArrayList<MemberVO> gymNameSearch(String searchWord) {
		return dao.gymNameSearch(searchWord);
	}

	@Override
	public MemberVO getGymDataByName(String name) {
		return dao.getGymDataByName(name);
	}

	@Override
	public MemberVO getGymPriceByGymName(String name) {
		return dao.getGymPriceByGymName(name);
	}

	@Override
	public String getGymNo(String memId) {
		return dao.getGymNo(memId);
	}
	
	
	
	
}
