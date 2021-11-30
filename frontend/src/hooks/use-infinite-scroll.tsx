import { useState, useEffect } from "react";
let prev = 0;
const getItem = 10;

const useInfiniteScroll = (
  fetchCallback: Function,
  ref: HTMLDivElement | null
) => {
  const [isSetting, setIsSetting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cache, setCache] = useState(undefined);
  const underRange = 50;
  const delayTime = 100;

  const handleScroll = () => {
    if (!ref || isDone) return;
    const scrollHeight = ref.scrollHeight;
    const scrollTop = ref.scrollTop;
    const clientHeight = ref.clientHeight;
    const ret = Math.floor(scrollTop) + clientHeight;
    if (Math.abs(ret - scrollHeight) <= underRange) setIsSetting(true);
  };

  const throttle = (callback: Function, limit: number) => {
    let wait = false;
    if (!wait) {
      callback();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };

  const scrollEvent = () => {
    throttle(handleScroll, delayTime);
  };

  const registerEvent = () => {
    if (!ref) return;
    prev = 0;
    if (!isDone) ref.addEventListener("scroll", scrollEvent);
    return () => {
      ref.removeEventListener("scroll", scrollEvent);
    };
  };

  const getMoreData = () => {
    if (!isSetting) return;
    prev += getItem;
    fetchCallback(prev);
  };

  useEffect(() => registerEvent(), [ref, isDone]);
  useEffect(() => getMoreData(), [isSetting]);

  return [setIsSetting, setIsDone, cache, setCache] as const;
};

export default useInfiniteScroll;
