function Pictures(props) {
  const { picture } = props;
  return (
    <section>
      <div className="photo-container">
        <img
          onClick={props.clickFunction}
          src={picture.urls.regular}
          alt={picture.alt_description}
        />
      </div>
    </section>
  );
}

export default Pictures;
