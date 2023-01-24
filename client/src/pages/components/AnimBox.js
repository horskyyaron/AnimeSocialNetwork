export default function AnimeBox({ onClick, title, img_url }) {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <div class="anime_box" onClick={handleClick}>
      <h1>{title}</h1>
      <img src={img_url} alt="" />
    </div>
  );
}
