package com.finalProject.gym.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalProject.gym.model.BoardVO;
import com.finalProject.gym.model.CommentVO;
import com.finalProject.gym.model.MemberVO;
import com.finalProject.gym.service.BoardService;
import com.finalProject.gym.service.ChildService;
import com.finalProject.gym.service.GymService;
import com.finalProject.gym.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class BoardController {
	
	private BoardService boardService;
	private MemberService memService;
	private GymService gymService;
	private ChildService childService;
	
	@Autowired
	public BoardController(BoardService boardService,
						   MemberService memService,
						   GymService gymService,
						   ChildService childService) {
		
		this.boardService = boardService;
		this.memService = memService;
		this.gymService = gymService;
		this.childService = childService;
	}

	@GetMapping("/board")
	public String list(@RequestParam(value = "ctg", required = false) String ctg, @RequestParam(defaultValue = "1") int page, 
			@RequestParam(defaultValue = "10") int pageSize, Model model, HttpSession session) {
		
		String memId = (String)session.getAttribute("sid");
		String gymNo = gymService.getGymNo(memId);
		
		ArrayList<String> gymNameList = null;
		List<BoardVO> boards = null;
		int totalBoards = 0;
		int totalPages = 0;
		
		if(ctg.equals("내 글")) {
			boards = boardService.getMyBoards(memId, page, pageSize);
			totalBoards = boardService.getTotalMyBoardCount(memId);
			totalPages = (int) Math.ceil((double) totalBoards / pageSize);
		}else {
			if(gymNo != null) {
				gymNameList = new ArrayList<String>(Arrays.asList(gymService.getGymData(memId).getGymName()));
			}else {
				gymNameList = childService.getMyGymName(memId);
			}
			
			if(!gymNameList.isEmpty()) {
				boards = boardService.getBoards(ctg, page, pageSize, gymNameList);
				totalBoards = boardService.getTotalBoardCount(ctg, gymNameList);
				totalPages = (int) Math.ceil((double) totalBoards / pageSize);	
			}else {
				boards = boardService.getMyBoards(memId, page, pageSize);
				totalBoards = boardService.getTotalMyBoardCount(memId);
				totalPages = (int) Math.ceil((double) totalBoards / pageSize);
				model.addAttribute("msg", "게시판은 체육관 등록 후 이용가능합니다");
			}
		}
		SimpleDateFormat formatter = new SimpleDateFormat("yy-MM-dd HH:mm", Locale.KOREAN);
		
		LocalDate today = LocalDate.now();
		
		String creatAt = "";
		for(BoardVO board:boards) {
			Date writeDate = board.getCreatedAt(); // Date 객체로 가정
			LocalDate writeLocalDate = convertDateToLocalDate(writeDate);
			String formattedWriteDate = formatter.format(writeDate);
			
			if(writeLocalDate.equals(today)) {
				creatAt = formattedWriteDate.substring(9,14);
				board.setFormatDate(creatAt);
			}else {
				creatAt = formattedWriteDate.substring(3,8);
				board.setFormatDate(creatAt);
			}	
		}
		
		model.addAttribute("ctg", ctg);
		model.addAttribute("boards", boards);
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("pageSize", pageSize);

		return "board/boardPage";
	}
	
	// Date를 LocalDate로 변환하는 메소드
	private static LocalDate convertDateToLocalDate(Date date) {
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}
	
	// 페이지별 조회수를 저장 및 조회
	@GetMapping("/boardPage")
	public String contentPage(@RequestParam("boardNo") int boardNo, 
							  HttpServletRequest request,
							  HttpServletResponse response, Model model) {
		//쿠키를 이용한 방식
		boolean isVisited = false;
		Cookie[] cookies = request.getCookies();
		if(cookies != null) {
			for(Cookie cookie:cookies) {
				if(("visited_" + boardNo).equals(cookie.getName())) {
					isVisited = true;
					break;
				}
			}
		}
		
		if(!isVisited) {
			boardService.incrementViewCount(boardNo);
			Cookie newCookie = new Cookie("visited_" + boardNo, "true");
			newCookie.setMaxAge(60*60*24);
			response.addCookie(newCookie);
		}
		
		/* 세션을 이용한 방법
		// 세션에서 방문한 게시글 ID 목록을 가져옴
        Set<Integer> viewedBoards = (Set<Integer>) session.getAttribute("viewedBoards");
        if (viewedBoards == null) {
            viewedBoards = new HashSet<>();
        }

        // 게시글이 세션에 존재하지 않으면 조회수 증가
        if (!viewedBoards.contains(boardNo)) {
            boardService.incrementViewCount(boardNo);
            viewedBoards.add(boardNo); // 게시글 ID를 세션에 추가
            session.setAttribute("viewedBoards", viewedBoards); // 세션에 저장
        }*/
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 M월 d일(E) HH시 mm분 ss초", Locale.KOREAN);
		
		BoardVO vo = boardService.getBoardContents(boardNo);
		
		String formattedWriteDate = formatter.format(vo.getCreatedAt());
		vo.setFormatDate(formattedWriteDate);
		
		model.addAttribute("vo", vo);
		
		return "board/boardContentPage";
	}
	
	@RequestMapping("/boardWritePage")
	public String boardWritePage(HttpSession session, Model model) {
		String gymNo = gymService.getGymNo((String)session.getAttribute("sid"));
		
		model.addAttribute("gymNo", gymNo);
		
		return "board/boardWritePage";
	}
	
	@ResponseBody
	@RequestMapping("/boardWrite")
	public String boardWrite(BoardVO vo, @RequestParam(value = "textAreaContent", required = false) String contents) {
		
		String nick = memService.getMemNick(vo.getMemId());
		String gymNo = gymService.getGymNo(vo.getMemId());
		
		if(gymNo == null) {
			ArrayList<String> gymNameList = childService.getMyGymName(vo.getMemId());
			
			vo.setMemNick(nick);
			vo.setContent(contents);
			
			for(String name:gymNameList) {
				vo.setGymName(name);
				boardService.writeInBoard(vo);
			}
		}else {
			MemberVO memvo = memService.getMemData(vo.getMemId());
			
			vo.setMemNick(nick);
			vo.setContent(contents);
			vo.setGymName(memvo.getGymName());
			boardService.writeInBoard(vo);
		}
		
		return contents;
	}
	
	@GetMapping("/boardUpdatePage")
	public String boardUpdate(@RequestParam("boardNo") int boardNo, Model model) {
		BoardVO vo = boardService.getBoardContents(boardNo);
		model.addAttribute("vo", vo);
		
		return "board/boardUpdatePage";
	}
	
	@ResponseBody
	@RequestMapping("/boardUpdate")
	public int boardUpdate(BoardVO vo, @RequestParam(value = "textAreaContent", required = false) String contents) {
		vo.setContent(contents);
		
		boardService.boardUpdate(vo);
		return vo.getBoardNo();
	}
	
	@GetMapping("/boardDelete")
	public String boardDelete(@RequestParam("ctg") String boardCtg,
							  @RequestParam("boardNo") int boardNo) {
		boardService.boardDelete(boardNo);
		
		String encodedCtg = null;
		
		try {
			encodedCtg = URLEncoder.encode(boardCtg, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			
			e.printStackTrace();
		}
		
		return "redirect:/board?ctg=" + encodedCtg;
	}
	
	@ResponseBody
	@RequestMapping("/addCommentToBoardContent")
	public boolean addCommentToBoardContent(CommentVO vo,
			                             @RequestParam("memId") String memId,
										 @RequestParam("comment") String comment,
										 @RequestParam("memNick") String memNick,
										 @RequestParam("boardNo") int boardNo) {
		
		vo.setMemId(memId);
		vo.setMemNick(memNick);
		vo.setComment(comment);
		vo.setBoardNo(boardNo);
		
		boardService.addCommentToBoardContent(vo);
		
		return true;
	}
	
	@ResponseBody
	@RequestMapping("/getComment")
	public ArrayList<CommentVO> getComment(@RequestParam("boardNo") int boardNo) {
		
		ArrayList<CommentVO> commentList = boardService.getComments(boardNo);
		
		return commentList;
	}
	
}
