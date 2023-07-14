import React from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";

const Loading = (props) => {
  const { align, cover, backdrop } = props;
  return (
    <div
      className={`loading text-${align} cover-${cover} ${
        backdrop ? "loader-backdrop" : ""
      }`}
    >
      <Spin className={`loading text-${align} cover-${cover}`} size="large" />
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  cover: PropTypes.string,
};

Loading.defaultProps = {
  align: "center",
  cover: "inline",
};

export default Loading;
