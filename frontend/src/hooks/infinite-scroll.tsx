import { useState, useEffect } from "react";
import { throttle } from "throttle-debounce";
let prev = 0;
const getItem = 10;

const useInfiniteScroll = (
  fetchCallback: Function,
  ref: HTMLDivElement | null
) => {
  const [isSetting, setIsSetting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cache, setCache] = useState(undefined);

  const handleScroll = () => {
    if (!ref || isDone) return;
    const scrollHeight = ref.scrollHeight;
    const scrollTop = ref.scrollTop;
    const clientHeight = ref.clientHeight;
    console.log("안녕");
    const ret = Math.floor(scrollTop) + clientHeight;
    if (Math.abs(ret - scrollHeight) <= 50) {
      setIsSetting(true);
    }
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

  useEffect(() => {
    if (!ref) return;
    prev = 0;
    const scrollEvent = () => {
      throttle(handleScroll, 100);
    };
    if (!isDone) ref.addEventListener("scroll", scrollEvent);
    return () => {
      ref.removeEventListener("scroll", scrollEvent);
    };
  }, [ref, isDone]);

  useEffect(() => {
    if (!isSetting) return;
    prev += getItem;
    fetchCallback(prev);
  }, [isSetting]);

  return [setIsSetting, setIsDone, cache, setCache] as const;
};

export default useInfiniteScroll;
