import React from "react"
import {Card} from "antd"
import {
  CheckCircleFilled,
  CiCircleOutlined,
  DownloadOutlined,
  StopOutlined,
} from "@ant-design/icons"
import {currencyFormat} from "../../utils/utils"
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table"
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer"
import {PDFDownloadLink} from "@react-pdf/renderer"

const OrderHistoryCards = ({orders}) => {
  const myDocument = (p) => {
    
    const styles = StyleSheet.create({
      body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: "center",
      },
      author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
      },

      text: {
        padding: 4,
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Times-Roman",
      },
      footertext: {
        margin: 12,
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Times-Roman",
      },

      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
      },
    })
    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            {" "}
            ~ {new Date().toDateString()}, {new Date().toTimeString()} ~
          </Text>
          <Text style={styles.title}>~Order Summary~</Text>
          <Text style={styles.author}>~Ecommerce App~</Text>
          <Table data={[...p]}>
            <TableHeader>
              <TableCell style={styles.text}>Title</TableCell>
              <TableCell style={styles.text}>Price</TableCell>
              <TableCell style={styles.text}>Brand</TableCell>
              <TableCell style={styles.text}>Color</TableCell>
              <TableCell style={styles.text}>Count</TableCell>
              <TableCell style={styles.text}>Shipping</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                style={styles.text}
                getContent={(p) => p?.product?.title}
              />
              <DataTableCell
                style={styles.text}
                getContent={(p) => currencyFormat(p?.product?.price)}
              />
              <DataTableCell
                style={styles.text}
                getContent={(p) => p?.product?.brand}
              />
              <DataTableCell
                style={styles.text}
                getContent={(p) => p?.product?.color}
              />
              <DataTableCell style={styles.text} getContent={(p) => p?.count} />
              <DataTableCell
                style={styles.text}
                getContent={(p) => p?.product?.shipping}
              />
            </TableBody>
          </Table>
          <Text style={styles.footertext}>
            ~ Thank you for Shopping with Us~
          </Text>
        </Page>
      </Document>
    )
  }

  const displayProducts = (order) => {
    const products = order.products
    return (
      <>
        <>
          <table className="table table-bordered">
            <thead className="table-active">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
              </tr>
            </thead>
            {products &&
              products.map((p) => (
                <tbody>
                  <tr>
                    <td>{p.product.title}</td>
                    <td>{p.product.price}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td className="text-center">
                      {p.product.shipping ? (
                        <CheckCircleFilled className="text text-success text-center" />
                      ) : (
                        <StopOutlined className="text text-danger" />
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </>
      </>
    )
  }
  return (
    <>
      {orders &&
        orders.map((order) => (
          <div>
            <Card className="m-2">
              <>
                <div className="d-flex justify-content-between">
                  <div className="text m-3">
                    <div className="m-3 ">
                      <label className="text font-weight-bold">
                        Order ID:{" "}
                      </label>{" "}
                      <span
                        className="text text-dark"
                        style={{fontSize: "1rem"}}
                      >
                        {order?.paymentIntent?.id}
                      </span>
                    </div>
                    <div className="m-3 ">
                      <label className="text font-weight-bold">
                        Order Status:{" "}
                      </label>{" "}
                      <span
                        className="text text-dark"
                        style={{fontSize: "1rem"}}
                      >
                        {order?.orderStatus}
                      </span>
                    </div>
                    <div className="m-3 ">
                      <label className="text font-weight-bold">
                        Order Date:{" "}
                      </label>{" "}
                      <span
                        className="text text-dark"
                        style={{fontSize: "1rem"}}
                      >
                        {new Date(order?.orderDate).toDateString()} (UTC)
                      </span>
                    </div>
                  </div>
                  <div className="text m-3">
                    <div className="m-3 ">
                      <label className="text font-weight-bold">
                        Total Amount:{" "}
                      </label>{" "}
                      <span
                        className="text text-dark"
                        style={{fontSize: "1rem"}}
                      >
                        {currencyFormat(order.paymentIntent.amount / 100)}
                      </span>
                    </div>
                    <div className="m-3 ">
                      <label className="text font-weight-bold">
                        Currency:{" "}
                      </label>{" "}
                      <span
                        className="text text-dark text-uppercase"
                        style={{fontSize: "1rem"}}
                      >
                        {order?.paymentIntent?.currency}
                      </span>
                    </div>
                    <div className="m-3 ">
                      <label className="text font-weight-bold">
                        Expected Delivery:{" "}
                      </label>{" "}
                      <span
                        className="text text-dark"
                        style={{fontSize: "1rem"}}
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
                {displayProducts(order)}
              </>
              <div className="text text-center">
                <PDFDownloadLink
                  document={myDocument(order.products)}
                  className="btn btn-raised text "
                  fileName={`${order._id}.pdf`}
                >
                  {({blob, url, loading, error}) =>
                    loading ? (
                      "Loading document..."
                    ) : (
                      <>
                        <DownloadOutlined /> Download PDF
                      </>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </Card>
          </div>
        ))}
    </>
  )
}

export default OrderHistoryCards
