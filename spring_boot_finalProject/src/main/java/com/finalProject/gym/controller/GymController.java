package com.finalProject.gym.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalProject.gym.model.ChildVO;
import com.finalProject.gym.model.MemberVO;
import com.finalProject.gym.service.ChildService;
import com.finalProject.gym.service.GymService;
import com.finalProject.gym.service.MemberService;

import jakarta.servlet.http.HttpSession;

@Controller
public class GymController {

	private GymService gymService;
	private ChildService childService;
	private MemberService memService;

	@Autowired
	public GymController(GymService gymService, ChildService childService, MemberService memService) {

		this.gymService = gymService;
		this.childService = childService;
		this.memService = memService;
	}

	// 업주 회원가입 페이지
	@RequestMapping("/gym/insertGymForm")
	public String insertGymForm() {
		return "gym/insertGymForm";
	}

	// 도장 등록 페이지
	@RequestMapping("/gym/joinAndPayGym")
	public String joinAndPayGym(Model model, HttpSession session) {
		String memId = (String) session.getAttribute("sid");
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		ArrayList<ChildVO> chvoList = childService.getMyChildren(memId);

		if (chvoList != null) {
			for (ChildVO vo : chvoList) {
				if (!vo.getGymName().equals("미등록")) {
					map.put(vo.getGymName(), gymService.getGymPriceByGymName(vo.getGymName()).getGymPrice());
				}
			}

			if (!map.isEmpty())
				model.addAttribute("map", map);

			model.addAttribute("chvoList", chvoList);
		}

		return "gym/joinAndPayGym";
	}

	// 체육관 회비 가져오기
	@ResponseBody
	@GetMapping("/gym/getGymPriceByGymName/{name}")
	public int getmyChildInfo(@PathVariable String name) {
		// System.out.println(name);
		MemberVO vo = gymService.getGymPriceByGymName(name);
		int price = vo.getGymPrice();

		return price;
	}

	/*
	 * @ResponseBody
	 * 
	 * @RequestMapping("/gym/getmyChildInfo") public ArrayList<ChildVO>
	 * getmyChildInfo(HttpSession session) { String memId =
	 * (String)session.getAttribute("sid"); ArrayList<ChildVO> chvoList =
	 * childService.getMyChildren(memId);
	 * 
	 * return chvoList; }
	 */

	
	@ResponseBody
	@RequestMapping("/gym/getGymDataByName")
	public MemberVO getGymDataByName(@RequestParam("gymName") String gymName) {
		MemberVO vo = gymService.getGymDataByName(gymName);

		return vo;
	}

	// 회원관리 폼
	@RequestMapping("/gym/memberManageForm")
	public String memberManageForm(HttpSession session, Model model) {

		String memId = (String) session.getAttribute("sid");
		MemberVO vo = memService.getMemData(memId);
		
		boolean chk = false;

		 
		model.addAttribute("vo", vo);
		

		model.addAttribute("chk", chk);

		return "gym/memberManageForm";
	}

}
