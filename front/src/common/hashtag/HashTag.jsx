import { useState, useCallback } from "react";
import { Input } from "../input";
import { useInput } from "../../hooks";
import { HashTagContainer, HashTagItem, HashTagText } from "./styled";

export const HashTag = ({ width, height, color, placeholder, tags, setTags }) => {
  // const [tags, setTags] = useState([]);
  const hashtag = useInput("");

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      const newTag = hashtag.value;
      if (newTag && !tags.includes(newTag) && tags.length < 3) {
        
        setTags([...tags, newTag]);
        hashtag.clear();
      }
    }
  },[hashtag]);


  const handleDeleteTag = (tag) => {
    const newTags = tags.filter((v) => v !== tag);
    setTags(newTags);
  };

  return (
    <>
      <HashTagContainer height={height} width={width}>
        <Input
          type="text"
          id="hashtag"
          name="hashtag"
          value={hashtag.value}
          onChange={hashtag.onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        {tags.map((tag) => (
          <HashTagItem key={tag} color={color} onClick={() => handleDeleteTag(tag)}>
            <HashTagText color={color}>{`${tag}`}</HashTagText>
          </HashTagItem>
        ))}
      </HashTagContainer>
    </>
  );
};
