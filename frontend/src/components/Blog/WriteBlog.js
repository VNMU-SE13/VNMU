import React from "react";
import styled from "styled-components";

const EditorWrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 720px;
  margin: 0 auto;
  font-family: Georgia, serif;
  color: #333;
`;

const TitleInput = styled.h1`
  font-size: 3rem;
  color: #999;
  font-weight: 400;
  border: none;
  outline: none;
  background: transparent;
  margin-bottom: 1.5rem;
`;

const StoryWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const AddButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #555;
  background: transparent;
  font-size: 1.25rem;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StoryInput = styled.textarea`
  flex: 1;
  font-size: 1.25rem;
  border: none;
  outline: none;
  resize: none;
  line-height: 1.8;
  color: #666;
  background: transparent;

  &::placeholder {
    color: #bbb;
  }
`;

const WriteBlog = () => {
  return (
    <EditorWrapper>
      <TitleInput contentEditable suppressContentEditableWarning>
        Title
      </TitleInput>
      <StoryWrapper>
        <AddButton>＋</AddButton>
        <StoryInput placeholder="Tell your story..." rows={10} />
      </StoryWrapper>
    </EditorWrapper>
  );
};

export default WriteBlog;