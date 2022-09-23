CREATE TABLE product (
  product_id varchar(30) NOT NULL,
  name varchar(30) NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL,
  image_src varchar(255) NOT NULL,
  PRIMARY KEY (product_Id)
);

CREATE TABLE review (
  review_id varchar(30) NOT NULL,
  product_id varchar(30) NOT NULL,
  stars smallint NOT NULL,
  review_count smallint NOT NULL,
  PRIMARY KEY (review_Id),
  UNIQUE KEY (product_Id)
);