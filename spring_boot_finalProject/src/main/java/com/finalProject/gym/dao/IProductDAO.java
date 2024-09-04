package com.finalProject.gym.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import com.finalProject.gym.model.CartVO;
import com.finalProject.gym.model.OrderVO;
import com.finalProject.gym.model.PrdBoardVO;
import com.finalProject.gym.model.ProductVO;

public interface IProductDAO {
	public void insertProduct(ProductVO vo); //상품등록
	public ArrayList<ProductVO> getCtgProduct(String ctgId, @Param("offset") int offset, @Param("limit") int limit); //상품 가져오기 카테고리에 따라
	public int getTotalProductCount(@Param("ctgId") String ctgId); // 전체 상품 개수
	public ProductVO getProductDetail(int prdNo); //상품 상세페이지 조회
	public ArrayList<PrdBoardVO> getPrdBoard(int prdNo, String ctgId, @Param("offset") int offset, @Param("limit") int limit); //상품별 게시판
	public int getTotalPrdBoardCount(@Param("ctgId") String ctgId, int prdNo); // 상품 상세 게시판 글 개수
	public PrdBoardVO getPrdBoardContent(int prdBoardNo); // 상품 상세 게시판 내용 가져오기
	public void writeInPrdBoard(PrdBoardVO pbvo); //상품 상세 게시판 글쓰기
	public void prdBoardDelete(int prdBoardNo); //상품 상세 게시판 글삭제
	public void incrementViewCount(int prdBoardNo); //조회수 중복 방지 및 증가
	public void prdDelete(int prdNo); //상품 삭제
	public ArrayList<ProductVO> getPrdSearchResult(String keyword, @Param("offset") int offset, @Param("limit") int limit); //상품검색
	public int getTotalProductSearchCount(@Param("keyword") String keyword); // 상품 검색 결과 개수
	public void updateProduct(ProductVO pvo); // 상품 수정
	public boolean prdNoCheck(CartVO cartvo); //이미 들어있는 상품인지 체크
	public void addPrdCart(CartVO cartvo); //장바구니에 상품 추가
	public void updatePrdCart(CartVO cartvo); //장바구니에 이미 있는 상품 추가
	public ArrayList<CartVO> getPrdInMyCart(String memId); // 장바구니 내용 가져오기
	public void deletePrdInMyCart(int cartNo); // 장바구니 상품 삭제
	public void changePrdQty(int cartNo, int cartQty); // 장바구니 상품 수량변경
	public void changePrdSize(int cartNo, String prdSize); // 장바구니 상품 옵션변경
	public ArrayList<CartVO> myCartSendOrder(ArrayList<Integer> cartArr); // 주문페이지 조회
	public int order(OrderVO ordVO); //주문자 정보 등록 및 주문번호 가져오기
	public boolean ordNoChk(int no); //주문번호 생성
	public void insertOrderPrd(OrderVO ordVO);//주문상품 주문번호에 등록
	public void deleteMyCartAfterOrder(ArrayList<Integer> cartNoList); //주문 후 장바구니 비우기
	public int nowOrdGetCartNo(CartVO cartvo); //즉시구매 장바구니 등록 후 카트넘버 가져오기
	public ArrayList<OrderVO> getMyOrderHistory(String memId); //주문 내역 가져오기
}
