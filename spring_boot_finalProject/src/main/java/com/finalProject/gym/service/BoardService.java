package com.finalProject.gym.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalProject.gym.dao.BoardDAO;
import com.finalProject.gym.model.BoardVO;
import com.finalProject.gym.model.CommentVO;

@Service
public class BoardService implements IBoardService {
	@Autowired
    private BoardDAO boardMapper;
	
	@Override
	public List<BoardVO> getBoards(String ctg, int page, int pageSize, ArrayList<String> gymNameList) {
		int offset = (page - 1) * pageSize;
        return boardMapper.selectBoardPage(ctg, offset, pageSize, gymNameList);
	}

	@Override
	public int getTotalBoardCount(String ctg, ArrayList<String> gymNameList) {
		return boardMapper.selectBoardCount(ctg, gymNameList);
	}

	@Override
	public void writeInBoard(BoardVO vo) {
		boardMapper.writeInBoard(vo);
	}

	@Override
	public BoardVO getBoardContents(int boardNo) {
		return boardMapper.getBoardContents(boardNo);
	}

	@Override
	public void boardDelete(int boardNo) {
		boardMapper.boardDelete(boardNo);
	}

	@Override
	public void boardUpdate(BoardVO vo) {
		boardMapper.boardUpdate(vo);
	}

	@Override
	public void incrementViewCount(int boardNo) {
		boardMapper.incrementViewCount(boardNo);
	}

	@Override
	public void addCommentToBoardContent(CommentVO vo) {
		boardMapper.addCommentToBoardContent(vo);
	}

	@Override
	public ArrayList<CommentVO> getComments(int boardNo) {
		return boardMapper.getComments(boardNo);
	}

	@Override
	public List<BoardVO> getMyBoards(String memId, int page, int pageSize) {
		int offset = (page - 1) * pageSize;
        return boardMapper.getMyBoards(memId, offset, pageSize);
	}

	@Override
	public int getTotalMyBoardCount(String memId) {
		return boardMapper.getTotalMyBoardCount(memId);
	}
	
	
}
