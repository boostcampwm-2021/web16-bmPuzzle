import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "@images/search-icon.png";
import refreshIcon from "@images/refresh-icon.png";
import colors from "@styles/theme";

import getImgfile from "@js/get-img-file";

const SearchBar = (props: any) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  let debounce: ReturnType<typeof setTimeout>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      setSearch(e.target.value);
    }, 100);
  };

  const handleGo = () => history.push("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: search,
      }),
    });

    if (response.ok) {
      let img = await response.json();
      if (img.data.length === 0) props.setImg(undefined);
      else props.setImg(getImgfile(img.fileName, img.data));
    }
  };

  return (
    <Wrapper>
      <Input ref={inputRef} placeholder="Search" onChange={handleChange} />
      <Btn onClick={handleSubmit}>
        <Img src={searchIcon} />
      </Btn>
      <Btn onClick={handleGo}>
        <Img src={refreshIcon} style={{ width: "20px", opacity: "0.5" }} />
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 77%;
  margin: auto;
  border: 1px solid ${colors["gray3"]};
  border-radius: 40px;
  height: 20px;
  position: absolute;
  top: 95px;
  background-color: white;
  justify-content: space-between;
  padding: 0.5% 1% 0.5% 2%;
  display: flex;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
`;

const Img = styled.img`
  width: 30px;
  height: 20px;
`;

const Btn = styled.button`
  border: none;
  background: none;
  &: active {
    border-style: outset;
  }
  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default SearchBar;
