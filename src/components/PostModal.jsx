import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";
import { Timestamp } from "firebase/firestore";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [sharedImage, setShareImage] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [imageAssetArea, setImageAssetArea] = useState("image");

  const handleFileChange = (e) => {
    const image = e.target.files[0];

    if (image === null || image === undefined || image === "") {
      setShareImage(null);
      alert("Not an image, the file is " + typeof image);
      return;
    }

    setShareImage(image);
  };

  const switchAssetArea = (value) => {
    setShareImage(null);
    setVideoLink("");
    setImageAssetArea(value);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: sharedImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    };

    props.postArticle(payload);
   // props.handleClick(e);
  };

  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={(e) => props.handleClick(e)}>
            <img alt="" src="/images/close-icon.png" />
          </button>
        </Header>
        <SharedContent>
          <UserInfo>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}

            {props.user && props.user.displayName ? (
              <span> {props.user.displayName}</span>
            ) : (
              <span>Name</span>
            )}
          </UserInfo>

          <Editor>
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus={true}
            ></textarea>
            {imageAssetArea === "image" ? (
              <UploadImage>
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/png"
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <p>
                  <label htmlFor="file" style={{ cursor: "pointer" }}>
                    Select an image
                  </label>
                </p>

                {sharedImage && (
                  <img src={URL.createObjectURL(sharedImage)} alt="" />
                )}
              </UploadImage>
            ) : (
              imageAssetArea === "media" && (
                <>
                  <input
                    type="text"
                    placeholder="Please input a video link"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
                  {videoLink && <ReactPlayer width="100%" url={videoLink} />}
                </>
              )
            )}
          </Editor>
        </SharedContent>
        <SharedCreation>
          <AttachAssets>
            <AssetButton onClick={() => switchAssetArea("image")}>
              <img src="/images/shared-img.png" alt="" />
            </AssetButton>
            <AssetButton onClick={() => switchAssetArea("media")}>
              <img src="/images/shared-vid.png" alt="" />
            </AssetButton>
          </AttachAssets>

          <ShareComment>
            <AssetButton>
              <img src="/images/shared-comment.png" alt="" /> Anyone
            </AssetButton>
          </ShareComment>

          <PostButton
            disabled={editorText.length === 0}
            onClick={(e) => postArticle(e)}
          >
            Post{" "}
          </PostButton>
        </SharedCreation>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.4s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 550px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    max-width: auto;
    color: rgba(0, 0, 0, 0.15);
    padding: 0;
    background-color: inherit;

    cursor: pointer;

    img {
      pointer-events: none;
      width: 32px;
      height: 32px;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 100%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.9)" : "#fff")};

  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    cursor: ${(props) => (props.disabled ? "none" : "pointer")};
    outline: none !important;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
