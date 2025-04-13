function toSlug(str) {
    return str
      .toLowerCase()
      .normalize('NFD')               // chuyển ký tự có dấu thành không dấu
      .replace(/[\u0300-\u036f]/g, '') // xóa các dấu
      .replace(/[^a-z0-9\s-]/g, '')     // xóa ký tự đặc biệt
      .trim()
      .replace(/\s+/g, '-')            // thay khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, '-')             // gộp nhiều dấu gạch ngang liên tiếp
  }

  export default toSlug