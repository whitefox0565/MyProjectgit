package com.finalProject.gym.controller;



import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalProject.gym.model.ChildVO;
import com.finalProject.gym.service.ChildService;

import jakarta.servlet.http.HttpSession;

@Controller
public class ChildController {
	@Autowired
	ChildService childService;
	
	/*@RequestMapping("/child/signUpGym")
	public String signUpGym(ChildVO vo, HttpSession session, 
							@RequestParam("childBelt") String childBelt,
							@RequestParam("childHp") String childHp,
							@RequestParam("gymName") String gymName) {
		
		String memId = (String)session.getAttribute("sid");
		String childName = vo.getChildName();
		
		String childNo = childService.childNoChk();
		vo.setChildNo(childNo);
		
		String name = childService.newMemberChk(memId, childName);
		String hp = childHp.substring(0, 3) + "-" + childHp.substring(3, 7) + "-" + childHp.substring(7, 11);
		vo.setChildHp(hp);
		
		if(childBelt == null) vo.setChildBelt("흰");
		else vo.setChildBelt(childBelt);
		
		System.out.println(name);
		
		if(name != gymName) {
			vo.setGymName(gymName);
			vo.setMemId(memId);
			childService.signUpGym(vo);
		}
		
		return "redirect:/";
	}*/
	
	@ResponseBody
	@RequestMapping("/child/signUpChildInMyPage")
	public String signUpChildInMyPage(@RequestParam HashMap<String,Object> map, HttpSession session) {
		String memId = (String)session.getAttribute("sid");
		String hp = (String)map.get("childHp");
		hp = hp.substring(0, 3) + "-" + hp.substring(3, 7) + "-" + hp.substring(7, 11);
		
		map.put("memId", memId);
		map.put("childHp", hp);
		
		String chNo = (String)map.get("childNo");
		String no = childService.newChildChk(chNo);
		
		if(no == null) {
			String childNo = childService.childNoChk();
			map.put("childNo", childNo);
			map.put("gymName", "미등록");
			map.put("childBelt", "미등록");
			map.put("deadLine", "미등록");
			
			childService.signUpChildInMyPage(map);
		}else {
			childService.myPageChildUpdate(map);
		}
		
		return "success";
	}
	
	@ResponseBody
	@RequestMapping("/child/loadMyChildInfo")
	public ArrayList<ChildVO> loadMyChildInfo(HttpSession session){
		String memId = (String)session.getAttribute("sid");
		ArrayList<ChildVO> childList = childService.getMyChildren(memId);
		
		return childList;
	}
	
	@ResponseBody
	@RequestMapping("/child/myPageChildDel")
	public void myPageChildDel(@RequestParam("childNo") String childNo) {
		
		childService.myPageChildDel(childNo);
	}
	
	@ResponseBody
	@RequestMapping("/child/childRegistGym")
	public void childRegistGym(@RequestParam HashMap<String, Object> map, @RequestParam("month") int month) {
		
		ChildVO gym = childService.getAlreadyRegistGymName((String)map.get("childNo"));
		
		//마감일 계산
		String day = (String)map.get("date");
		
		DateTimeFormatter fm = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
		DateTimeFormatter calFm = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		
		LocalDate registDay = LocalDate.parse(day, calFm);
		
		if(gym.getGymName().equals("미등록")) {
			String D_day = registDay.plusMonths(month).format(fm) + "까지";
			map.put("deadLine", D_day);
			map.put("childBelt", "흰띠");
			
			childService.registGymNewChild(map);
		}else if(!gym.getGymName().equals((String)map.get("gymName"))){
			String D_day = registDay.plusMonths(month).format(fm) + "까지";
			map.put("deadLine", D_day);
			map.put("childBelt", gym.getChildBelt());
			
			childService.registGymNewChild(map);
		}else {
			String deadLine = gym.getDeadLine().substring(0, 4) + "-" + gym.getDeadLine().substring(6, 8) + "-" +gym.getDeadLine().substring(10, 12);
			LocalDate line = LocalDate.parse(deadLine, calFm);
			
			//현재가 마감일 보다 후면
			if(line.isBefore(registDay)) {
				String D_day = registDay.plusMonths(month).format(fm) + "까지";
				map.put("deadLine", D_day);
				map.put("childBelt", gym.getChildBelt());
				
				childService.registGymNewChild(map);
			}else {
				String D_day = line.plusMonths(month).format(fm) + "까지";
				map.put("deadLine", D_day);
				map.put("childBelt", gym.getChildBelt());
				
				childService.registGymNewChild(map);
			}
		}
		
	}
}
