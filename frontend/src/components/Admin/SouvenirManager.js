import React, { useEffect, useState } from "react";
import FullPageLoading from '../../components/common/FullPageLoading'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function ArtifactList() {

    const [listCategory, setListCategory] = useState()
    const [listProduct, setListProduct] = useState()
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState()
    const [formData, setFormData] = useState({
        ten: "",
        gia: "",
        soLuong: "",
        danhMuc: "",
        moTa: "",
        anh: null,
        anhUrl: null,
    });
    const [formErrors, setFormErrors] = useState({});
    const [editingId, setEditingId] = useState(null); // lưu id sản phẩm đang sửa

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/CategoryProduct`)
                setListCategory(res.data)
                const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/Product`)
                setListProduct(res2.data)
            }
            catch(err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            anh: file,
            anhUrl: URL.createObjectURL(file),
        }));
        setFormErrors((prev) => ({ ...prev, anh: "" }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.ten.trim()) errors.ten = "Tên sản phẩm không được để trống.";
        if (isNaN(formData.gia)) errors.gia = "Giá phải là số.";
        else if (formData.gia<=0) errors.gia = "Giá phải lớn hơn 0.";
        if (isNaN(formData.soLuong)) errors.soLuong = "Số lượng phải là số.";
        if (formData.soLuong<=0) errors.soLuong = "Số lượng phải lớn hơn 0.";
        if (!formData.danhMuc) errors.danhMuc = "Vui lòng chọn danh mục.";
        if (!formData.moTa.trim()) errors.moTa = "Mô tả không được để trống.";
        // Khi thêm mới thì ảnh bắt buộc, khi sửa nếu chưa đổi ảnh thì cho qua
        if (!formData.anh && !formData.anhUrl) errors.anh = "Vui lòng chọn ảnh.";
        return errors;
    };

    const handleSave = async () => {
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (editingId) {
            const updateProduct = {
                Name: formData.ten,
                Point: formData.gia,
                Stock: formData.soLuong,
                CategoryProductId: formData.danhMuc,
                Description: formData.moTa,
                Image: formData.anh,
            };
            try {
                setLoading(true)
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/Product/${editingId}`, updateProduct, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    }})
                    
                setListProduct((prev) =>
                    prev.map((item) =>
                        item.id === editingId
                            ? {
                                ...res.data
                            }
                            : item
                ));
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật sản phẩm thành công!',
                    text: 'Sản phẩm đã được cập nhật.',
                    showConfirmButton: false,
                    timer: 1800,
                    toast: true,
                    position: 'top-end'
                });
            }
            catch(err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
            
        } else {
            // Thêm mới sản phẩm
            const newProduct = {
                Name: formData.ten,
                Point: formData.gia,
                Stock: formData.soLuong,
                CategoryProductId: formData.danhMuc,
                Description: formData.moTa,
                Image: formData.anh,
            };
            try {
                setLoading(true)
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/Product`, newProduct, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm sản phẩm thành công!',
                    text: 'Sản phẩm đã được thêm vào danh sách.',
                    showConfirmButton: false,
                    timer: 1800,
                    toast: true,
                    position: 'top-end'
                });
                setListProduct(prev => {
                    return [...prev, res.data]
                })
            }
            catch(err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }

        setShowModal(false);
        setFormData({ ten: "", gia: "", soLuong: "", danhMuc: "", moTa: "", anh: null, anhUrl: null });
        setFormErrors({});
        setEditingId(null);
    };


