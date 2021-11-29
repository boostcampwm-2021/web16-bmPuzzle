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
    if (Math.abs(ret - scrollHeight) <= 2) {
      setIsSetting(true);
    }
  };

  useEffect(() => {
    if (!ref) return;
    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, [ref, isDone]);

  useEffect(() => {
    if (!isSetting) return;
    prev += getItem;
    fetchCallback(prev);
  }, [isSetting]);

  return [setIsSetting, setIsDone, cache, setCache] as const;
};

export default useInfiniteScroll;
