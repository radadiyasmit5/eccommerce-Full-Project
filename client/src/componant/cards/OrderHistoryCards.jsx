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
import OrderTable from "../tables/OrderTable"

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

  // const displayProducts =
  // }
  return (
    <>
      {orders &&
        orders.map((order) => (
          <div>
            <Card className="m-2">
              <OrderTable order={order} />
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
