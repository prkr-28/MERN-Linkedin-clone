import React, {useState, useEffect} from 'react';
import Card from '../card/card';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {Link} from 'react-router-dom';

const Post = ({profile, item, profileData}) => {
   const [seemore, setSeeMore] = useState(false);
   const [comment, setComment] = useState(false);
   const [comments, setComments] = useState([]);
   const [like, setLike] = useState(false);
   const [likeCount, setLikeCount] = useState(item?.likes?.length || 0);
   const [commentText, setCommentText] = useState('');
   const [commentCount, SetCommentCount] = useState(item?.comments || 0);
   const descrip = item?.desc;

   const handlesendcomment = async (e) => {
      e.preventDefault();
      if (commentText.trim().length === 0) {
         return toast.error('Please add a comment');
      }
      await axios
         .post(
            'http://localhost:4000/api/comment/',
            {
               postId: item?._id,
               comment: commentText,
            },
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            setCommentText('');
            setComments([...comments, res.data.comment]);
            SetCommentCount(commentCount + 1);
         })
         .catch((err) => {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to add comment');
         });
   };

   useEffect(() => {
      const userId = profileData?._id;
      item?.likes?.map((item) => {
         if (item.toString() === userId.toString()) {
            setLike(true);
            return;
         } else {
            setLike(false);
            return;
         }
      });
   }, []);

   const handleLikeFn = async () => {
      await axios
         .post(
            'http://localhost:4000/api/post/like',
            {
               postId: item?._id,
            },
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            if (like) {
               setLike(false);
               setLikeCount(likeCount - 1);
            } else {
               setLike(true);
               setLikeCount(likeCount + 1);
            }
         })
         .catch((err) => {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to like post');
         });
   };

   const handlecommentsection = async () => {
      setComment(!comment);
      await axios
         .get(`http://localhost:4000/api/comment/${item?._id}`)
         .then((res) => {
            console.log(res);
            setComments(res.data.comments);
         })
         .catch((err) => {
            console.error(err);
            toast.error(
               err.response?.data?.message || 'Failed to fetch comments'
            );
         });
   };
   return (
      <div className="mt-4">
         <Card padding={0}>
            <div className="flex gap-3 p-4">
               <Link
                  to={`/profile/${item?.user?._id}`}
                  className="w-12 h-12 rounded-4xl">
                  <img
                     className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer"
                     src={item?.user?.profile_pic}
                     alt=""
                  />
               </Link>
               <div className="flex flex-col justify-center items-center">
                  <div>
                     <div className="text-md font-semibold">
                        {item?.user?.f_name}
                     </div>
                     <div className="text-xs text-gray-500">
                        {item?.user?.headline}
                     </div>
                  </div>
               </div>
            </div>

            {descrip?.length > 0 && (
               <div className="text-sm pl-4 pr-4 pb-4 whitespace-pre-line flex-grow">
                  {seemore ? descrip : descrip.slice(0, 100) + '...'}{' '}
                  <span
                     className="text-blue-600 cursor-pointer"
                     onClick={() => setSeeMore(!seemore)}>
                     {seemore ? 'See less' : 'See more'}
                  </span>
               </div>
            )}

            {item?.imageLink && (
               <div className="w-[100%] h-[300px] ">
                  <img
                     className="w-full h-full object-cover"
                     src={item?.imageLink}
                     alt=""
                  />
               </div>
            )}
            <div className="my-2 p-4 flex justify-between items-center">
               <div className="flex gap-1 items-center">
                  <ThumbUpIcon sx={{color: 'blue', fontSize: 12}} />{' '}
                  <div className="text-sm text-gray-600">
                     {likeCount} {likeCount <= 1 ? 'like' : 'likes'}
                  </div>
               </div>
               <div className="flex gap-1 items-center">
                  <div className="text-sm text-gray-600">
                     {commentCount} {commentCount <= 1 ? 'comment' : 'comments'}
                  </div>
               </div>
            </div>

            {!profile && (
               <div className="flex p-1 mb-1">
                  <div
                     onClick={handleLikeFn}
                     className="w-1/3 flex justify-center items-center gap-2 p-1 rounded-4xl hover:bg-gray-100 cursor-pointer">
                     {like ? (
                        <ThumbUpIcon sx={{fontSize: 18, color: 'blue'}} />
                     ) : (
                        <ThumbUpOutlinedIcon sx={{fontSize: 18}} />
                     )}
                     <span className="text-sm">{like ? 'Liked' : 'Like'}</span>
                  </div>
                  <div
                     onClick={handlecommentsection}
                     className="w-1/3 flex justify-center items-center gap-2 p-1 rounded-4xl hover:bg-gray-100 cursor-pointer">
                     <InsertCommentIcon sx={{fontSize: 18}} />
                     <span className="text-sm">Comment</span>
                  </div>
                  <div className="w-1/3 flex justify-center items-center gap-2 p-1 rounded-4xl hover:bg-gray-100 cursor-pointer">
                     <SendIcon sx={{fontSize: 18}} />
                     <span className="text-sm">Share</span>
                  </div>
               </div>
            )}

            {/* comment section */}
            {comment && (
               <div className="p-4 w-full">
                  <div className="flex items-center gap-2 mb-2">
                     <img
                        className="w-9 h-9 rounded-full cursor-pointer"
                        src={profileData?.profile_pic}
                        alt=""
                     />
                     <form
                        action=""
                        onSubmit={handlesendcomment}
                        className="w-full flex gap-2">
                        <input
                           value={commentText}
                           onChange={(e) => setCommentText(e.target.value)}
                           type="text"
                           className="w-full border-1 py-2 text-sm px-5 rounded-3xl hover:bg-gray-100"
                           placeholder="Add a comment..."
                        />
                        <button className="cursor-pointer" type="submit">
                           <SendIcon sx={{color: 'blue', fontSize: 20}} />
                        </button>
                     </form>
                  </div>
                  {/* <div className="text-sm text-gray-600">No comments yet</div> */}

                  {comments?.length > 0 ? (
                     comments.map((item, idx) => (
                        <div key={idx} className="w-full p-4">
                           <div className="flex items-center gap-2 mb-2">
                              <Link to={`/profile/${item?.user?._id}`}>
                                 <img
                                    className="w-8 h-8 rounded-full cursor-pointer"
                                    src={item?.user?.profile_pic}
                                    alt=""
                                 />
                              </Link>
                              <div className="text-xs">
                                 <span className="text-sm font-semibold">
                                    {item?.user?.f_name}
                                 </span>{' '}
                                 {item?.comment}
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="w-full flex items-center justify-center text-sm text-gray-600">
                        No comments yet
                     </div>
                  )}
               </div>
            )}
         </Card>
         <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
   );
};

export default Post;
