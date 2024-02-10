import React, {useCallback, useMemo} from "react"
import {Card} from "antd"
import {currencyFormat} from "../../utils/utils"
const ProductCheckutCard = React.memo(
  ({product}) => {
    return (
      <>
        <h5 className="text font-weigth-bold text-center mb-3">
          Products Summary
        </h5>
        <h6 className="text text-center mb-3">
          {product && product?.length > 1 ? (
            <>{product?.length} Products</>
          ) : (
            <> {product?.length} Product</>
          )}
        </h6>
        {product &&
          product.length &&
          product.map((p) => (
            <Card
              className="w-75 ml-4 mt-2"
              cover={
                <>
                  <div style={{display: "flex"}}>
                    <img
                      src={p?.images[0].url}
                      style={{
                        height: "100px",
                        objectFit: "cover",
                      }}
                      className="w-25 ml-4 mt-4"
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                      className="mt-4"
                    >
                      <div>
                        <p className="text font-weight-bold">{p?.title}</p>
                        <p>{p?.description}</p>
                        <p>{p?.color}</p>
                      </div>
                      <div>
                        <p className="text font-weight-light">
                          {currencyFormat(p?.price)}
                        </p>
                        <p>Count : {p?.count}</p>
                        <p>Total : {currencyFormat(p?.price * p?.count)}</p>
                      </div>
                    </div>
                  </div>
                </>
              }
              key={p._id}
              hoverable
            ></Card>
          ))}
      </>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison logic
    return prevProps.someValue === nextProps.someValue // Example shallow comparison
  }
)
export default ProductCheckutCard
