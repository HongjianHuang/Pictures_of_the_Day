import classNames from "classnames";

function Pictures(props) {
  const { picture } = props;
  return (
    <div className={classNames("imageContainer", props.width, props.height)}>
      <div className="imageItem">
        <div className="image">
          <img
            onClick={props.clickFunction}
            src={picture.urls.regular}
            alt={picture.alt_description}
          />
        </div>
      </div>
    </div>
  );
}

export default Pictures;
