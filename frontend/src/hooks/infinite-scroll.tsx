/*import { useState, useEffect } from "react";

let prev = 0;
const getItem = 4;

const useInfiniteScroll = (
  fetchCallback: Function,
  ref: HTMLDivElement | null
) => {
  const [isSetting, setIsSetting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cache, setCache] = useState(undefined);

  const handleScroll = () => {
    if (!ref || isDone) return;
    console.log("hihi");
    const scrollHeight = ref.scrollHeight;
    const scrollTop = ref.scrollTop;
    const clientHeight = ref.clientHeight;

    const ret = Math.floor(scrollTop) + clientHeight;
    console.log(ret, scrollHeight);
    if (Math.abs(ret - scrollHeight) <= 50) {
      setIsSetting(true);
    }
  };

  const throttle = (callback: Function, limit: number) => {
    let wait = false;
    return function () {
      if (!wait) {
        callback.call(0);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  };

  useEffect(() => {
    if (!ref) return;
    if (!isDone) ref.addEventListener("scroll", throttle(handleScroll, 100));
    return () => ref.removeEventListener("scroll", throttle(handleScroll, 100));
  }, [ref, isDone]);

  useEffect(() => {
    if (!isSetting) return;
    prev += getItem;
    fetchCallback(prev);
  }, [isSetting]);

  return [setIsSetting, setIsDone, cache, setCache] as const;
};

export default useInfiniteScroll;
*/

import { useState, useEffect } from "react";

let prev = 0;
const getItem = 4;

const useInfiniteScroll = (
  fetchCallback: Function,
  ref: HTMLDivElement | null
) => {
  const [isSetting, setIsSetting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cache, setCache] = useState(undefined);

  const handleScroll = () => {
    if (!ref || isDone) return;
    console.log("asdflaksd");
    const scrollHeight = ref.scrollHeight;
    const scrollTop = ref.scrollTop;
    const clientHeight = ref.clientHeight;

    const ret = Math.floor(scrollTop) + clientHeight;
    if (Math.abs(ret - scrollHeight) <= 50) {
      setIsSetting(true);
    }
  };

  const throttle = (callback: Function, limit: number) => {
    let wait = false;
    return function () {
      if (!wait) {
        callback.call(0);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  };

  useEffect(() => {
    if (!ref) return;
    if (!isDone) {
      console.log("heyhey");
      ref.addEventListener("scroll", throttle(handleScroll, 100));
    }
    ref.removeEventListener("scroll", throttle(handleScroll, 100));
  }, [ref, isDone]);

  useEffect(() => {
    if (!isSetting) return;
    prev += getItem;
    fetchCallback(prev);
  }, [isSetting]);

  return [setIsSetting, setIsDone, cache, setCache] as const;
};

export default useInfiniteScroll;
