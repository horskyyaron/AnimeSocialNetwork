export default function FavAnime({ title, img_url }) {
  return (
    <div className="fav_anime">
      <h3>{title}</h3>
      <img src={img_url} alt="" />
    </div>
  );
}
