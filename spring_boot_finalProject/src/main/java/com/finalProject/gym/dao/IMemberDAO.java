package com.finalProject.gym.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.finalProject.gym.model.MemberVO;

public interface IMemberDAO {
	public void joinMember(MemberVO vo); //회원가입
	public String joinMemIdCheck(String id); //아이디 중복확인
	public String joinMemNickChk(String nick); //닉네임 중복확인
	public MemberVO login(HashMap<String, Object> map); //로그인
	public MemberVO getMemData(String memId); // 마이페이지 정보 가져오기
	public void updateMemImgNo(HashMap<String, Object> map); //마이페이지 이미지 업데이트
	public void myPageUpdate(MemberVO vo); // 마이페이지 업데이트
	public void memDeleteAccount(String memId); // 회원탈퇴
	public String getMemNick(String memId); // 닉네임 가져오기
	public String gymNoChk(String gymNo); // 체육관번호 중복확인
}
