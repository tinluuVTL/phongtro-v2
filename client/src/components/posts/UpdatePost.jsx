import React, { useEffect, useState } from "react"
import {
  RiCloseCircleFill,
  RiDeleteBin6Line,
  RiFileEditLine,
} from "react-icons/ri"
import { EditRoom } from "../user"
import { InputFile, InputForm, InputSelect, InputText } from "../inputs"
import { useForm } from "react-hook-form"
import { useAppStore, useUserStore } from "~/store"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { Button } from "../commons"
import readXlsxFile from "read-excel-file"
import { apiUpdatePost } from "~/apis/post"

const UpdatePost = ({ post }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm()
  const images = watch("images")
  const description = watch("description")
  const { setModal, catalogs } = useAppStore()
  useEffect(() => {
    if (post)
      reset({
        title: post?.title,
        address: post?.address,
        description: post?.description,
        catalogId: post?.catalogId,
        images: post?.images,
        rooms: post?.rooms,
      })
  }, [post])
  const [rooms, setRooms] = useState([])
  const handleReadFileExcel = async (e) => {
    const file = e.target.files[0]
    if (!file.type.includes("spreadsheetml.sheet"))
      return Swal.fire("Oops!", "Chỉ hỗ trợ file Excel", "info")
    const rows = await readXlsxFile(file)
    if (rows && rows.length > 0) {
      const roomData = []
      for (let row of rows) {
        if (row[0] === "ROOM")
          roomData.push({
            title: row[1],
            price: row[2],
            area: row[3],
            stayMax: row[4],
            electricPrice: row[5],
            waterPrice: row[6],
            capsPrice: row[7],
            internetPrice: row[8],
          })
      }
      setRooms(roomData)
    } else toast.warn("File rỗng.")
  }
  const handleUpdatePost = async (data) => {
    const payload = { ...data, rooms }
    delete payload.roomfile
    console.log(payload)
    const response = await apiUpdatePost(post?.id, payload)
    if (response.success) {
      toast.success(response.mes)
      setModal(false, true)
    } else toast.error(response.mes)
  }
  const getImages = (image = []) => {
    let arrayImages = images || []
    if (image && image.length > 0)
      arrayImages = [...arrayImages, ...image.map((el) => el.path)]
    setValue("images", arrayImages)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full lg:w-[80%] bg-white max-h-screen overflow-y-auto"
    >
      <div className="w-full h-full">
        <div className="flex justify-between py-4 lg:border-b px-4 items-center">
          <h1 className="text-3xl font-bold">
            Cập nhật tin đăng #<span>{post.id}</span>
          </h1>
          <Button
            className="bg-orange-600"
            onClick={() => setModal(false, null)}
          >
            Quay lại
          </Button>
        </div>
        <form className="p-4 w-full">
          <h2 className="font-bold text-blue-600 my-4">
            1. Thông tin tổng quát
          </h2>
          <div className="flex flex-col gap-4">
            <InputForm
              register={register}
              id="title"
              errors={errors}
              title="Tựa đề"
              validate={{ required: "Không được bỏ trống." }}
            />
            <InputForm
              register={register}
              id="address"
              errors={errors}
              title="Địa chỉ"
              validate={{ required: "Không được bỏ trống." }}
            />
            <InputSelect
              id="catalogId"
              register={register}
              errors={errors}
              title="Thể loại"
              validate={{ required: "Không được bỏ trống." }}
              options={catalogs?.map((el) => ({
                ...el,
                label: el.value,
                value: el.id,
              }))}
            />
            <InputText
              id="description"
              register={register}
              errors={errors}
              validate={{ required: "Không được bỏ trống." }}
              setValue={setValue}
              label="Mô tả chi tiết"
              value={description}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Hình ảnh</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...new Set(images)]?.map((el, idx) => (
                  <div key={idx} className="col-span-1 relative">
                    <img
                      src={el}
                      className="w-full border object-contain rounded-md"
                    />
                    <span
                      onClick={() =>
                        setValue(
                          "images",
                          images.filter(
                            (p) => JSON.stringify(p) !== JSON.stringify(el)
                          )
                        )
                      }
                      className="absolute top-1 right-1 p-2 rounded-full text-2xl text-white cursor-pointer"
                    >
                      <RiCloseCircleFill />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <InputFile
              id="images"
              label="Thêm ảnh"
              getImages={(images) => getImages(images)}
              mutilple={true}
              hidden
            />
            <h2 className="font-bold text-blue-600 my-4">
              2. Chi tiết phòng ở
            </h2>
            <div className="flex flex-col gap-3">
              <label className="italic" htmlFor="rooms">
                Tải file excel danh sách phòng ở (Tải file trường hợp bạn muốn
                thêm phòng ở, nếu muốn chỉnh sửa phòng ở hãy vào mục "Quản lý
                phòng trọ")
              </label>
              <input
                type="file"
                id="rooms"
                className="mb-8"
                {...register("roomfile")}
                onChange={handleReadFileExcel}
              />
              {errors && errors["roomfile"] && (
                <small className="text-xs text-red-600">
                  {errors["roomfile"].message}
                </small>
              )}
            </div>
            {rooms && rooms.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Danh sách phòng ở</h2>
                <table className="my-4 w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3">Tên phòng</th>
                      <th className="border p-3">Giá thuê</th>
                      <th className="border p-3">Diện tích</th>
                      <th className="border p-3">Ở đối đa</th>
                      <th className="border p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((el, idx) => (
                      <tr key={idx}>
                        <td className="text-center border p-3">{el.title}</td>
                        <td className="text-center border p-3">{el.price}</td>
                        <td className="text-center border p-3">{el.area}</td>
                        <td className="text-center border p-3">{el.stayMax}</td>
                        <td className="text-center border text-blue-600 p-3">
                          <span className="flex items-center justify-center gap-3">
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                setModal(
                                  true,
                                  <EditRoom setRooms={setRooms} editRoom={el} />
                                )
                              }
                              title="Chỉnh sửa / Thêm tiện nghi"
                            >
                              <RiFileEditLine size={18} />
                            </span>
                            <span title="Xóa">
                              <RiDeleteBin6Line size={18} />
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Button onClick={handleSubmit(handleUpdatePost)}>Publish</Button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePost
