import React, { useState } from "react";
import cx from "classnames";
import Img from "gatsby-image";
import get from "lodash/get";
import { truncateText } from "utils";

import Video from "components/Video";
import Button from "components/Button";
import SEO from "components/Seo";
import Layout from "components/Layout";
import Link from "components/Link";
import Order from "components/Order";
import Carousel from "components/Carousel";
import { useWindowSize } from "../hooks";

import SectionBorder from "assets/icons/section-border.svg";
import ChatIcon from "assets/icons/chat.svg";
import LikeIcon from "assets/icons/heart.svg";
import Logo from "assets/logo/valeur.svg";
import Polygraphy from "assets/logo/polygraphy.svg";
import vFile from "assets/videos/bg-video.mp4";
import LongArrow from "assets/icons/long-arrow.svg";
import Leaf from "assets/icons/leaf.svg";
import InstagramIcon from "assets/icons/instagram.svg";
// import paperBG from "assets/background/paper.jpg";

import reviews from "../constants/testimonials";

import styles from "./Home.module.scss";

const MAX_WIDTH = 1024;

const ScrollElement = () => (
  <div className={styles["scroll-down"]}>
    <div className={styles["scroll-down__mousey"]}>
      <div className={styles["scroll-down__scroller"]}></div>
    </div>
  </div>
);

