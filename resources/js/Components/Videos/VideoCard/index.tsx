import { Video } from "@/types";
import { Link } from "@inertiajs/react";
import { AspectRatio, Badge, Card, NumberFormatter } from "@mantine/core";
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
          color="yellow.5"
          variant="filled"
          pos="absolute"
          c="black"
          style={{
            top: 10,
            right: 10,
          }}
        >
          <NumberFormatter
            prefix="R$ "
            value={0.25}
            thousandSeparator="."
            decimalSeparator=","
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
      </Card.Section>
    </Card>
  );
}

export default VideoCard;
