package com.finalProject.gym.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalProject.gym.model.CartVO;
import com.finalProject.gym.model.MemberVO;
import com.finalProject.gym.model.OrderVO;
import com.finalProject.gym.model.PrdBoardVO;
import com.finalProject.gym.model.ProductVO;
import com.finalProject.gym.service.MemberService;
import com.finalProject.gym.service.ProductService;

import edu.emory.mathcs.backport.java.util.Arrays;
import jakarta.servlet.http.HttpSession;

@Controller
public class ProductController {

	private ProductService prdService;
	private MemberService memService;

	@Autowired
	public ProductController(ProductService prdService, MemberService memService) {
		this.prdService = prdService;
		this.memService = memService;
	}

	// 상품 폼
	@GetMapping("/prd/prdForm")
	public String productForm(@RequestParam(value = "ctg", required = false) String ctg,
			@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize, Model model) {

		ArrayList<ProductVO> prdList = prdService.getCtgProduct(ctg, page, pageSize);
		int totalProducts = prdService.getTotalProductCount(ctg);
		int totalPages = (int) Math.ceil((double) totalProducts / pageSize);

		model.addAttribute("ctg", ctg);
		model.addAttribute("prdList", prdList);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("pageSize", pageSize);

		return "product/productUniformView";
	}

	// 상품 등록 폼
	@RequestMapping("/prd/insertProductForm")
	public String insertPrdForm() {
		return "product/insertProductForm";
	}

	// 상품 등록
	@ResponseBody
	@RequestMapping("/prd/insertProduct")
	public void insertPrd(@RequestParam(value = "prdMain", required = false) String prdMain,
			@RequestParam(value = "prdDetail", required = false) String prdDetail,
			@RequestParam("prdName") String prdName, @RequestParam("prdPrice") int prdPrice,
			@RequestParam("prdImg") String prdImg, @RequestParam("ctgId") String ctgId, HttpSession session) {

		String memId = (String) session.getAttribute("sid");
		ProductVO vo = new ProductVO();

		vo.setMemId(memId);
		vo.setCtgId(ctgId);
		vo.setPrdMain(prdMain);
		vo.setPrdDetail(prdDetail);
		vo.setPrdName(prdName);
		vo.setPrdPrice(prdPrice);
		vo.setPrdImg(prdImg);

		prdService.insertProduct(vo);
	}

	// Date를 LocalDate로 변환하는 메소드
	private static LocalDate convertDateToLocalDate(Date date) {
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}

	// 상품 상세 폼
	@GetMapping("/prd/productDetailForm")
	public String productDetailForm(@RequestParam(value = "prdNo") int prdNo,
			@RequestParam(value = "ctg", required = false) String ctg, @RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int pageSize, Model model) {

		if (ctg == null)
			ctg = "후기";

		// 상품 상세 조회
		ProductVO pvo = prdService.getProductDetail(prdNo);

		// 상품 게시판
		ArrayList<PrdBoardVO> prdBoardList = prdService.getPrdBoard(prdNo, ctg, page, pageSize);
		int totalProducts = prdService.getTotalPrdBoardCount(ctg, prdNo);
		int totalPages = (int) Math.ceil((double) totalProducts / pageSize);

		SimpleDateFormat formatter = new SimpleDateFormat("yy-MM-dd HH:mm", Locale.KOREAN);

		LocalDate today = LocalDate.now();

		String creatAt = "";
		for (PrdBoardVO prdboard : prdBoardList) {
			Date writeDate = prdboard.getCreatedAt(); // Date 객체로 가정
			LocalDate writeLocalDate = convertDateToLocalDate(writeDate);
			String formattedWriteDate = formatter.format(writeDate);

			if (writeLocalDate.equals(today)) {
				creatAt = formattedWriteDate.substring(9, 14);
				prdboard.setFormatDate(creatAt);
			} else {
				creatAt = formattedWriteDate.substring(3, 8);
				prdboard.setFormatDate(creatAt);
			}
		}

		model.addAttribute("prdNo", prdNo);
		model.addAttribute("ctg", ctg);
		model.addAttribute("prdBoardList", prdBoardList);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("pageSize", pageSize);

		model.addAttribute("pvo", pvo);

		return "product/productDetailForm";
	}

	// 상품 게시판
	@ResponseBody
	@GetMapping("/prd/getPrdBoardContent/{prdBoardNo}")
	public HashMap<String, String> getPrdBoardContent(@PathVariable int prdBoardNo, HttpSession session) {
		PrdBoardVO pbvo = prdService.getPrdBoardContent(prdBoardNo);

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("contents", pbvo.getPrdContent());

		if (pbvo.getMemId().equals((String) session.getAttribute("sid")))
			map.put("idChk", "true");
		else
			map.put("idChk", "false");

		// 조회수
		// 세션을 이용한 방법
		// 세션에서 방문한 게시글 ID 목록을 가져옴
		@SuppressWarnings("unchecked")
		Set<Integer> viewedBoards = (Set<Integer>) session.getAttribute("viewedBoards");
		if (viewedBoards == null) {
			viewedBoards = new HashSet<>();
		}

		// 게시글이 세션에 존재하지 않으면 조회수 증가
		if (!viewedBoards.contains(prdBoardNo)) {
			prdService.incrementViewCount(prdBoardNo);
			viewedBoards.add(prdBoardNo); // 게시글 ID를 세션에 추가
			session.setAttribute("viewedBoards", viewedBoards); // 세션에 저장
			map.put("view", (pbvo.getViewNum() + 1) + "");
		}

		return map;
	}

