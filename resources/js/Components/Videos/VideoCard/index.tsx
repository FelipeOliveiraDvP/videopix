import { Video } from "@/types";
import { Link } from "@inertiajs/react";
import {
  AspectRatio,
  Badge,
  Card,
  NumberFormatter,
  Progress,
} from "@mantine/core";
import ReactPlayer from "react-player/youtube";

interface VideoCardProps {
  video: Video;
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component={Link}
      href={route("customer.videos.watch", video.id)}
      pos="relative"
    >
      <Card.Section>
        <Badge
          variant="gradient"
          gradient={{ from: "orange", to: "yellow", deg: 219 }}
          pos="absolute"
          style={{
            top: 10,
            right: 10,
          }}
        >
          <NumberFormatter
            prefix="R$ "
            value={video.price}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </Badge>
        <AspectRatio
          ratio={16 / 9}
          style={(theme) => ({ borderRadius: theme.radius.md })}
        >
          <ReactPlayer
            url={video.url}
            controls={false}
            width="100%"
            height="auto"
            light={true}
          />
        </AspectRatio>
        {video.pivot && (
          <Progress
            value={(video.pivot.watched_time / video.duration) * 100}
            color="grape"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
            }}
          />
        )}
      </Card.Section>
    </Card>
  );
}

export default VideoCard;
