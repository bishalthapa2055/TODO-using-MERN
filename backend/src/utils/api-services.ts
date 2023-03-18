class ApiFeatures {
  constructor(public query: any, public queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  dateFilter() {
    // Date Extraction
    const { dateFrom, dateTo } = this.queryString;

    if (dateFrom && dateTo) {
      this.query = this.query.find({
        date: {
          $gte: dateFrom,
          $lte: dateTo,
        },
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "searchTerm",
      "dateFrom",
      "dateTo",
      "aggregate",
      "type",
      "status",
      "name",
      "model_type",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = queryStr.replace(
      /^(?=.*[A-Za-z0-9])[A-Za-z0-9\s]*$/,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export { ApiFeatures };
