import { Video } from "@/types";
import { router } from "@inertiajs/react";
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Box,
  Grid,
  Group,
  NumberFormatter,
  Overlay,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconHeadphones,
  IconHeadphonesOff,
  IconPlayerPauseFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  video,
  onSetDuration,
}: {
  video: Video;
  onSetDuration?: (duration: number) => void;
}) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [lastSentProgress, setLastSentProgress] = useState(0);
  const [watched, setWatched] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const hasSeeked = useRef(false);

  const getTimeElapsed = (currentProgress: number, duration: number) => {
    const elapsed = (currentProgress / 100) * duration;
    const minutes = Math.floor(elapsed / 60);
    const seconds = Math.floor(elapsed % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getTimeRemaining = (currentProgress: number, duration: number) => {
    const remaining = duration - (currentProgress / 100) * duration;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSpeedChange = () => {
    if (speed === 1) {
      setSpeed(1.5);
    } else if (speed === 1.5) {
      setSpeed(2);
    } else {
      setSpeed(1);
    }
  };

  const handleProgress = async ({
    playedSeconds,
  }: {
    playedSeconds: number;
  }) => {
    const current = Math.floor(playedSeconds);

    if (current - lastSentProgress >= 10) {
      setLastSentProgress(current);

      router.patch(
        route("customer.videos.progress", video.id),
        { watched_time: current },
        {
          preserveState: true,
          preserveScroll: true,
          showProgress: false,
          onSuccess: () => {
            setCurrentProgress((current / duration) * 100);
          },
        }
      );
    }
  };

  const handleWatched = () => {
    router.post(
      route("customer.videos.watched", video.id),
      {
        watched_time: duration,
      },
      {
        preserveState: true,
        preserveScroll: true,
        showProgress: false,
      }
    );
  };

  useEffect(() => {
    if (!hasSeeked.current) {
      const timer = setTimeout(() => {
        playerRef.current?.seekTo(video.watched_time, "seconds");
        hasSeeked.current = true; // Marca que já fez o seek
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [video]);

  useEffect(() => {
    if (currentProgress >= 95 && !watched) {
      setIsPlaying(false);
      setCurrentProgress(100);
      setWatched(true);
      handleWatched();
    }
  }, [currentProgress]);

  return (
    <Box>
      <Box pos="relative">
        <AspectRatio
          ratio={16 / 9}
          style={(theme) => ({ borderRadius: theme.radius.md })}
        >
          <ReactPlayer
            ref={playerRef}
            url={video.url}
            width="100%"
            height="auto"
            controls={false}
            muted={muted}
            playing={isPlaying}
            playbackRate={speed}
            onProgress={(progress) => {
              setCurrentProgress((progress.playedSeconds / duration) * 100);
              handleProgress(progress);
            }}
            onDuration={(duration) => {
              setDuration(duration);
              onSetDuration && onSetDuration(duration);
              if (currentProgress >= 95) {
                handleWatched();
              }
            }}
            onPlay={() => {
              setIsPlaying(true);
            }}
            onPause={() => {
              setIsPlaying(false);
            }}
            onEnded={() => {
              setIsPlaying(false);
            }}
            config={{ file: { attributes: { preload: "metadata" } } }}
          />
        </AspectRatio>
        <Overlay backgroundOpacity={0} />
      </Box>
      <Stack w="100%" gap="xs" mt="xs">
        <Group justify="space-between" align="center">
          <Group>
            <ActionIcon
              variant="filled"
              size="lg"
              radius="xl"
              aria-label="Play/Pause"
              color="primary"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={watched}
            >
              {isPlaying ? (
                <IconPlayerPauseFilled
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              ) : (
                <IconPlayerPlayFilled
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
            <ActionIcon
              variant="filled"
              size="lg"
              radius="xl"
              aria-label="Mute/Unmute"
              color="primary"
              onClick={() => setMuted(!muted)}
            >
              {muted ? (
                <IconHeadphonesOff
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              ) : (
                <IconHeadphones
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
            <ActionIcon
              variant="filled"
              size="lg"
              radius="xl"
              aria-label="Speed Control"
              color="primary"
              onClick={handleSpeedChange}
            >
              {speed}x
            </ActionIcon>
            <Text fw="bold">
              {getTimeElapsed(currentProgress, duration)} /{" "}
              {getTimeRemaining(currentProgress, duration)}
            </Text>
          </Group>

          <Badge
            size="xl"
            variant="gradient"
            gradient={{ from: "orange", to: "yellow", deg: 219 }}
          >
            Você vai receber{" "}
            <NumberFormatter
              prefix="R$ "
              value={video.price}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </Badge>
        </Group>

        <Progress color="grape" size="lg" value={currentProgress} w="100%" />
      </Stack>
    </Box>
  );
}

export default VideoPlayer;
