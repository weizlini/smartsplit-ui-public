const SoundCloud = () => {
  return (
    <div className="soundcloud-embed">
      <iframe
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/150668567%3Fsecret_token%3Ds-bWsqA&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      ></iframe>
      <div
        style={{
          fontSize: "10px",
          color: "#cccccc",
          lineBreak: "anywhere",
          wordBreak: "normal",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontFamily:
            "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
          fontWeight: "100",
        }}
      >
        <a
          href="https://soundcloud.com/will-eizlini"
          title="Will Eizlini"
          target="_blank"
          style={{ color: "#cccccc", textDecoration: "none" }}
        >
          Will Eizlini
        </a>{" "}
        ·{" "}
        <a
          href="https://soundcloud.com/will-eizlini/sets/sirius-b/s-bWsqA"
          title="Sirius-b"
          target="_blank"
          style={{ color: "#cccccc", textDecoration: "none" }}
        >
          Sirius-b
        </a>
      </div>
    </div>
  );
};
export default SoundCloud;