const handleDelete = (id) => {
  Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Sản phẩm sẽ bị xóa và không thể khôi phục!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    setLoading(true)
    if (result.isConfirmed) {
        const res = axios.delete(`${process.env.REACT_APP_API_URL}/Product/${id}`)
        return res
    }
  })
  .then((res) => {
    if(res.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Sản phẩm đã được xóa thành công.',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
        setListProduct((prev) => prev.filter((item) => item.id !== id));
    }
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    setLoading(false)
  })
  ;
};


    const handleEdit = (product) => {
        setFormData({
            ten: product.name,
            gia: product.point,
            soLuong: product.stock,
            danhMuc: product.categoryProductId,
            moTa: product.description,
            anh: product.image, 
            anhUrl: product.image,
        });
        setEditingId(product.id);
        setFormErrors({});
        setShowModal(true);
    };

    const renderError = (field) =>
        formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>;

    if (loading) return <FullPageLoading isLoading={true} />
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-brown-700 mb-4">Quản lý quà lưu niệm</h1>

            <button
                onClick={() => {
                    setShowModal(true);
                    setEditingId(null);
                    setFormData({ ten: "", gia: "", soLuong: "", danhMuc: "", moTa: "", anh: null, anhUrl: null });
                    setFormErrors({});
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
            >
                + Thêm sản phẩm
            </button>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="py-2 px-4">STT</th>
                            <th className="py-2 px-4">Ảnh</th>
                            <th className="py-2 px-4">Tên sản phẩm</th>
                            <th className="py-2 px-4">Mô tả</th>
                            <th className="py-2 px-4">Giá</th>
                            <th className="py-2 px-4">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!listProduct ? (
                            <tr className="text-center border-t">
                                <td colSpan={6} className="py-4">
                                    Chưa có sản phẩm nào.
                                </td>
                            </tr>
                        ) : (
                            listProduct.map((product, index) => (
                                <tr key={product.id} className="text-center border-t hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 object-cover mx-auto rounded-md shadow-sm"
                                    />
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>

                                    {/* Mô tả giới hạn 2 dòng, cắt bớt */}
                                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate" title={product.description}>
                                    {product.description.length > 60
                                        ? product.description.slice(0, 57) + '...'
                                        : product.description}
                                    </td>

                                    {/* Format point như tiền */}
                                    <td className="py-3 px-4 font-semibold text-green-700">
                                    {product.point?.toLocaleString('vi-VN')} ₫
                                    </td>

                                    <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm transition"
                                    >
                                        ✏️ Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                                    >
                                        🗑️ Xóa
                                    </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white w-full max-w-3xl rounded-lg p-6 relative max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingId ? "Chỉnh sửa quà lưu niệm" : "Thêm quà lưu niệm mới"}
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    name="ten"
                                    className="border p-2 rounded w-full"
                                    placeholder="Tên sản phẩm"
                                    value={formData.ten}
                                    onChange={handleInputChange}
                                />
                                {renderError("ten")}
                            </div>
                            <div>
                                <input
                                    name="gia"
                                    className="border p-2 rounded w-full"
                                    placeholder="Giá"
                                    value={formData.gia}
                                    onChange={handleInputChange}
                                />
                                {renderError("gia")}
                            </div>
                            <div>
                                <input
                                    name="soLuong"
                                    className="border p-2 rounded w-full"
                                    placeholder="Số lượng"
                                    value={formData.soLuong}
                                    onChange={handleInputChange}
                                />
                                {renderError("soLuong")}
                            </div>
                            <div className="col-span-2">
                                <select
                                    name="danhMuc"
                                    className="border p-2 rounded w-full"
                                    value={formData.danhMuc}
                                    onChange={handleInputChange}
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    {listCategory.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {renderError("danhMuc")}
                            </div>
                            <div className="col-span-2">
                                <textarea
                                    name="moTa"
                                    className="border p-2 rounded w-full"
                                    rows={3}
                                    placeholder="Mô tả"
                                    value={formData.moTa}
                                    onChange={handleInputChange}
                                />
                                {renderError("moTa")}
                            </div>
                            <div className="col-span-2">
                                <input type="file" onChange={handleFileChange} />
                                {formData.anhUrl && !formData.anh && (
                                    <img
                                        src={formData.anhUrl}
                                        alt="Ảnh hiện tại"
                                        className="mt-2 w-24 h-24 object-cover rounded"
                                    />
                                )}
                                {renderError("anh")}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end mt-6 space-x-2">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setShowModal(false);
                                    setFormErrors({});
                                    setEditingId(null);
                                }}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={handleSave}
                            >
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
