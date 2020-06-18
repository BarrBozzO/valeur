import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import cx from "classnames";
import Img from "gatsby-image";
import get from "lodash/get";
import { truncateText } from "utils";

import Video from "components/Video";
import Button from "components/Button";
import SEO from "components/Seo";
import Layout from "components/Layout";
import Link from "components/Link";
import { useWindowSize } from "../hooks";

import ChevronIcon from "assets/icons/chevron.svg";
import SectionBorder from "assets/icons/section-border.svg";
import ChatIcon from "assets/icons/chat.svg";
import LikeIcon from "assets/icons/heart.svg";
import Logo from "assets/logo/valeur.svg";
import vFile from "assets/videos/bg-video.mp4";

import reviews from "../constants/testimonials";

import styles from "./Home.module.scss";

const ScrollElement = () => (
  <div className={styles["scroll-down"]}>
    <div className={styles["scroll-down__mousey"]}>
      <div className={styles["scroll-down__scroller"]}></div>
    </div>
  </div>
);

const IndexPage = ({ data, location, mount }) => {
  const wSize = useWindowSize();
  const cardsCount = wSize.width > 1024 ? 3 : 1;
  const tabletWidth = wSize.width <= 768;
  const desktopWidth = wSize.width <= 1024;

  const [activeItemIndex, setActiveItemIndex] = useState(!desktopWidth ? 1 : 0);

  const handleSlideBtnClick = index => {
    return () => setActiveItemIndex(index);
  };

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

  const instagramPosts = get(data, "allInstagramPost.edges", []);

  return (
    <Layout mount={mount} location={location}>
      <SEO title="Главная" />
      <div className={styles["home"]}>
        <section className={styles["home__start"]}>
          <Video className={styles["home__background-video"]} source={vFile} />
          <Logo className={styles["home__start-logo"]} />
          <h1>Valeur — свадебная полиграфия</h1>
          <div>
            Мы уже придумали ваши идеальные пригласительные
            {/* <Button label="Заказать" /> */}
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
          <h2>О проекте</h2>
          <div className={styles["home__about-content"]}>
            <div className={styles["home__about-photo-container"]}>
              <Img
                className={styles["home__about-photo"]}
                fluid={authorImg.fluid}
                imgStyle={{ objectFit: "contain" }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className={styles["home__about-description"]}>
              <div className={styles["home__about-intro"]}>
                <p>Привeт, меня зовут Даша и я создатель студии «VALEUR».</p>
                <p>
                  Наша студия – это команда профессионалов. Уже более 2-х лет
                  воплощаем ваши идеи в реальность.
                  <br />
                  Мы берем на себя полный цикл разработки свадебной полиграфии.
                  У каждой пары своя индивидуальная история любви – именно это
                  воодушевляет нашу команду и помогает создавать уникальные
                  работы.
                </p>
              </div>
              <div className={styles["home__about-services"]}>
                <p>Наши услуги:</p>
                <ul className={styles["home__about-services-list"]}>
                  <li>Комплект «Save the Date» для вас и вашей фотосессии</li>
                  <li>Пригласительные для ваших гостей</li>
                  <li>Карточки меню</li>
                  <li>Карточки дресс - кода</li>
                  <li>Карточки номерков на стол</li>
                  <li>Карточки рассадки</li>
                  <li>Холст с рассадкой гостей при входе</li>
                  <li>Конверты ручной работы</li>
                  <li>Остальные комплектующие по запросу</li>
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
                <div className={styles["features__item-title"]}>
                  Индивидуальный подход
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
              <div className={styles["features__item-image-container"]}>
                <Img
                  className={styles["features__item-image"]}
                  fluid={qualityFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-title"]}>Качество</div>
                <div className={styles["features__item-description"]}>
                  Мы используем только качественные материалы люкс – сегмента.
                  <br />
                  При этом стоимость комплекта начинается от 200 рублей.
                </div>
              </div>
            </div>
            <div className={styles["features__item"]}>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-title"]}>
                  Ручная работа
                </div>
                <div className={styles["features__item-description"]}>
                  Каждый наш комплект изготавливается вручную.
                </div>
              </div>
              <div className={styles["features__item-image-container"]}>
                <Img
                  className={styles["features__item-image"]}
                  fluid={handmadeFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={styles["features__item"]}>
              <div className={styles["features__item-image-container"]}>
                <Img
                  className={styles["features__item-image"]}
                  fluid={blogFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-title"]}>
                  Присоединяйтесь к нам
                </div>
                <div className={styles["features__item-description"]}>
                  В нашем Блоге мы делимся идеями, рассказываем о процессе
                  создания проектов, поиске вдохновления и многом другом.
                  <br />
                  <Link className={styles["features__item-link"]} to="/posts">
                    Читать
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["home__reviews"]}>
          <h2>Что думают наши клиенты</h2>
          <div className={styles["reviews"]}>
            <ItemsCarousel
              activePosition="center"
              infiniteLoop={false}
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={cardsCount}
              gutter={desktopWidth ? 16 : 32}
              leftChevron={
                !desktopWidth ? (
                  <button
                    className={cx(
                      styles["reviews__button"],
                      styles["reviews__button--left"]
                    )}
                  >
                    <ChevronIcon />
                  </button>
                ) : null
              }
              rightChevron={
                !desktopWidth ? (
                  <button
                    className={cx(
                      styles["reviews__button"],
                      styles["reviews__button--right"]
                    )}
                  >
                    <ChevronIcon />
                  </button>
                ) : null
              }
              outsideChevron={!desktopWidth}
              chevronWidth={!desktopWidth ? 60 : 0}
              disableSwipe={false}
              showSlither={desktopWidth}
              firstAndLastGutter={desktopWidth}
            >
              {reviews.map(r => (
                <div className={styles["reviews__card-wrapper"]}>
                  <blockquote
                    key={r.author}
                    className={styles["reviews__card"]}
                  >
                    <cite className={styles["reviews__card-author"]}>
                      <img
                        className={styles["reviews__card-avatar"]}
                        src={r.image}
                      />
                      <a href={r.link} className={styles["reviews__card-link"]}>
                        <span className={styles["reviews__card-name"]}>
                          {r.author}
                        </span>
                        <span className={styles["reviews__card-nickname"]}>
                          @{r.nickname}
                        </span>
                      </a>
                    </cite>
                    <p className={styles["reviews__card-text"]}>{r.text}</p>
                  </blockquote>
                </div>
              ))}
            </ItemsCarousel>
            <div className={styles["reviews__pagination"]}>
              {reviews.map((r, index) => {
                const prev = activeItemIndex - 1;
                const next = activeItemIndex + 1;
                const isStart = index === 0;
                const isFinish = index === reviews.length - 1;

                if (!desktopWidth && (isStart || isFinish)) {
                  return null;
                }

                return (
                  <button
                    key={index}
                    className={cx(styles["reviews__to-slide"], {
                      [styles["reviews__to-slide--active"]]:
                        index === activeItemIndex,
                      [styles["reviews__to-slide--adjacent"]]:
                        index === next || index === prev,
                    })}
                    onClick={handleSlideBtnClick(index)}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section className={styles["home__order"]}>
          <h2>
            Вы готовы начать?
            <small className={styles["home__order-subheader"]}>
              {`Давайте обсудим ваш будущий проект.
              Вместе мы сможем создать нечто потрясающее!`}
            </small>
          </h2>
          <Button className={styles["home__order-button"]} label="Начать" />
        </section>
        <section className={styles["home__instagram"]}>
          <h2>
            Мы в Instagram
            <small className={styles["home__instagram-subheader"]}>
              Следите за обновлениями на @v_aleur
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
                  timestamp,
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
                        <div className={styles["instagram__grid-item-caption"]}>
                          {truncateText(caption)}
                        </div>
                        <div className={styles["instagram__grid-item-icons"]}>
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
              ...GatsbyImageSharpFluid_tracedSVG
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
                ...GatsbyImageSharpFluid_tracedSVG
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
  }
`;
