import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWatchById } from "../../../../middlewares/watchListSlice";
import { useDispatch } from "react-redux";
import "./index.css";
import { Contact } from "../../../../layouts/contact";
import { AddToCardButton } from "../../../button/addToCard-button";
import { Rate } from "antd";
import Footer from "../../../../layouts/footer";
interface Watch {
  id: number;
  brand: string;
  model_name: string;
  price: number;
  movement_type: string;
  case_material: string;
  case_diameter: number;
  water_resistance: number;
  strap_material: string;
  dial_color: string;
  date_added: string;
  stock_quantity: number;
  is_available: boolean;
  sale: number;
  description: string;
  image: string;
}

export const WatchItem = () => {
  const [watchItem, setWatchItem] = useState<Watch | null>(null);
  const dispatch = useDispatch();
  const param = useParams<{ watchId: string }>();
  const watchId = param.watchId;

  async function getWatchDetail(watchId: any) {
    try {
      const response = await dispatch(getWatchById(watchId)).unwrap();
      setWatchItem(response);
    } catch (error) {
      alert(error);
    }
  }
  console.log();

  useEffect(() => {
    getWatchDetail(watchId);
  }, [dispatch,watchId]);

  
  return (
    <>
      {watchItem && (
        <>
          {" "}
          <h3 className="watch__model-name">
            {" "}
            {watchItem.brand} ---- {watchItem.model_name}
          </h3>
          <div className="line"></div>
          <div id="watch-detail">
            <div className="left-detail">
              <img src={watchItem.image} alt="" />
            </div>
            <div className="middle-detail">
              <div className="middle-detail__infor">
                <h3 className="middle-detail__infor-heading">THÔNG SỐ</h3>
                {/* Display other details as needed */}
                <ul>
                  <li>Hãng : {watchItem.brand}</li>
                  <li>Loại : {watchItem.movement_type}</li>
                  <li>Chỉ số kháng nước : {watchItem.water_resistance}</li>
                  <li>Đường kính: {watchItem.case_diameter}mm</li>
                  <li>Chất liệu : {watchItem.case_material}</li>
                  <li>Chất liệu giây đeo :{watchItem.strap_material}</li>
                  <li>
                    Màu sắc: {watchItem.dial_color}
                    <p
                      className={`watch__detail-color__` + watchItem.dial_color}
                    ></p>
                  </li>
                  <li>Số lượng còn lại: {watchItem.stock_quantity} chiếc</li>
                </ul>
              </div>
              <div className="middle-detail__add-cart">
                {watchItem.is_available ? (
                  <AddToCardButton product={watchItem} />
                ) : (
                  <div className="w-full rounded-[15px] border-solid my-[1rem] bg-[#ff2e2e] flex justify-center align-center hover:scale-[1.075] transition ease-in-out">
                    <div className="py-[0.5rem] my-[0.25rem]">
                      {" "}
                      <h3 className="py-[0.25rem] text-white">
                        Sản phẩm đã ngừng bán{" "}
                      </h3>
                    </div>
                  </div>
                )}
              </div>

              {/* Add other details as needed */}
            </div>
            <div className="detail-right">
              <div className="detail-right__address">
                {" "}
                <h3 className="detail-right__address__heading">
                  ĐỊA CHỈ CỬA HÀNG
                </h3>
                <ul>
                  <li>Hà Nội</li>
                  <li>Hồ Chí Minh</li>
                  <li>Đà Nẵng</li>
                  <li>Cần Thơ</li>
                  <li>Hà Nội</li>
                </ul>
              </div>
              <div className="detail-right__freeship">
                {" "}
                <h3 className="detail-right__freeship__heading">
                  MIỄN PHÍ GIAO HÀNG
                </h3>
                <ul>
                  <li>Giao hàng toàn quốc</li>
                  <li>Nhận hàng và thanh toán tại nhà ( ship COD )</li>
                </ul>
              </div>
              <div className="detail-right__freeship">
                {" "}
                <h3 className="detail-right__freeship__heading">
                  YÊN TÂM MUA HÀNG
                </h3>
                <ul>
                  <li>Uy tín</li>
                  <li>Sản phẩm chính hãng 100%</li>
                </ul>
              </div>
              <div className="detail-right__rate">
                {" "}
                <h3>
                  Đánh giá : {watchItem.rate}{" "}
                  <Rate
                    value={watchItem.rate}
                    style={{ marginLeft: "1rem", fontSize: "15px" }}
                    disable
                  />
                </h3>
              </div>
            </div>
          </div>
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
};
