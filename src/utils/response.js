class Response {
  constructor(data = null, message = null, status) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "The transaction is successful",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "The transaction is successful",
    });
  }

  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "The transaction is failed!!!",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "The transaction is failed!!!",
    });
  }
}
