import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from "./firebase";
import firebase from 'firebase';

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(()=>{
        let unsubscibe;
        if(postId){
            unsubscibe = db
            .collection("posts").doc(postId).collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()));
            });
        }
        return ()=>{
            unsubscibe();
        };
    }, [postId]);
    const postComment=(event)=>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments")
        .add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar" alt={username} src="/static/images/avatar/1.jpg" />
            <h4>&nbsp;{username}</h4>
            </div>
            <img className="post_image" alt="" src= {imageUrl} />
            <p className="post_text"><strong>{username}: </strong>{caption}</p>
            <div className="post_comment">
                {comments.map((comment) => (
                    <p><strong>{comment.username}</strong> {comment.text}</p>
                ))}
            </div>
            {user &&(
                    <form className="post_commentbox">
                    <input className="post_input" type="text"
                        placeholder="Write a comment"
                        value={comment}
                        onChange={(e)=> setComment(e.target.value)} />
                    <button className="post_button" disabled={!comment} 
                        type="submit" onClick={postComment}
                    > Post </button>
                </form>
            )}
            
        </div>
    )   
}

export default Post
