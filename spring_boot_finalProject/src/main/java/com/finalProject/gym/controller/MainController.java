package com.finalProject.gym.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.finalProject.gym.model.GymVO;
import com.finalProject.gym.model.MemberVO;
import com.finalProject.gym.service.ChildService;
import com.finalProject.gym.service.GymService;
import com.finalProject.gym.service.MemberService;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {
	@Autowired
	MemberService memService;

	@Autowired
	GymService gymService;

	@Autowired
	ChildService childService;

	// 메인페이지 이동
	@RequestMapping("/")
	public String main() {
		return "main";
	}

	// top에 유저 정보
	@ResponseBody
	@RequestMapping("/top")
	public HashMap<String, String> top(HttpSession session, Model model) {
		String memId = (String) session.getAttribute("sid");
		MemberVO vo = memService.getMemData(memId);
		HashMap<String, String> map = new HashMap<String, String>();
		
		if (vo != null) {
			map.put("loginChk", "login");
			map.put("memNick", vo.getMemNick());
			map.put("memImgNo", vo.getMemImgNo());
			map.put("memEmail", vo.getMemEmail());
		}
		
		return map;
	}

	// 회원가입 페이지 이동
	@RequestMapping("/member/joinForm")
	public String joinForm() {
		return "member/joinForm";
	}

	// 일반 회원가입
	@RequestMapping("/member/join")
	public String join(MemberVO vo, @RequestParam("memHp") String memHp) {

		String memImgNo = "basic.png";
		String hp = memHp.substring(0, 3) + "-" + memHp.substring(3, 7) + "-" + memHp.substring(7, 11);
		vo.setMemHp(hp);
		vo.setMemImgNo(memImgNo);

		memService.joinMember(vo);
		return "redirect:/member/loginForm";
	}

	// 업주 회원가입
	@RequestMapping("/gym/insertGymOwner")
	public String insertGymOwner(MemberVO vo, @RequestParam("memHp") String memHp,
			@RequestParam("gymHp") String gymHp) {

		String memImgNo = "basic.png";
		String hp = memHp.substring(0, 3) + "-" + memHp.substring(3, 7) + "-" + memHp.substring(7, 11);
		String ghp = gymHp.substring(0, 3) + "-" + gymHp.substring(3, 6) + "-" + gymHp.substring(6, 10);

		vo.setMemImgNo(memImgNo);
		vo.setMemHp(hp);
		vo.setGymHp(ghp);

		String gymNo = memService.gymNoChk();
		vo.setGymNo(gymNo);

		memService.joinMember(vo);

		return "redirect:/member/loginForm";
	}

	// 회원가입 아이디 중복확인
	@RequestMapping("/member/joinMemIdChk")
	@ResponseBody
	public boolean joinMemIdChk(@RequestParam("memId") String memId) {
		boolean result = false;
		String id_mem = memService.joinMemIdCheck(memId);

		if (id_mem != null)
			result = true;

		return result;
	}

	// 회원가입 닉네임 중복확인
	@RequestMapping("/member/nickChk")
	@ResponseBody
	public boolean joinMemNickChk(@RequestParam("nick") String nick) {
		boolean result = false;
		String pattern1 = "^(?=.*[ㄱ-ㅎ가-힣])[가-힣a-zA-Z*\\d*]{3,8}$";
		String pattern2 = "^(?=.*[a-zA-Z])[a-zA-Zㄱ-ㅎ가-힣*\\d*]{3,8}$";

		String memNick = memService.joinMemNickChk(nick);

		if (memNick != null)
			result = true;
		else {
			if (Pattern.matches(pattern1, nick) || Pattern.matches(pattern2, nick))
				result = false;
			else
				result = true;
		}

		return result;
	}

	// 회원가입 선택
	@RequestMapping("/member/joinChoose")
	public String joinChoose() {
		return "member/joinChoose";
	}

	// 로그인 페이지
	@RequestMapping("/member/loginForm")
	public String loginForm() {
		return "member/loginForm";
	}

	// 로그인
	@ResponseBody
	@RequestMapping("/member/login")
	public boolean login(@RequestParam HashMap<String, Object> map, HttpSession session) {
		MemberVO vo = memService.login(map);
		boolean result = false;

		if (vo != null) {
			session.setAttribute("sid", map.get("memId"));
			session.setAttribute("sidNick", vo.getMemNick());
			result = true;
		}

		return result;
	}

	// 로그아웃
	@RequestMapping("/member/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

	// 마이페이지
	@RequestMapping("/member/myPageForm")
	public String myPageForm(HttpSession session, Model model) {
		String memId = (String) session.getAttribute("sid");
		MemberVO vo = memService.getMemData(memId);

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 M월 d일(E) HH시 mm분 ss초", Locale.KOREAN);

		if (vo != null) {
			Date joinDate = vo.getMemJoinDate(); // Date 객체로 가정
			String formattedJoinDate = formatter.format(joinDate);

			model.addAttribute("vo", vo);
			model.addAttribute("date", formattedJoinDate);
		}

		return "member/myPageForm";
	}

	// 마이페이지 등록정보
	@RequestMapping("/member/myPageChildInfo")
	public String myPageChildInfo(HttpSession session, Model model) {
		String memId = (String) session.getAttribute("sid");
		MemberVO vo = memService.getMemData(memId);

		if (vo != null) {
			model.addAttribute("vo", vo);
		}

		return "member/myPageChildInfo";
	}

	// 마이 페이지 수상경력
	@RequestMapping("/member/myPageAwardsForm")
	public String myPageAwardsForm() {
		return "member/myPageAwardsForm";
	}

	// 마이페이지 닉네임 변경 중복 체크
	@RequestMapping("/member/myPageNickChk")
	@ResponseBody
	public String myPageNickChk(@RequestParam("nick") String nick, @RequestParam("OriginNick") String OriginNick) {
		String result = "false";
		String pattern1 = "^(?=.*[ㄱ-ㅎ가-힣])[가-힣a-zA-Z*\\d*]{3,8}$";
		String pattern2 = "^(?=.*[a-zA-Z])[a-zA-Zㄱ-ㅎ가-힣*\\d*]{3,8}$";

		String memNick = memService.joinMemNickChk(nick);

		if (memNick != null) {
			if (memNick.equals(OriginNick))
				return "equal";
			else
				result = "true";
		} else {
			if (Pattern.matches(pattern1, nick) || Pattern.matches(pattern2, nick))
				result = "false";
			else
				result = "true";
		}

		return result;
	}

	// 이미지 업로드 및 저장
	@ResponseBody
	@RequestMapping("/member/imageFileUpload")
	public void imageFileUpload(@RequestParam("uploadFile") MultipartFile file, HttpSession session)
			throws IOException {
		String uploadPath = "C:/springWorkspace/upload/";

		String originalFileName = file.getOriginalFilename();

		File sendFile = new File(uploadPath + originalFileName);

		file.transferTo(sendFile);

		// db에 저장
		String memId = (String) session.getAttribute("sid");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("memId", memId);
		map.put("fileName", originalFileName);

		memService.updateMemImgNo(map);
	}

	// 업로드
	@ResponseBody
	@RequestMapping("/member/imageFileUploadOnly")
	public void imageFileUploadOnly(@RequestParam("uploadFile") MultipartFile file, HttpSession session)
			throws IOException {
		String uploadPath = "C:/springWorkspace/upload/";

		String originalFileName = file.getOriginalFilename();

		File sendFile = new File(uploadPath + originalFileName);

		file.transferTo(sendFile);
	}

	// 마이페이지 정보 업데이트
	@RequestMapping("/member/myPageUpdate")
	public String myPageUpdate(MemberVO vo) {
		memService.myPageUpdate(vo);

		return "redirect:/member/myPageForm";
	}

	// 회원탈퇴
	@ResponseBody
	@RequestMapping("/member/memDeleteAccount")
	public void memDeleteAccount(HttpSession session) {
		String memId = (String) session.getAttribute("sid");

		memService.memDeleteAccount(memId);
		childService.memDeleteAccount(memId);
		session.invalidate();
	}
}
