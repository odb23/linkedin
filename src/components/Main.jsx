/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useState, useEffect, useMemo } from "react";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.getPosts();
  }, [showModal]);

  const posts = useMemo(() => {
    return [...props.posts];
  }, [props.posts]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    setShowModal(!showModal);
  };

  return (
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={(e) => handleClick(e)}>Start a post</button>
        </div>
        <div>
          <button>
            <img alt="" src="/images/photo-icon.png" />
            <span>Photo</span>
          </button>

          <button>
            <img alt="" src="/images/video-icon.png" />
            <span>Video</span>
          </button>
          <button>
            <img alt="" src="/images/event-icon.png" />
            <span>Event</span>
          </button>
          <button>
            <img alt="" src="/images/article-icon.png" />
            <span>Article</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {props.loading && <img src="/images/spin-loading.gif" alt="" />}
      </Content>

      {posts.length < 1 ? (
        <p>No articles to show</p>
      ) : (
        <div>
          {posts.length > 0 &&
            posts.map((post, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img alt="" src={post.actor.image} />
                    <div>
                      <span>{post.actor.title}</span>
                      <span>{post.actor.description}</span>
                      <span>
                        {post.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src="/images/ellipsis..svg" alt="" />
                  </button>
                </SharedActor>

                <Description>{post.description}</Description>
                <SharedImage>
                  <a>
                    {post.sharedImg ? (
                      <img src={post.sharedImg} alt="" />
                    ) : (
                      post.video && (
                        <ReactPlayer width="100%" url={post.video} />
                      )
                    )}
                  </a>
                </SharedImage>

                <SocialCount>
                  <li>
                    <button>
                      <img src="/images/like-icon.png" alt="" />
                      <img src="/images/clap-icon.png" alt="" />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>10 comments</a>
                  </li>
                </SocialCount>
                <SocialActions>
                  <button>
                    <i className="far fa-thumbs-up"></i>
                    <span>Like</span>
                  </button>
                  <button>
                    <i className="far fa-comment"></i>
                    <span>Comment</span>
                  </button>
                  <button>
                    <i className="fas fa-share"></i>
                    <span>Share</span>
                  </button>
                  <button>
                    <i className="fab fa-telegram-plane"></i>
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            ))}
        </div>
      )}

      {showModal && <PostModal handleClick={handleClick} />}
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0px 12px;
      padding-bottom: 4px;
    }

    button {
      img {
        margin: 0 4px 0 -2px;
        width: 28px;
      }
      span {
        color: #70b5f9;
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: black;
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #e0e0e0;

  img {
    object-fit: contain;
    width: 100%;
    max-height: 450px;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      align-items: center;
      background: transparent;
      border: none;

      img {
        width: 18px;
        margin-right: 2px;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  width: 100%;

  button {
    display: inline-flex;
    align-items: center;
    /* justify-content: center; */
    padding: 8px;
    color: #0a66c2;
    border: none;
    background-color: #fff;
    width: 100%;

    i {
      font-size: 18px;
    }

    span {
      margin-left: 4px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
  loading: state.postState.loading,
  posts: state.postState.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
