import '/home/vus/diplom/diplom/src/styles/Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery">
      <img
        src="/static/images/primary_screenshot.png"
        alt="Демонстрация работы сайта"
        width={300}
        height={200}
      />
      <img
        src="/static/images/secondary_screenshot.png"
        alt="Демонстрация работы сайта"
        width={300}
        height={200}
      />
    </div>
  );
};

export default Gallery;
