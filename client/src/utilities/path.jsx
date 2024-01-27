const pathname = {
  admin: {
    LAYOUT: "quan-tri-vien",
    DASHBOARD: "thong-ke",
  },
  user: {
    PROFILE: "thong-tin-ca-nhan",
    LAYOUT: "thanh-vien",
    CONTRACT: "hop-dong",
  },
  manager: {
    LAYOUT: "chu-tro",
    DASHBOARD: "thong-ke",
    MANAGE_ROOM: "quan-ly-phong-tro",
    MANAGE_CONTRACT: "quan-ly-hop-dong",
    CREATE_CONTRACT: "them-hop-dong",
    MANAGE_POST: "quan-ly-tin-dang",
    CREATE_POST: "tao-moi-tin-dang",
  },
  public: {
    LAYOUT: "/",
    HOME: "",
    LOGIN: "dang-nhap",
    CANHO: "cho-thue-can-ho",
    PHONGTRO: "cho-thue-phong-tro",
    TIMGHEP: "tim-nguoi-o-ghep",
    TRANGCHU: "trang-chu",
    DETAIL_POST: "tin-dang",
    DETAIL_POST__PID: "tin-dang/:pid/:title",
    CHECKOUT: "thanh-toan-phong-tro",
    FILTER: "tim-kiem",
  },
}

export default pathname
