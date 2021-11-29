import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/common/header/index";
import RankingTable from "@components/ranking/ranking-table/index";
import TitleBar from "@components/common/title-bar/index";

import RankingIcon from "@images/ranking-black-icon.png";
import { getID } from "@src/js/is-login";

const Ranking = () => {
  const type: Array<Object> = [];
  const [rankInfo, setRankInfo] = useState(type);
  const [userRank, setUserRank] = useState(100);
  const getRank = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/ranking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const rankInfo = await response.json();

      rankInfo.rank.forEach((ele: Object, idx: number) =>
        Object.assign(ele, { num: idx })
      );

      const myRank = rankInfo.rank.filter(
        (ele: { id: string }) => ele.id === getID()
      )[0];
      setRankInfo(rankInfo.rank);
      setUserRank(myRank);
    }
  };
  useEffect(() => {
    getRank();
  }, []);
  return (
    <Wrapper>
      <Header />
      <Container>
        <TitleBar text={"Gamer: Ranking"} img={RankingIcon} />
        <RankingTable rankInfo={rankInfo} userRank={userRank} />
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
  overflow: hidden;
  margin: 5% 10%;
  border: 1px solid ${colors["gray3"]};
`;

export default Ranking;
