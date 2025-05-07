const souvenirs = [
    // Bảo Tàng Quân Khu 5
    {
        id: 1,
        title: "Móc khóa hình xe tăng T-54",
        description: "Chiếc móc khóa nhỏ gọn với mô hình xe tăng T-54 – biểu tượng chiến thắng trong chiến dịch Hồ Chí Minh.",
        image: "/image/souvenir/souvenir1.jpg",
        museum: "Bảo Tàng Quân Khu 5",
        slug: "bao-tang-quan-khu-5",
        address: "03 Duy Tân, Hải Châu, Đà Nẵng",
        phone: "0236 3886 194"
    },
    {
        id: 2,
        title: "Sổ tay da in hình bản đồ chiến dịch",
        description: "Sổ tay bìa da khắc họa bản đồ chiến dịch lịch sử, thích hợp cho người yêu lịch sử quân sự.",
        image: "/image/souvenir/souvenir2.jpg",
        museum: "Bảo Tàng Quân Khu 5",
        slug: "bao-tang-quan-khu-5",
        address: "03 Duy Tân, Hải Châu, Đà Nẵng",
        phone: "0236 3886 194"
    },
    {
        id: 3,
        title: "Cốc sứ in hình Bác Hồ và chiến sĩ",
        description: "Cốc uống nước gốm sứ, in hình Bác Hồ và các chiến sĩ giải phóng, món quà ý nghĩa cho người yêu nước.",
        image: "/image/souvenir/souvenir3.jpg",
        museum: "Bảo Tàng Quân Khu 5",
        slug: "bao-tang-quan-khu-5",
        address: "03 Duy Tân, Hải Châu, Đà Nẵng",
        phone: "0236 3886 194"
    },

    // Bảo tàng Điêu khắc Chăm
    {
        id: 4,
        title: "Vòng tay thổ cẩm họa tiết Chăm",
        description: "Chiếc vòng tay bằng vải thổ cẩm, dệt thủ công với họa tiết lấy cảm hứng từ nghệ thuật Chăm cổ.",
        image: "/image/souvenir/souvenir4.jpg",
        museum: "Bảo tàng Điêu khắc Chăm",
        slug: "bao-tang-ieu-khac-cham",
        address: "02 2 Tháng 9, Hải Châu, Đà Nẵng",
        phone: "0236 3574 170"
    },
    {
        id: 5,
        title: "Nam châm tủ lạnh hình tháp Chăm",
        description: "Nam châm trang trí với hình ảnh tháp Chăm cổ kính, thích hợp làm quà lưu niệm nhỏ gọn.",
        image: "/image/souvenir/souvenir5.jpg",
        museum: "Bảo tàng Điêu khắc Chăm",
        slug: "bao-tang-ieu-khac-cham",
        address: "02 2 Tháng 9, Hải Châu, Đà Nẵng",
        phone: "0236 3574 170"
    },
    {
        id: 6,
        title: "Postcard in hình phù điêu Apsara",
        description: "Bộ bưu thiếp in ảnh phù điêu Apsara uyển chuyển, mang đậm vẻ đẹp văn hóa Chăm.",
        image: "/image/souvenir/souvenir6.jpg",
        museum: "Bảo tàng Điêu khắc Chăm",
        slug: "bao-tang-ieu-khac-cham",
        address: "02 2 Tháng 9, Hải Châu, Đà Nẵng",
        phone: "0236 3574 170"
    },

    // Bảo tàng Đà Nẵng
    {
        id: 7,
        title: "Áo thun in hình chợ Hàn xưa",
        description: "Chiếc áo thun in hình minh họa chợ Hàn xưa – điểm đến quen thuộc của người dân Đà Nẵng.",
        image: "/image/souvenir/souvenir7.jpg",
        museum: "Bảo tàng Đà Nẵng",
        slug: "bao-tang-a-nang",
        address: "24 Trần Phú, Hải Châu, Đà Nẵng",
        phone: "0236 3822 783"
    },
    {
        id: 8,
        title: "Túi vải canvas in danh thắng Đà Nẵng",
        description: "Túi tote canvas in các địa danh nổi bật của Đà Nẵng như cầu Rồng, núi Ngũ Hành Sơn, Bảo tàng.",
        image: "/image/souvenir/souvenir8.jpg",
        museum: "Bảo tàng Đà Nẵng",
        slug: "bao-tang-a-nang",
        address: "24 Trần Phú, Hải Châu, Đà Nẵng",
        phone: "0236 3822 783"
    },
    {
        id: 9,
        title: "Bút ký khắc tên Bảo tàng Đà Nẵng",
        description: "Chiếc bút ký sang trọng, khắc laser dòng chữ 'Bảo tàng Đà Nẵng' – món quà tinh tế, giá trị.",
        image: "/image/souvenir/souvenir9.jpg",
        museum: "Bảo tàng Đà Nẵng",
        slug: "bao-tang-a-nang",
        address: "24 Trần Phú, Hải Châu, Đà Nẵng",
        phone: "0236 3822 783"
    },
    {
        id: 10,
        title: "Móc khóa hình cầu Rồng",
        description: "Móc khóa nhỏ xinh với mô hình cầu Rồng – biểu tượng hiện đại của thành phố Đà Nẵng.",
        image: "/image/souvenir/souvenir10.jpg",
        museum: "Bảo tàng Đà Nẵng",
        slug: "bao-tang-a-nang",
        address: "24 Trần Phú, Hải Châu, Đà Nẵng",
        phone: "0236 3822 783"
    },
    // Bảo tàng Tre Trúc Sơn Trà
    {
        id: 11,
        title: "Ống hút tre khắc chữ Sơn Trà",
        description: "Ống hút tre thân thiện môi trường, khắc chữ 'Sơn Trà' – món quà nhỏ mang đậm bản sắc tự nhiên.",
        image: "/image/souvenir/souvenir11.jpg",
        museum: "Bảo tàng tre trúc Sơn Trà",
        slug: "bao-tang-tre-truc-son-tra",
        address: "Lô 01-A2.2 đường Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
        phone: "Đang cập nhật"
    },
    {
        id: 12,
        title: "Lược tre thủ công truyền thống",
        description: "Chiếc lược bằng tre được chế tác thủ công, mịn màng và thân thiện, mang hương vị mộc mạc Sơn Trà.",
        image: "/image/souvenir/souvenir12.jpg",
        museum: "Bảo tàng tre trúc Sơn Trà",
        slug: "bao-tang-tre-truc-son-tra",
        address: "Lô 01-A2.2 đường Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
        phone: "Đang cập nhật"
    },
    {
        id: 13,
        title: "Móc khóa hình chiếc nón tre",
        description: "Móc khóa nhỏ mô phỏng chiếc nón tre dân dã – biểu tượng của sự giản dị và thiên nhiên.",
        image: "/image/souvenir/souvenir13.jpg",
        museum: "Bảo tàng tre trúc Sơn Trà",
        slug: "bao-tang-tre-truc-son-tra",
        address: "Lô 01-A2.2 đường Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
        phone: "Đang cập nhật"
    },

    // Nhà trưng bày Hoàng Sa
    {
        id: 14,
        title: "Postcard bản đồ Hoàng Sa",
        description: "Tấm bưu thiếp in bản đồ cổ Hoàng Sa – khẳng định chủ quyền biển đảo quê hương.",
        image: "/image/souvenir/souvenir14.jpg",
        museum: "Nhà trưng bày Hoàng Sa",
        slug: "nha-trung-bay-hoang-sa",
        address: "Hoàng Sa, Thọ Quang, Sơn Trà, Đà Nẵng",
        phone: "0236 3923 675"
    },
    {
        id: 15,
        title: "Cờ Việt Nam mini để bàn",
        description: "Lá cờ Việt Nam nhỏ gọn để bàn – gợi nhớ tinh thần yêu nước và chủ quyền biển đảo thiêng liêng.",
        image: "/image/souvenir/souvenir15.jpg",
        museum: "Nhà trưng bày Hoàng Sa",
        slug: "nha-trung-bay-hoang-sa",
        address: "Hoàng Sa, Thọ Quang, Sơn Trà, Đà Nẵng",
        phone: "0236 3923 675"
    },
    {
        id: 16,
        title: "Sổ tay in tư liệu Hoàng Sa",
        description: "Sổ tay nhỏ in các hình ảnh, bản đồ, và tư liệu về quần đảo Hoàng Sa – món quà ý nghĩa cho người trẻ.",
        image: "/image/souvenir/souvenir16.jpg",
        museum: "Nhà trưng bày Hoàng Sa",
        slug: "nha-trung-bay-hoang-sa",
        address: "Hoàng Sa, Thọ Quang, Sơn Trà, Đà Nẵng",
        phone: "0236 3923 675"
    },

    // Bảo tàng Phật giáo Đà Nẵng
    {
        id: 17,
        title: "Vòng tay gỗ trầm hương",
        description: "Vòng tay trầm hương thơm dịu – thường được dùng như vật phẩm tâm linh và quà tặng may mắn.",
        image: "/image/souvenir/souvenir17.jpg",
        museum: "Bảo tàng Phật Giáo Đà Nẵng",
        slug: "bao-tang-phat-giao-a-nang",
        address: "48 Sư Vạn Hạnh, Ngũ Hành Sơn, Đà Nẵng",
        phone: "0236 3955 848"
    },
    {
        id: 18,
        title: "Chuỗi hạt bồ đề mini",
        description: "Chuỗi hạt bồ đề nhỏ gọn, tượng trưng cho sự an lạc, thường được dùng khi niệm Phật hay làm quà tặng.",
        image: "/image/souvenir/souvenir18.jpg",
        museum: "Bảo tàng Phật Giáo Đà Nẵng",
        slug: "bao-tang-phat-giao-a-nang",
        address: "48 Sư Vạn Hạnh, Ngũ Hành Sơn, Đà Nẵng",
        phone: "0236 3955 848"
    },
    {
        id: 19,
        title: "Tượng Phật nhỏ bằng gốm",
        description: "Tượng Phật mini bằng gốm men trắng – mang ý nghĩa bình an và tịnh tâm cho người sở hữu.",
        image: "/image/souvenir/souvenir19.jpg",
        museum: "Bảo tàng Phật Giáo Đà Nẵng",
        slug: "bao-tang-phat-giao-a-nang",
        address: "48 Sư Vạn Hạnh, Ngũ Hành Sơn, Đà Nẵng",
        phone: "0236 3955 848"
    },
    {
        id: 20,
        title: "Quạt giấy in hình danh thắng Đà Nẵng",
        description: "Chiếc quạt giấy truyền thống được in hình các địa danh nổi bật của Đà Nẵng như cầu Rồng, bán đảo Sơn Trà, bảo tàng Chăm – vừa mát, vừa mang đậm nét du lịch văn hóa.",
        image: "/image/souvenir/souvenir20.jpg",
        museum: "Bảo tàng Đà Nẵng",
        slug: "bao-tang-a-nang",
        address: "24 Trần Phú, Hải Châu, Đà Nẵng",
        phone: "0236 3822 783"
    }
];

export default souvenirs;
