import {
  ActionIcon,
  Anchor,
  AspectRatio,
  Badge,
  Group,
  Text,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { IconEye, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import { router } from "@inertiajs/react";
import { moneyFormat } from "@/Utils/moneyFormat";
import ReactPlayer from "react-player";
import { Video } from "@/types";

function VideoList({ videos }: { videos: Video[] }) {
  const confirmRemove = (video: { id: number }) =>
    modals.openConfirmModal({
      title: <Text fw="bold">Deseja realmente excluir este video?</Text>,
      children: (
        <Text size="sm">
          Esta ação não pode ser desfeita. Você tem certeza de que deseja
          continuar?
        </Text>
      ),
      labels: { confirm: "Excluir Video", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      cancelProps: { color: "gray", variant: "subtle" },
      onConfirm: () => router.delete(route("admin.videos.destroy", video.id)),
    });

  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      records={videos}
      columns={[
        {
          accessor: "url",
          title: "URL do video",
          width: 200,
          render: ({ url }) => (
            <Anchor
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AspectRatio
                ratio={16 / 9}
                style={(theme) => ({ borderRadius: theme.radius.md })}
              >
                <ReactPlayer
                  url={url}
                  controls={false}
                  width="100%"
                  height="auto"
                  light={true}
                />
              </AspectRatio>
            </Anchor>
          ),
        },
        {
          accessor: "duration",
          title: "Duração",
          render: ({ duration }) => {
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
          },
        },
        {
          accessor: "price",
          title: "Preço",
          render: ({ price }) => moneyFormat(price),
        },
        {
          accessor: "created_at",
          title: "Data do cadastro",
          render: ({ created_at }) =>
            dayjs(created_at).format("DD/MM/YYYY HH:mm"),
        },
        {
          accessor: "actions",
          title: "Ações",
          noWrap: true,
          textAlign: "center",
          render: (item) => (
            <Group gap="xs" justify="center">
              <ActionIcon
                variant="light"
                color="blue"
                size="lg"
                title="Editar video"
                onClick={() => router.get(route("admin.videos.edit", item.id))}
              >
                <IconEye size={16} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                color="red"
                size="lg"
                title="Excluir video"
                onClick={() => confirmRemove(item)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
    />
  );
}

export default VideoList;
