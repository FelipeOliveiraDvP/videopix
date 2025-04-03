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
  IconPlayerPauseFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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

  return (
    <Box>
      <Box pos="relative">
        <AspectRatio
          ratio={16 / 9}
          style={(theme) => ({ borderRadius: theme.radius.md })}
        >
          <ReactPlayer
            url="https://www.youtube.com/embed/m-87WoxmfXE?autoplay=1&controls=0&mute=1"
            width="100%"
            height="auto"
            controls={false}
            playing={isPlaying}
            onProgress={(progress) => {
              setCurrentProgress((progress.playedSeconds / duration) * 100);
            }}
            onDuration={(duration) => {
              setDuration(duration);
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
              aria-label="Settings"
              color="primary"
              onClick={() => setIsPlaying(!isPlaying)}
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
              value={0.25}
              thousandSeparator="."
              decimalSeparator=","
            />
          </Badge>
        </Group>

        <Progress color="grape" size="lg" value={currentProgress} w="100%" />
      </Stack>
    </Box>
  );
}

export default VideoPlayer;
