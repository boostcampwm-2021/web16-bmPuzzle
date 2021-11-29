import React from "react";
import { shallow } from "enzyme";
import Login from "@pages/login";
import RegPuz from "@pages/register-puzzle/index";
import Main from "@pages/main/index";
import Mypage from "@pages/mypage/index";
import Ranking from "@pages/ranking/index";
import Warning from "@pages/warning/index";

jest.mock("paper", () => {
  const mpaper: any = {
    setup: () => {
      return true;
    },
    point: () => {
      return true;
    },
  };
  return jest.fn(() => mpaper);
});
describe("renderLogin", () => {
  let component: any;

  it("renders correctly", () => {
    component = shallow(<Login />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
describe("renderMain", () => {
  let component: any;

  it("renders correctly", () => {
    component = shallow(<Main />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
describe("renderMypage", () => {
  let component: any;

  it("renders correctly", () => {
    component = shallow(<Mypage />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
describe("renderRanking", () => {
  let component: any;

  it("renders correctly", () => {
    component = shallow(<Ranking />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
describe("renderWarning", () => {
  let component: any;

  it("renders correctly", () => {
    component = shallow(<Warning warn={"noUser"} />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
describe("renderRegPuz", () => {
  let component: any;

  it("renders correctly", () => {
    component = shallow(<RegPuz />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