	// 상품 게시판 글쓰기 폼
	@RequestMapping("/prd/prdBoardWriteForm")
	public String prdBoardWriteForm(@RequestParam("prdNo") int prdNo, Model model) {
		model.addAttribute("prdNo", prdNo);

		return "product/productBoardWriteForm";
	}

	// 상품 게시판 글쓰기
	@ResponseBody
	@RequestMapping("/prd/prdBoardWrite")
	public void prdBoardWrite(@RequestParam HashMap<String, Object> map, @RequestParam("prdNo") int prdNo) {
		PrdBoardVO pbvo = new PrdBoardVO();
		pbvo.setPrdBoardCtg((String) map.get("prdBoardCtg"));
		pbvo.setPrdTitle((String) map.get("prdTitle"));
		pbvo.setPrdContent((String) map.get("prdContent"));
		pbvo.setMemId((String) map.get("memId"));
		pbvo.setPrdNo(prdNo);

		String nick = memService.getMemNick((String) map.get("memId"));
		pbvo.setMemNick(nick);

		prdService.writeInPrdBoard(pbvo);
	}

	// 상품 게시판 글삭제
	@ResponseBody
	@GetMapping("/prd/prdBoardDelete/{prdBoardNo}")
	public void prdBoardWrite(@PathVariable int prdBoardNo) {

		prdService.prdBoardDelete(prdBoardNo);
	}

	// 상품삭제
	@GetMapping("/prd/prdDelete/{prdNo}/{ctgId}")
	public String prdDelete(@PathVariable int prdNo, @PathVariable String ctgId) {
		prdService.prdDelete(prdNo);

		String encodedCtg = null;

		try {
			encodedCtg = URLEncoder.encode(ctgId, "UTF-8");
		} catch (UnsupportedEncodingException e) {

			e.printStackTrace();
		}

		return "redirect:/prd/prdForm?ctg=" + encodedCtg;
	}

	// 상품수정
	@GetMapping("/prd/updatePrd/{prdNo}")
	public String updatePrd(@PathVariable int prdNo, Model model) {
		ProductVO pvo = prdService.getProductDetail(prdNo);

		model.addAttribute("pvo", pvo);

		return "product/updateProductForm";
	}

	// json 형태로 받기
	/*
	 * @ResponseBody
	 * 
	 * @PostMapping("/prd/updateProduct") public void updateProduct(@RequestBody
	 * ProductVO prdVO) { prdService.updateProduct(prdVO); }
	 */

	// ajax data 한번에 받기
	@ResponseBody
	@PostMapping("/prd/updateProduct")
	public void updateProduct(@ModelAttribute ProductVO prdVO) {
		prdService.updateProduct(prdVO);
	}

	// 상품 검색
	@GetMapping("/prd/prdSearch")
	public String prdSearchForm(@RequestParam(value = "keyword", required = false) String keyword,
			@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize, Model model) {

		ArrayList<ProductVO> prdSearchList = prdService.getPrdSearchResult(keyword, page, pageSize);
		int totalProducts = prdService.getTotalProductSearchCount(keyword);
		int totalPages = (int) Math.ceil((double) totalProducts / pageSize);

		model.addAttribute("prdSearchList", prdSearchList);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("pageSize", pageSize);
		model.addAttribute("keyword", keyword);

		return "product/productSearchForm";
	}

	// 장바구니
	@RequestMapping("/prd/prdCartForm")
	public String prdCartForm(HttpSession session, Model model) {
		String memId = (String) session.getAttribute("sid");
		ArrayList<CartVO> cartList = prdService.getPrdInMyCart(memId);

		model.addAttribute("cartList", cartList);

		return "product/productCartForm";
	}

	// 장바구니 담기
	@ResponseBody
	@PostMapping("/prd/addPrdCart")
	public void addPrdCart(@ModelAttribute CartVO cartvo, HttpSession session) {
		String memId = (String) session.getAttribute("sid");

		cartvo.setMemId(memId);

		boolean no = prdService.prdNoCheck(cartvo);

		if (!no) {
			prdService.addPrdCart(cartvo);
		} else {
			prdService.updatePrdCart(cartvo);
		}

	}

	// 장바구니 상품 삭제
	@ResponseBody
	@PostMapping("/prd/deletePrdInMyCart")
	public String deletePrdInMyCart(@RequestParam("cartNo") int cartNo) {
		prdService.deletePrdInMyCart(cartNo);

		return "success";
	}

	// 상품 수량 변경
	@ResponseBody
	@PostMapping("/prd/changePrdQty")
	public void changePrdQty(@RequestParam("cartNo") int cartNo, @RequestParam("cartQty") int cartQty) {
		prdService.changePrdQty(cartNo, cartQty);
	}

