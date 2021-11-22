import { Howl } from "howler";

let howler_complete = new Howl({
  src: ["/audios/complete-sound.mp3"],
  volume: 1,
  sprite: {
    complete: [0, 3500],
  },
});

const puzzleCompleteAudio = () => {
  howler_complete.play("complete");
};

export { puzzleCompleteAudio };
