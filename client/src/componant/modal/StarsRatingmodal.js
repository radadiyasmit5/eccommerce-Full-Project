import { Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
export const StarsRatingmodal = ({ children }) => {
  const [visibility, setvisibility] = useState(false);

  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));
  const params = useParams();

  return (
    <>
      <div
        onClick={() => {
          if (user && user.name) {
            setvisibility(true);
          } else {
            history.push({
              pathname: "/login",
              state: `/product/${params.slug}`,
            });
          }
        }}
      >
        <StarOutlined className="text-danger" /> <br />
        {user && user.name ? "Rate this product" : "Login to Rate this product"}
      </div>

      <Modal
        title="Star rating"
        centered
        onOk={() => {
          setvisibility(false);
          toast.success("thank you for rating , this will be updated soon");
        }}
        visible={visibility}
        onCancel={() => setvisibility(false)}
      >
        {children}
      </Modal>
    </>
  );
};
