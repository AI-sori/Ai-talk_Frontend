import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import styled from "styled-components";
import BackSvg from "../assets/community/Back.svg";
import LikeIcon from "../assets/Like.svg";
import LikeAfterIcon from "../assets/Likeafter.svg";
import useAuthStore from "../stores/useAuthStore";
import DeleteModal from "../components/DeleteModal";
import DeletePostModal from "../components/DeletePostModal";

const Outer = styled.div`
  width: 100vw;
  min-height: 100dvh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background: #f8fafc;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 19px;
  border: none;
  background: transparent;
  margin-bottom: 1.2rem;
   margin-left: -20px;
  cursor: pointer;
  font-weight: bold;
  color: #333; 
  font-family: ExtraBold;
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 13px;
  color: #888;
  font-family: Regular;
`;

const Tag = styled.span`
  background: #d7e5ff;
  color: #4171d6;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  font-family: Regular;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: Bold;
   color: black;
`;

const Content = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 14px;
  color: #777;
  padding: 0.8rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  font-family: Regular;
`;

const CommentTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: black;
  font-family: Regular;
`;

const Comment = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const CommentAuthor = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #111;
  font-family: Regular;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: #999;
  font-family: Regular;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #444;
  font-family: Regular;
  line-height: 1.5;
  white-space: pre-line;
`;

const CommentInputWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.7rem 1rem;
  font-size: 14px;
  color: black;
  background:rgb(253, 253, 253);
  border-radius: 10px;
  font-family: Regular;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const SubmitButton = styled.button`
  background: #94b5e9;
  color: white;
  padding: 0.7rem 1.2rem;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  font-family: Regular;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }

  span {
    font-size: 14px;
    color: #777;
  }
`;
const RightMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: Regular;
   &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Action = styled.button`
  background: none;
  border: none;
  font-size: 12px;
   white-space: nowrap;
  color: #555;
  cursor: pointer;
  font-family: Regular;
   &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;
const EditTextarea = styled.textarea`
  width: 280px;
  height: 80px;
  font-size: 14px;
  border-radius: 8px;
  font-family: Regular;
  background:rgb(253, 253, 253);
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  color: black;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
const EditActionButton = styled.button`
  font-size: 12px;
  background: none;
  border: none;
  font-family: Regular;
  cursor: pointer;
  color: #555;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
const ThreeDotsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18.5px;
  padding: 0;
  line-height: 1;
   color: #666;
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

type Comment = {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  sessionId?: string; 
};

const CommunityPostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useAuthStore(); 
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [showPostActions, setShowPostActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

const fetchPost = async () => {
  try {
    const res = await axiosInstance.get(`/community/${id}`);
    const data = res.data.data; 

    console.log("게시글 상세 응답(data):", data);

    const fixedComments = (data.comments || []).map((c: any) => ({
      id: c.id,
      sessionId: c.sessionId,
      nickname: c.nickname,
      content: c.content,
      createdAt: c.createdAt,
    }));

    setPost({
      ...data,
      comments: fixedComments,
    });

    setLiked(data.liked);
    setLikeCount(data.likeCount);
  } catch (error) {
    console.error("게시글 상세 불러오기 실패:", error);
  }
};


  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      if (!post?.postId) return;
      await axiosInstance.delete(`/community/post/${post.postId}`);
      setShowDeleteModal(false);
      navigate("/community");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };
  const handleLikeToggle = async () => {
  if (!id) return;
  try {
    if (liked) {
      await axiosInstance.delete(`/community/${id}/like`);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      await axiosInstance.post(`/community/${id}/like`);
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  } catch (error) {
    console.error("좋아요 처리 실패:", error);
  }
};

const handleSubmitComment = async () => {
  if (!id || !comment.trim()) return;
  try {
    await axiosInstance.post(`/community/comments`, {
      postId: Number(id),
      content: comment.trim(),
    });
    setComment("");
    fetchPost();
  } catch (error) {
    console.error("댓글 등록 실패:", error);
  }
};

const handleStartEdit = (commentId: number, content: string) => {
  setEditCommentId(commentId);
  setEditContent(content);
};

const handleUpdateComment = async (commentId: number) => {
  if (!editContent.trim()) return;
  try {
    await axiosInstance.put(`/community/comments/${commentId}`, {
      postId: Number(id),
      content: editContent.trim(),
    });
    setEditCommentId(null);
    setEditContent("");
    fetchPost();
  } catch (error) {
    console.error("댓글 수정 실패:", error);
  }
};

const handleDeleteConfirm = async () => {
  if (!deleteTargetId) return;
  try {
    await axiosInstance.delete(`/community/comments/${deleteTargetId}`);
    setDeleteTargetId(null);
    fetchPost();
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
};

  return (
    <Outer>
      <Wrapper>
        <Container>
          <Back onClick={() => navigate("/community")}>
            <img src={BackSvg} alt="뒤로가기" width={20} height={20} />
            커뮤니티
          </Back>

          {post ? (
            <>
              <Meta>
                <Tag>{post.category}</Tag>
                <span>{post.nickname}</span>

                {user?.sessionId === post.sessionId && (
                  <div style={{ marginLeft: "auto", position: "relative" }}>
                    <ThreeDotsButton
                      onClick={() => setShowPostActions((prev) => !prev)}
                    >
                      ⋮
                    </ThreeDotsButton>

                    {showPostActions && (
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: 0,
                          background: "white",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          zIndex: 10,
                        }}
                      >
                        <Action
                          onClick={() =>
                            navigate(`/community/edit/${post.postId}`)
                          }
                        >
                          수정
                        </Action>
                        <Action
                          onClick={() => {
                            setShowPostActions(false);
                            setShowDeleteModal(true);
                          }}
                        >
                          삭제
                        </Action>
                      </div>
                    )}
                  </div>
                )}
              </Meta>

              <Title>{post.title}</Title>
              <Content>{post.content}</Content>

              {post.image && (
                <img
                  src={post.image}
                  alt="게시글 이미지"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    marginBottom: "1rem",
                  }}
                />
              )}

              <StatusRow>
                <LikeBox onClick={handleLikeToggle}>
                  <img
                    src={liked ? LikeAfterIcon : LikeIcon}
                    alt="좋아요"
                  />
                  <span>{likeCount}</span>
                </LikeBox>
              </StatusRow>

              <CommentTitle>댓글 {post.comments.length}</CommentTitle>
{post.comments.map((c: any) => (
  <Comment key={c.id}>
    <CommentHeader>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <CommentAuthor>{c.nickname}</CommentAuthor>
        <span>·</span>
        <CommentDate>{formatDate(c.createdAt)}</CommentDate>
      </div>

      {c.writer && (   //  ← 댓글 작성자 true이면 수정/삭제 표시
        <RightMeta>
          <Action onClick={() => handleStartEdit(c.id, c.content)}>
            수정
          </Action>
          <Action onClick={() => setDeleteTargetId(c.id)}>
            삭제
          </Action>
        </RightMeta>
      )}
    </CommentHeader>

    {editCommentId === c.id ? (
      <>
        <EditTextarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
          <EditActionButton onClick={() => setEditCommentId(null)}>
            취소
          </EditActionButton>
          <EditActionButton
            onClick={() => handleUpdateComment(c.id)}
            style={{ color: "#4171d6" }}
          >
            저장
          </EditActionButton>
        </div>
      </>
    ) : (
      <CommentText>{c.content}</CommentText>
    )}
  </Comment>
))}


              <CommentInputWrapper>
                <CommentInput
                  placeholder="댓글을 입력해주세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <SubmitButton onClick={handleSubmitComment}>
                  등록
                </SubmitButton>
              </CommentInputWrapper>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </Container>

        {deleteTargetId !== null && (
          <DeleteModal
            onCancel={() => setDeleteTargetId(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}

        {showDeleteModal && (
          <DeletePostModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDeletePost}
          />
        )}
      </Wrapper>
    </Outer>
  );
};

export default CommunityPostDetailPage;