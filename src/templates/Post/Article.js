import React from "react";
import { getRichText } from "utils";
import cx from "classnames";
import {
  nodeTypes as NODE_TYPES,
  markTypes as MARK_TYPES,
} from "../../constants/richTextMap";

import styles from "./Post.module.scss";

function Article({ data, className }) {
  if (!data) return null;

  const textData = getRichText(data);

  const renderText = text => {
    if (!Array.isArray(text)) return null;

    return text.map(t => {
      if (Array.isArray(t)) return "Array";
      else if (t.nodeType) {
        switch (NODE_TYPES[t.nodeType]) {
          case "paragraph":
            return renderParagraph(t);
          case "hr":
            return <hr />;
          case "unorderedList":
            return "list";
          default:
            return null;
        }
        return t.nodeType;
      }
    });
  };

  const renderParagraph = p => {
    const content = p.content || [];

    if (content.length) {
      return (
        <p className={styles["article__paragraph"]}>
          {content.map(item => {
            const marks = (item.marks || []).reduce((marksMap, { type }) => {
              marksMap[MARK_TYPES[type]] = true;
              return marksMap;
            }, {});

            const cn = cx(styles["article__paragraph-item"], {
              [styles["article__paragraph-item--bold"]]: Boolean(marks["bold"]),
              [styles["article__paragraph-item--underline"]]: Boolean(
                marks["underline"]
              ),
              [styles["article__paragraph-item--italic"]]: Boolean(
                marks["italic"]
              ),
            });

            return <span className={cn}>{item.value}</span>;
          })}
        </p>
      );
    }

    return null;
  };

  return <div className={className}>{renderText(textData)}</div>;
}

export default Article;