	// 상품 사이즈 변경
	@ResponseBody
	@PostMapping("/prd/changePrdSize")
	public void changePrdSize(@RequestParam("cartNo") int cartNo, @RequestParam("prdSize") String prdSize) {
		prdService.changePrdSize(cartNo, prdSize);
	}

	// 결제페이지
	@SuppressWarnings("unchecked")
	@RequestMapping("/prd/productBuyForm")
	public String productBuyForm(HttpSession session, Model model) {
		String memId = (String) session.getAttribute("sid");
		MemberVO vo = memService.getMemData(memId);

		ArrayList<CartVO> cartList = (ArrayList<CartVO>) session.getAttribute("cartList");
		if (cartList != null) {
			model.addAttribute("cartList", cartList);
		}

		model.addAttribute("vo", vo);

		return "product/productBuyForm";
	}

	@ResponseBody
	@RequestMapping("/prd/productBuy")
	public String productBuy(@RequestBody Map<String, ArrayList<Integer>> requestData, HttpSession session) {
		ArrayList<Integer> cartArr = requestData.get("cartArr");
		ArrayList<CartVO> cartList = prdService.myCartSendOrder(cartArr);

		session.setAttribute("cartList", cartList);

		return "/prd/productBuyForm";
	}

	// 결제
	@ResponseBody
	@SuppressWarnings("unchecked")
	@PostMapping(value = "/prd/prdBuy", consumes = "application/json")
	public String prdBuy(@RequestBody OrderVO ordVO, HttpSession session) {

		String memId = (String) session.getAttribute("sid");
		ordVO.setMemId(memId);

		int ordNo = prdService.order(ordVO);

		ArrayList<CartVO> cartList = (ArrayList<CartVO>) session.getAttribute("cartList");
		ArrayList<Integer> cartNoList = new ArrayList<Integer>();
		ordVO = new OrderVO();

		for (CartVO cartvo : cartList) {
			ordVO = new OrderVO();
			ordVO.setOrdNo(ordNo);
			ordVO.setPrdNo(cartvo.getPrdNo());
			ordVO.setOrdQty(cartvo.getCartQty());
			ordVO.setOrdOption(cartvo.getPrdSize());

			cartNoList.add(cartvo.getCartNo());

			prdService.insertOrderPrd(ordVO);
		}

		prdService.deleteMyCartAfterOrder(cartNoList);
		session.removeAttribute("cartList");

		return "/prd/orderHistoryForm";
	}

	// 주문내역
	@RequestMapping("/prd/orderHistoryForm")
	public String orderHistoryForm(HttpSession session, Model model) {

		String memId = (String) session.getAttribute("sid");

		ArrayList<OrderVO> ordList = prdService.getMyOrderHistory(memId);
		ArrayList<OrderVO> hisList = new ArrayList<OrderVO>();

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREAN);
		int bfNo = -1;
		
		for (OrderVO list : ordList) {
			
			if (bfNo != list.getOrdNo()) {
				String ordDateFmt = formatter.format(list.getOrdDate());
				list.setOrdDateFmt(ordDateFmt);

				ProductVO pvo = prdService.getProductDetail(list.getPrdNo());
				pvo.setOrdQty(list.getOrdQty());
				pvo.setOrdOption(list.getOrdOption());

				ArrayList<ProductVO> prdList = list.getOrdList() != null ? new ArrayList<ProductVO>(list.getOrdList())
						: new ArrayList<ProductVO>();
				prdList.add(pvo);
				list.setOrdList(prdList);
				
				bfNo = list.getOrdNo();
				hisList.add(list);
			} else {
				ProductVO pvo = prdService.getProductDetail(list.getPrdNo());
				pvo.setOrdQty(list.getOrdQty());
				pvo.setOrdOption(list.getOrdOption());
				
				ArrayList<ProductVO> prdList = hisList.get(hisList.size() - 1).getOrdList();
				prdList.add(pvo);
				list.setOrdList(prdList);
				bfNo = list.getOrdNo();
			}
		}

		model.addAttribute("hisList", hisList);
		
		return "product/orderHistoryForm";
	}

	// 즉시구매
	@ResponseBody
	@RequestMapping("/prd/immediatelyPrdtBuy")
	public String immediatelyPrdtBuy(@ModelAttribute CartVO cartvo, HttpSession session) {
		String memId = (String) session.getAttribute("sid");

		cartvo.setMemId(memId);

		boolean no = prdService.prdNoCheck(cartvo);

		if (!no) {
			prdService.addPrdCart(cartvo);
		} else {
			prdService.updatePrdCart(cartvo);
		}

		int cartNo = prdService.nowOrdGetCartNo(cartvo);
		ArrayList<Integer> cartArr = new ArrayList<Integer>();
		cartArr.add(cartNo);

		ArrayList<CartVO> cartList = prdService.myCartSendOrder(cartArr);

		cartList.get(0).setCartQty(cartvo.getCartQty());
		cartList.get(0).setPrdSize(cartvo.getPrdSize());

		session.setAttribute("cartList", cartList);

		return "/prd/productBuyForm";
	}
}
