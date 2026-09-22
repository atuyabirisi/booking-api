import axios from "axios";
import moment from "moment";
import PaymentGateway from "../../application/interfaces/PaymentGateway.js";

class MpesaPaymentGateway extends PaymentGateway {
  constructor({
    consumerKey,
    consumerSecret,
    businessShortCode,
    passkey,
    callbackUrl,
  }) {
    super();

    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.businessShortCode = businessShortCode;
    this.passkey = passkey;
    this.callbackUrl = callbackUrl;
  }

  // async initiatePayment({ phoneNumber, amount, paymentReference }) {
  //   const accessToken = await this.getAccessToken();

  //   const timestamp = this.generateTimestamp();

  //   const password = this.generatePassword(timestamp);

  //   const response = await axios.post(
  //     `${this.getBaseUrl()}/mpesa/stkpush/v1/processrequest`,
  //     {
  //       BusinessShortCode: this.businessShortCode,
  //       Password: password,
  //       Timestamp: timestamp,
  //       TransactionType: "CustomerPayBillOnline",
  //       Amount: amount,
  //       PartyA: phoneNumber,
  //       PartyB: this.businessShortCode,
  //       PhoneNumber: phoneNumber,
  //       CallBackURL: this.callbackUrl,
  //       AccountReference: paymentReference,
  //       TransactionDesc: `Payment ${paymentReference}`,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   );

  //   return {
  //     providerRequestId: response.data.MerchantRequestID,
  //     providerCheckoutId: response.data.CheckoutRequestID,
  //   };
  // }

  async initiatePayment({ phoneNumber, amount, paymentReference }) {
    try {
      const accessToken = await this.getAccessToken();

      const timestamp = this.generateTimestamp();

      const password = this.generatePassword(timestamp);

      const response = await axios.post(
        `${this.getBaseUrl()}/mpesa/stkpush/v1/processrequest`,
        {
          BusinessShortCode: this.businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: this.businessShortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: this.callbackUrl,
          AccountReference: paymentReference,
          TransactionDesc: `Payment ${paymentReference}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      return {
        providerRequestId: response.data.MerchantRequestID,
        providerCheckoutId: response.data.CheckoutRequestID,
      };
    } catch (error) {
      const providerError = error.response?.data;

      console.error("M-Pesa STK Push failed:", providerError);

      throw new Error(
        providerError?.errorMessage ||
          providerError?.errorCode ||
          "M-Pesa STK Push failed",
      );
    }
  }

  async getAccessToken() {
    const credentials = Buffer.from(
      `${this.consumerKey}:${this.consumerSecret}`,
    ).toString("base64");

    const response = await axios.get(
      `${this.getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      },
    );

    return response.data.access_token;
  }

  generateTimestamp = () => {
    return moment().format("YYYYMMDDHHmmss");
  };

  generatePassword(timestamp) {
    return Buffer.from(
      `${this.businessShortCode}${this.passkey}${timestamp}`,
    ).toString("base64");
  }

  getBaseUrl() {
    return "https://sandbox.safaricom.co.ke";
  }
}

export default MpesaPaymentGateway;
