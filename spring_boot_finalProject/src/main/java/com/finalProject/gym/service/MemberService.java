package com.finalProject.gym.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.finalProject.gym.dao.IMemberDAO;
import com.finalProject.gym.model.MemberVO;


@Service
public class MemberService implements IMemberService {
	@Autowired
	@Qualifier("IMemberDAO")
	IMemberDAO dao;
	
	@Autowired
	PasswordEncoder pwdEncoder;
	
	//회원가입
	@Override
	public void joinMember(MemberVO vo) {
		String encodedPwd = pwdEncoder.encode(vo.getMemPwd());
		vo.setMemPwd(encodedPwd);
		
		dao.joinMember(vo);
	}
	
	//회원가입-아이디 중복확인
	@Override
	public String joinMemIdCheck(String id) {
		return dao.joinMemIdCheck(id);
	}

	//회원가입-닉네임 중복확인
	@Override
	public String joinMemNickChk(String nick) {
		return dao.joinMemNickChk(nick);
	}

	//로그인
	@Override
	public MemberVO login(HashMap<String, Object> map) {
		MemberVO vo = dao.login(map);

		if(vo != null) {
			if(pwdEncoder.matches((String)map.get("memPwd"), vo.getMemPwd())) {
			    return vo;
			}
		}
	    
		return null;
	}
	
	//마이페이지 정보 가져오기
	@Override
	public MemberVO getMemData(String memId) {
		return dao.getMemData(memId);
	}

	//마이페이지 이미지 업데이트
	@Override
	public void updateMemImgNo(HashMap<String, Object> map) {
		dao.updateMemImgNo(map);
	}

	//마이페이지 업데이트
	@Override
	public void myPageUpdate(MemberVO vo) {
		dao.myPageUpdate(vo);
	}
	
	//회원탈퇴
	@Override
	public void memDeleteAccount(String memId) {
		dao.memDeleteAccount(memId);
	}

	@Override
	public String getMemNick(String memId) {
		return dao.getMemNick(memId);
	}
	
	@Override
	public String gymNoChk() {
		Random random = new Random();
		String gymNo = "";
		
		while(true) {
			String no = random.nextInt(100) + "";
			gymNo = dao.gymNoChk(no);
			
			if(gymNo == null) {
				gymNo = no;
				break;
			}
		}
		
		return gymNo;
	}
}
