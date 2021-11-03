import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/header/index";
import ImageCard from "@components/image-card/index";
import AccountBar from "@components/account-bar/index";

import getImgfile from "@src/js/get-img-file";

const Mypage = () => {
  let dummy_image: any[] = [];
  let dummy_user: any = undefined;
  const [user, setUser] = useState(dummy_user);
  const [upSrc, setUp] = useState(dummy_image);
  const [doneSrc, setDone] = useState(dummy_image);

  const myPageEnter = async () => {
    setUser(window.sessionStorage.getItem("id"));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/my`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: window.sessionStorage.getItem("id"),
      }),
    });
    if (response.ok) {
      let img = await response.json();
      setUp(await getImgfile(img.uploadName, img.uploadData));
      setDone(await getImgfile(img.doneName, img.doneData));
    }
  };
  useEffect(() => {
    myPageEnter();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        <AccountBar user={user} />
        <ImageCard img={upSrc} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 80%;
  height: 70%;
  margin: 5% 10%;
  border: 1px solid ${colors["gray3"]};
  overflow-y: scroll;
`;

export default Mypage;
