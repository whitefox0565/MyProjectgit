package com.finalProject.gym.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalProject.gym.dao.IProductDAO;
import com.finalProject.gym.model.CartVO;
import com.finalProject.gym.model.OrderVO;
import com.finalProject.gym.model.PrdBoardVO;
import com.finalProject.gym.model.ProductVO;

@Service
public class ProductService implements IProductService {
	private IProductDAO prdDao;
	
	@Autowired
	public ProductService(IProductDAO prdDao) {
		this.prdDao = prdDao;
	}
	
	@Override
	public void insertProduct(ProductVO vo) {
		prdDao.insertProduct(vo);
	}

	@Override
	public ArrayList<ProductVO> getCtgProduct(String ctg, int page, int pageSize) {
		int offset = (page - 1) * pageSize;
		return prdDao.getCtgProduct(ctg, offset, pageSize);
	}

	@Override
	public int getTotalProductCount(String ctg) {
		return prdDao.getTotalProductCount(ctg);
	}

	@Override
	public ProductVO getProductDetail(int prdNo) {
		return prdDao.getProductDetail(prdNo);
	}

	@Override
	public ArrayList<PrdBoardVO> getPrdBoard(int prdNo, String ctgId, int page, int pageSize) {
		int offset = (page - 1) * pageSize;
		return prdDao.getPrdBoard(prdNo, ctgId, offset, pageSize);
	}

	@Override
	public int getTotalPrdBoardCount(String ctgId, int prdNo) {
		return prdDao.getTotalPrdBoardCount(ctgId, prdNo);
	}

	@Override
	public PrdBoardVO getPrdBoardContent(int prdBoardNo) {
		return prdDao.getPrdBoardContent(prdBoardNo);
	}

	@Override
	public void writeInPrdBoard(PrdBoardVO pbvo) {
		prdDao.writeInPrdBoard(pbvo);
	}

	@Override
	public void prdBoardDelete(int prdBoardNo) {
		prdDao.prdBoardDelete(prdBoardNo);
	}

	@Override
	public void incrementViewCount(int prdBoardNo) {
		prdDao.incrementViewCount(prdBoardNo);
	}

	@Override
	public void prdDelete(int prdNo) {
		prdDao.prdDelete(prdNo);
	}

	@Override
	public ArrayList<ProductVO> getPrdSearchResult(String keyword, int page, int pageSize) {
		int offset = (page - 1) * pageSize;
		return prdDao.getPrdSearchResult(keyword, offset, pageSize);
	}

	@Override
	public int getTotalProductSearchCount(String keyword) {
		return prdDao.getTotalProductSearchCount(keyword);
	}

	@Override
	public void updateProduct(ProductVO pvo) {
		prdDao.updateProduct(pvo);
	}

	@Override
	public boolean prdNoCheck(CartVO cartvo) {
		return prdDao.prdNoCheck(cartvo);
	}

	@Override
	public void addPrdCart(CartVO cartvo) {
		prdDao.addPrdCart(cartvo);
	}

	@Override
	public void updatePrdCart(CartVO cartvo) {
		prdDao.updatePrdCart(cartvo);
	}

	@Override
	public ArrayList<CartVO> getPrdInMyCart(String memId) {
		return prdDao.getPrdInMyCart(memId);
	}

	@Override
	public void deletePrdInMyCart(int cartNo) {
		prdDao.deletePrdInMyCart(cartNo);
	}

	@Override
	public void changePrdQty(int cartNo, int qty) {
		prdDao.changePrdQty(cartNo, qty);
	}

	@Override
	public void changePrdSize(int cartNo, String prdSize) {
		prdDao.changePrdSize(cartNo, prdSize);
	}

	@Override
	public ArrayList<CartVO> myCartSendOrder(ArrayList<Integer> cartArr) {
		return prdDao.myCartSendOrder(cartArr);
	}

	
	@Override
	public boolean ordNoChk(int no) {
		return prdDao.ordNoChk(no);
	}

	@Override
	public int order(OrderVO ordVO) {
		Random random = new Random();
		boolean chk = true;
		int ordNo = 0;
		
		while(chk) {
			ordNo = random.nextInt(10000);
			chk = prdDao.ordNoChk(ordNo);
		}
		
		ordVO.setOrdNo(ordNo);
		prdDao.order(ordVO);
		return ordNo;
	}

	@Override
	public void insertOrderPrd(OrderVO ordVO) {
		prdDao.insertOrderPrd(ordVO);
	}

	@Override
	public void deleteMyCartAfterOrder(ArrayList<Integer> cartNoList) {
		prdDao.deleteMyCartAfterOrder(cartNoList);
	}

	@Override
	public int nowOrdGetCartNo(CartVO cartvo) {
		return prdDao.nowOrdGetCartNo(cartvo);
	}

	@Override
	public ArrayList<OrderVO> getMyOrderHistory(String memId) {
		return prdDao.getMyOrderHistory(memId);
	}
	
	
	
}