const IndexPage = ({ data, location, mount }) => {
  const [displayOrder, setDisplayOrder] = useState(false);
  const wSize = useWindowSize();

  const {
    images: { edges: imagesArr },
  } = data;
  const individualStyleImg = imagesArr.find(({ node }) => {
    return node.base === "1.jpg";
  }).node.childImageSharp;
  const qualityFeatureImg = imagesArr.find(({ node }) => {
    return node.base === "2.jpg";
  }).node.childImageSharp;
  const handmadeFeatureImg = imagesArr.find(({ node }) => {
    return node.base === "3.jpg";
  }).node.childImageSharp;
  const blogFeatureImg = imagesArr.find(({ node }) => {
    return node.base === "4.jpg";
  }).node.childImageSharp;
  const authorImg = imagesArr.find(({ node }) => {
    return node.base === "author.jpg";
  }).node.childImageSharp;
  const startImg = imagesArr.find(({ node }) => {
    return node.base === "start.jpg";
  }).node.childImageSharp;

  const instagramPosts = get(data, "allInstagramPost.edges", []);
  const testimonialImages = get(data, "testimonialImages.edges", []);
  const latestPosts = get(data, "posts.nodes", []);

  const handleDisplayOrder = () => {
    return setDisplayOrder(!displayOrder);
  };

  return (
    <Layout mount={mount} location={location}>
      <SEO title="Главная" />
      <div className={styles["home"]}>
        {displayOrder && <Order onClose={() => setDisplayOrder(false)} />}
        <section className={styles["home__start"]}>
          <Img
            className={styles["home__start-placeholder"]}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            fluid={startImg.fluid}
            imgStyle={{ objectFit: "cover" }}
          />
          <Video className={styles["home__background-video"]} source={vFile} />
          <div className={styles["home__start-content"]}>
            <h1>Valeur — свадебная полиграфия</h1>
            <Logo className={styles["home__start-logo"]} />
            <Polygraphy className={styles["home__start-polygraphy"]} />
            <p className={styles["home__start-text"]}>
              Мы уже придумали ваши идеальные пригласительные
            </p>
            {/* <div className={styles["home__start-link"]}>
              <Button link>Как заказать?</Button>
              <Link to={"/portfolio/invitation-kits"}>Посмотреть работы</Link>
            </div> */}
          </div>
          <div className={styles["home__start-instagram"]}>
            <a href="https://www.instagram.com/v_aleur/" target="_blank">
              <InstagramIcon /> <span>Мы в Instagram</span>
            </a>
          </div>
          <ScrollElement />
        </section>
        <div
          className={cx(
            styles["home__section-divider"],
            styles["home__section-divider--start"]
          )}
        >
          <SectionBorder />
          <SectionBorder />
        </div>
        <section className={styles["home__about"]}>
          <div className={styles["home__about-content"]}>
            <div className={styles["home__about-photo-container"]}>
              <Img
                className={styles["home__about-photo"]}
                fluid={authorImg.fluid}
                imgStyle={{ objectFit: "cover" }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className={styles["home__about-description"]}>
              <div className={styles["home__about-intro"]}>
                <div className={styles["home__about-intro-title"]}>
                  Привeт, меня зовут Дарья и я создатель студии{" "}
                  <span className={styles["home__about-intro-title-highlight"]}>
                    «VALEUR»
                  </span>
                </div>
                <p>
                  {`Наша студия – это команда профессионалов.
                  
                  Уже более 2-х лет воплощаем ваши идеи в реальность.
                  Мы берем на себя полный цикл разработки свадебной полиграфии.
                  У каждой пары своя индивидуальная история любви – именно это
                  воодушевляет нашу команду и помогает создавать уникальные
                  работы.
                  `}
                </p>
              </div>
              <div className={styles["home__about-services"]}>
                <p>Наши услуги:</p>
                <ul className={styles["home__about-services-list"]}>
                  {[
                    "Комплект «Save the Date» для вас и вашей фотосессии",
                    "Пригласительные для ваших гостей",
                    "Карточки меню",
                    "Карточки дресс - кода",
                    "Карточки номерков на стол",
                    "Карточки рассадки",
                    "Холст с рассадкой гостей при входе",
                    "Конверты ручной работы",
                    "Остальные комплектующие по запросу",
                  ].map(service => (
                    <li>
                      <Leaf width={18} height={18} /> {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["home__features"]}>
          <h2>Почему стоит выбрать именно нас</h2>
          <div className={styles["features"]}>
            <div className={styles["features__item"]}>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-number"]}>01</div>
                <div className={styles["features__item-title"]}>
                  Только{" "}
                  <span className={styles["features__item-title-highlight"]}>
                    индивидуальный
                  </span>{" "}
                  подход
                </div>
                <div className={styles["features__item-description"]}>
                  <p>
                    Каждая история любви – индивидуальна.
                    <br />
                    При создании дизайна мы учитываем ваши пожелания и опыт
                    наших специалистов.
                  </p>
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/invitation-kits"
                  >
                    Комплекты пригласительных
                  </Link>
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/savethedate-kits"
                  >
                    Save the date
                  </Link>
                </div>
              </div>
              <div className={styles["features__item-image-container"]}>
                <Img
                  className={styles["features__item-image"]}
                  fluid={individualStyleImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={styles["features__item"]}>
              <div
                className={cx(
                  styles["features__item-image-container"],
                  styles["features__item-image-container--left"]
                )}
              >
                <Img
                  className={styles["features__item-image"]}
                  fluid={qualityFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-number"]}>02</div>
                <div className={styles["features__item-title"]}>
                  Самое{" "}
                  <span className={styles["features__item-title-highlight"]}>
                    высокое
                  </span>{" "}
                  качество
                </div>
                <div className={styles["features__item-description"]}>
                  <p>
                    Мы используем только качественные материалы люкс – сегмента.
                    <br />
                    При этом стоимость комплекта начинается от 200 рублей.
                  </p>
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/invitation-kits"
                  >
                    Комплекты пригласительных
                  </Link>
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/savethedate-kits"
                  >
                    Save the date
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles["features__item"]}>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-title"]}>
                  <span className={styles["features__item-title-highlight"]}>
                    Ручная
                  </span>{" "}
                  работа
                </div>
                <div className={styles["features__item-number"]}>03</div>
                <div className={styles["features__item-description"]}>
                  <p>Каждый наш комплект изготавливается вручную.</p>
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/invitation-kits"
                  >
                    Комплекты пригласительных
                  </Link>
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/savethedate-kits"
                  >
                    Save the date
                  </Link>
                </div>
              </div>
              <div
                className={cx(
                  styles["features__item-image-container"],
                  styles["features__item--wc-leaves"]
                )}
              >
                <Img
                  className={styles["features__item-image"]}
                  fluid={handmadeFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles["home__reviews"]}>
          <div className={styles["home__reviews-container"]}>
            <h2>
              Что думают <span>наши клиенты</span>
            </h2>
            <div className={styles["reviews"]}>
              <Carousel
                containerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                slideStyle={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
                className={styles["reviews__carousel"]}
                controlsPosition={"out"}
                customControl={() => (
                  <LongArrow className={styles["reviews__carousel-control"]} />
                )}
                animationConfig={{
                  duration: "0.6s",
                  easeFunction: "ease-in-out",
                  delay: "0s",
                }}
              >
                {reviews.map(r => (
                  <div className={styles["reviews__card-wrapper"]}>
                    <blockquote
                      key={r.author}
                      className={styles["reviews__card"]}
                    >
                      <div className={styles["reviews__card-avatar"]}>
                        <Img
                          style={{ width: "100%", height: "100%" }}
                          imgStyle={{
                            objectFit: "cover",
                            objectPosition: "top center",
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                          fluid={
                            testimonialImages.find(
                              ({ node }) => node.base === `${r.image}.jpg`
                            ).node.childImageSharp.fluid
                          }
                          loading={"eager"}
                        />
                      </div>
                      <p className={styles["reviews__card-text"]}>{r.text}</p>
                      <cite className={styles["reviews__card-author"]}>
                        <span className={styles["reviews__card-name"]}>
                          {r.author}
                        </span>
                        <span className={styles["reviews__card-date"]}>
                          {r.date}
                        </span>
                      </cite>
                    </blockquote>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
        <section className={styles["home__posts"]}>
          <h2>
            Присоединяйтесь к нам
            <small>
              В нашем Блоге мы делимся идеями, рассказываем о процессе создания
              проектов,
              <br /> поиске вдохновления и многом другом.
            </small>
          </h2>
          <div className={styles["posts"]}>
            {latestPosts.map(
              ({ id, slug, title, image, createdAt, description }) => {
                let postImage = null;
                if (image) {
                  const cover = Array.isArray(image) ? image[0] : image;
                  if (cover.fluid) {
                    const {
                      details: {
                        image: { width },
                      },
                    } = cover.file;

                    postImage = (
                      <div className={styles["posts__item-cover"]}>
                        <Img
                          style={{
                            maxWidth: width <= MAX_WIDTH ? width : MAX_WIDTH,
                          }}
                          fluid={cover.fluid}
                          className={styles["posts__item-cover-image"]}
                        />
                      </div>
                    );
                  }
                }

                return (
                  <div className={styles["posts__item"]}>
                    <Link to={`/posts/${slug}`}>
                      {postImage}

                      <h3 className={styles["posts__item-title"]}>{title}</h3>

                      <div className={styles["posts__item-created"]}>
                        {createdAt}
                      </div>
                      <div className={styles["posts__item-description"]}>
                        {description &&
                          description.internal &&
                          description.internal.content}
                      </div>
                    </Link>
                  </div>
                );
              }
            )}
          </div>
          <div className={styles["posts__read-more"]}>
            <Link className={styles["features__item-link"]} to="/posts">
              Читать больше
            </Link>
          </div>
        </section>
        <section className={styles["home__order"]}>
          <div className={styles["home__order-container"]}>
            <h2>
              Вы готовы начать?
              <small className={styles["home__order-subheader"]}>
                {`Давайте обсудим ваш будущий проект.
              Вместе мы сможем создать нечто потрясающее!`}
              </small>
            </h2>
            <Button
              className={styles["home__order-button"]}
              onClick={handleDisplayOrder}
              label="Начать"
            />
          </div>
          <div
            className={cx(
              styles["home__order-image"],
              styles["home__order-image--l"]
            )}
          >
            <div />
          </div>
          <div
            className={cx(
              styles["home__order-image"],
              styles["home__order-image--r"]
            )}
          >
            <div />
          </div>
        </section>
        <section className={styles["home__instagram"]}>
          <h2>
            Мы в Instagram
            <small className={styles["home__instagram-subheader"]}>
              Следите за обновлениями на <mark>@v_aleur</mark>
            </small>
          </h2>
          <div className={styles["instagram"]}>
            <div className={styles["instagram__grid"]}>
              {instagramPosts.map(({ node }) => {
                const {
                  id,
                  caption,
                  likes,
                  comments,
                  localFile: { childImageSharp: image },
                } = node;

                return (
                  <div className={styles["instagram__grid-item"]}>
                    <a href={`https://instagram.com/p/${id}`} target="_blank">
                      <Img
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                        }}
                        className={styles["instagram__grid-item-image"]}
                        fluid={image.fluid}
                        imgStyle={{ objectFit: "cover" }}
                      />
                      <div className={styles["instagram__grid-item-hover"]}>
                        {false && (
                          <React.Fragment>
                            <div
                              className={styles["instagram__grid-item-caption"]}
                            >
                              {truncateText(caption)}
                            </div>
                            <div
                              className={styles["instagram__grid-item-icons"]}
                            >
                              {!!likes && (
                                <div>
                                  <LikeIcon />
                                  {likes}
                                </div>
                              )}
                              {!!comments && (
                                <div>
                                  <ChatIcon />
                                  {comments}
                                </div>
                              )}
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    images: allFile {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxWidth: 1024, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    testimonialImages: allFile(
      filter: { relativePath: { regex: "/testimonials/.*/" } }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxWidth: 1024, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allInstagramPost {
      edges {
        node {
          id
          likes
          comments
          mediaType
          preview
          original
          timestamp
          caption
          localFile {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          thumbnails {
            src
            config_width
            config_height
          }
          dimensions {
            height
            width
          }
        }
      }
    }
    posts: allContentfulPost(
      limit: 3
      sort: { order: DESC, fields: createdAt }
    ) {
      nodes {
        id
        slug
        title
        description {
          internal {
            content
          }
        }
        createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
        image {
          fluid(maxWidth: 1024, quality: 100) {
            ...GatsbyContentfulFluid
          }
          file {
            details {
              image {
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
