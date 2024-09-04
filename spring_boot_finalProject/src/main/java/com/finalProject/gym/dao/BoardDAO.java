package com.finalProject.gym.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.finalProject.gym.model.BoardVO;
import com.finalProject.gym.model.CommentVO;

public interface BoardDAO {
	public List<BoardVO> selectBoardPage(String boardCtg, @Param("offset") int offset, @Param("limit") int limit, ArrayList<String> gymNameList); //페이징
	public int selectBoardCount(@Param("boardCtg") String boardCtg, ArrayList<String> gymNameList); // 전체 게시글양 가져오기
    public void writeInBoard(BoardVO vo); //게시글 작성
    public BoardVO getBoardContents(int boardNo); // 게시글 내용 가져오기
    public void boardDelete(int boardNo); // 게시글 지우기
    public void boardUpdate(BoardVO vo); //게시글 업데이트
    public void incrementViewCount(int boardNo); // 조회수 증가
    public void addCommentToBoardContent(CommentVO vo); //댓글 등록
    public ArrayList<CommentVO> getComments(int boardNo); //댓글 가져오기
    public List<BoardVO> getMyBoards(String memId, @Param("offset") int offset, @Param("limit") int limit); //내 글 페이징
	public int getTotalMyBoardCount(String memId); // 전체 내 게시글양 가져오기
}
