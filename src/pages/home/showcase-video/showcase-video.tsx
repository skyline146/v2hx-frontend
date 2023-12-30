import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface IShowcaseVideo {
  title: string;
  videoId: string;
}

export const ShowcaseVideo = ({ title, videoId }: IShowcaseVideo) => {
  const isMobile = useMediaQuery(`(max-width: 850px)`);
  return (
    <>
      <Title size={isMobile ? "h2" : "h1"} mt={10} mb={10}>
        {title}
      </Title>
      <iframe
        width="100%"
        height="520"
        src={`https://www.youtube.com/embed/${videoId}?showinfo=0&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};
