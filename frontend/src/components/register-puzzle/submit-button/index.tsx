import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useToastContext from "@src/hooks/use-toast";
import { getID } from "@src/js/is-login";

type PropsType = {
  title: string;
  selectedImg: File | null;
  checkedLevel: number;
};
const Submit = (props: PropsType) => {
  const history = useHistory();
  const { title, selectedImg, checkedLevel } = props;

  const addToast: any = useToastContext();
  const submitHandler = async () => {
    const formData = new FormData();
    const id = getID();
    if (selectedImg === null || title === "") {
      addToast("양식을 다 채우세요 🧩", "X");
      return false;
    }
    formData.append("userId", id);
    formData.append("title", title);
    formData.append("img", selectedImg);
    formData.append("level", String(checkedLevel));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: {},
      body: formData,
    });
    if (response.status === 200) {
      history.push("/main");
    } else {
      addToast("업로드에 실패했습니다 🧩");
    }
  };

  return (
    <div>
      <Btn type="submit" onClick={submitHandler}>
        submit
      </Btn>
    </div>
  );
};

const Btn = styled.button`
  width: 100%;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1.5% 5%;
  font-size: 14px;
  font-weight: 900;
  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default Submit;
