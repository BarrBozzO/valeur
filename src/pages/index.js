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
import WaveBorder from "assets/icons/wave.svg";
import Wave2Border from "assets/icons/wave-2.svg";
import Logo from "assets/logo/valeur.svg";
import vFile from "assets/videos/bg-video.mp4";

import styles from "./Home.module.scss";

const reviews = [
  {
    author: "Ольга",
    link: "",
    text:
      "Виджеты Elfsight - просто супер! Четкая структура, понятное описание, легкие настройки. Мне нравятся все их продукты и качество работы поддержки",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-22.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "olga",
    social: "instagram",
  },
  {
    author: "Александр",
    link: "",
    text:
      "У Elfsight отличные виджеты и действительно оперативная и дружелюбная поддержка. Компетентно и надежно, я рекомендую Elfsight",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-8.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "alexandr",
    social: "instagram",
  },
  {
    author: "Евгения",
    link: "",
    text:
      "Классный плагин для отзывов на сайт с интуитивным интерфейсом. Очень легко добавить индивидуальные настройки и интеграция прошла мгновенно. Служба поддержки помогла во всех вопросах",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-24.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "evgeniy",
    social: "instagram",
  },
  {
    author: "Сергей",
    link: "",
    text:
      "У меня возникла проблема с их Instagram виджетом, но мне мгновенно помогли ее решить. Теперь хочу попробовать и другие виджеты этой команды",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-21.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "sergey",
    social: "instagram",
  },
  {
    author: "Анна",
    link: "",
    text:
      "Прекрасные виджеты за приемлемую цену. Просто использовать, можно настроить под свои потребности, а служба поддержки вежливая и всегда поможет. У меня только положительные впечатления!",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-20.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "anna",
    social: "instagram",
  },
];

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
  const onlilneInvitationFeatureImg = imagesArr.find(({ node }) => {
    return node.base === "macbook.png";
  }).node.childImageSharp;
  const blogFeatureImg = imagesArr.find(({ node }) => {
    return node.base === "safari-window.png";
  }).node.childImageSharp;
  const invitationKitsFeature = imagesArr.find(({ node }) => {
    return node.base === "kits.png";
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
            <p>
              There’s a voice that keeps on calling me. Down the road, that’s
              where I’ll always be. Every stop I make, I make a new friend.
              Can’t stay for long, just turn around and I’m gone again. Maybe
              tomorrow, I’ll want to settle down, Until tomorrow, I’ll just keep
              moving on.
            </p>
            <p>
              Knight Rider, a shadowy flight into the dangerous world of a man
              who does not exist. Michael Knight, a young loner on a crusade to
              champion the cause of the innocent, the helpless in a world of
              criminals who operate above the law.
            </p>
            <p>
              This is my boss, Jonathan Hart, a self-made millionaire, he’s
              quite a guy. This is Mrs H., she’s gorgeous, she’s one lady who
              knows how to take care of herself. By the way, my name is Max. I
              take care of both of them, which ain’t easy, ’cause when they met
              it was MURDER!
            </p>
            <Button label="Заказать" />
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
          <div className={styles["home__about-description"]}>
            Мы, студия «Weddings Inc.», занимается разработкой и изготовлением
            свадебной полиграфии. Профессионализм наших художников и дизайнеров
            поможет сделать вашу свадьбу незабываемой. Важной частью каждой
            свадьбы являются пригласительные – именно они сообщают гостям дату,
            время, место проведения торжества, стиль, предпочтительный стиль в
            одежде и множество других пожеланий. На нашем сайте вы можете
            заказать разработку индивидуального дизайна, который будет
            соответствовать стилистике вашего торжества. Помимо приглашений, у
            нас можно создать: посадочные карты гостей, свадебное меню, номера
            столов, конверты и планы рассадки гостей. Мы стремимся быть одними
            из лучших на рынке свадебной полиграфии и прикладываем для этого
            большие усилия.. Также, вы можете проверить наш instagram <br />
            Нам не терпится поработать с вами!
          </div>
        </section>
        <div className={cx(styles["home__wave"], styles["home__wave--top"])}>
          <WaveBorder />
        </div>
        <section className={styles["home__features"]}>
          <h2>Почему стоит выбрать именно нас</h2>
          <div className={styles["features"]}>
            <div className={styles["features__item"]}>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-title"]}>
                  Индивидуальные Пригласительные
                </div>
                <div className={styles["features__item-description"]}>
                  <p>
                    Valeur — это идеальный способ получить уникальные
                    пригласительные ручной работы. Для создания по-настоящему
                    потрясающих проектов, мы используем только люксовые
                    материалы и современные подходы.
                  </p>
                  <br />
                  Готовы ли вы начать работу с индивидуальным дизайном?
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
                  fluid={invitationKitsFeature.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={styles["features__item"]}>
              <div className={styles["features__item-image-container"]}>
                <Img
                  className={styles["features__item-image"]}
                  fluid={onlilneInvitationFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["features__item-text-container"]}>
                <div className={styles["features__item-title"]}>
                  Электронные пригласительные
                </div>
                <div className={styles["features__item-description"]}>
                  Отправляйте вашим гостям восхитительные электронные
                  пригласительные.
                  <br />
                  <Link
                    className={styles["features__item-link"]}
                    to="/portfolio/online-invitations"
                  >
                    Смотреть пригласительные
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles["features__item"]}>
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
              <div className={styles["features__item-image-container"]}>
                <Img
                  className={styles["features__item-image"]}
                  fluid={blogFeatureImg.fluid}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>
        <div className={cx(styles["home__wave"], styles["home__wave--bottom"])}>
          <Wave2Border />
        </div>
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
    images: allFile(filter: { relativePath: { regex: "/features/.*/" } }) {
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
