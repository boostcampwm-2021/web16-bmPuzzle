import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "@images/search-icon.png";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
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
      console.log(img);
    }
  };

  return (
    <Wrapper>
      <Input placeholder="Search" onChange={handleChange} />
      <Btn onClick={handleSubmit}>
        <Img src={searchIcon} />
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 77%;
  margin: auto;
  border: 1.5px solid black;
  border-radius: 40px;
  height: 40px;
  position: absolute;
  top: 115px;
  background-color: white;
  justify-content: space-between;
  padding: 0.5% 1% 0.5% 2%;
  display: flex;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  font-size: 25px;
`;

const Img = styled.img`
  width: 60px;
  height: 40px;
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
