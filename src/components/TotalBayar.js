import { Button } from "react-bootstrap";
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
        this.props.history.push('/sukses')
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            Total Harga :{" "}
            <strong className="float-end mr-2">
              Rp. {numberWithCommas(totalBayar)}
            </strong>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                className="mb-2 mt-3 d-block"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong> BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
