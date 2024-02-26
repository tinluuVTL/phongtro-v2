import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSearchParams } from "react-router-dom"
import { apiGetCustomers } from "~/apis/user"
import { InputForm, InputSelect } from "~/components/inputs"
import { Pagiantion } from "~/components/paginations"
import useDebounce from "~/hooks/useDebounce"
import { useUserStore } from "~/store"
const ManageCustomner = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()
  const sort = watch("sort")
  const keyword = watch("keyword")
  const { current } = useUserStore()
  const [contracts, setContracts] = useState()
  const [update, setUpdate] = useState(false)
  const [searchParams] = useSearchParams()
  const fetchContractCustomers = async (params) => {
    const response = await apiGetCustomers({
      limit: import.meta.env.VITE_LIMIT_CUSTOMER,
      ...params,
    })
    if (response.success) setContracts(response.users)
  }
  const debounceKeyword = useDebounce(keyword, 800)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    if (sort) params.sort = sort
    if (debounceKeyword) params.keyword = debounceKeyword
    fetchContractCustomers(params)
  }, [update, debounceKeyword, searchParams])
  return (
    <div className="h-full w-full">
      <div className="py-4 lg:border-b flex items-center justify-between flex-wrap gap-4 px-4 w-full">
        <h1 className="text-3xl font-bold">Quản lý người thuê trọ</h1>
      </div>
      <div className="p-4">
        <p className="p-3 text-sm text-center italic rounded-md border border-blue-600 bg-blue-100 text-blue-600">
          NOTE: Xem trên PC hoặc Laptop để đầy đủ hơn
        </p>
      </div>
      <div className="my-4 px-4">
        <div className="flex md:justify-between gap-4 items-center">
          <div className="flex items-center gap-4">
            <InputSelect
              defaultText="Sắp xếp"
              register={register}
              id="sort"
              errors={errors}
              options={[
                { label: "Mới nhất", value: "-createdAt" },
                { label: "Lâu nhất", value: "createdAt" },
                { label: "Chỉnh sửa gần nhất", value: "-updatedAt" },
                { label: "Từ A tới Z", value: "title" },
                { label: "Từ Z tới A", value: "-title" },
              ]}
              containerClassName="w-fit"
            />
            <InputForm
              id="keyword"
              register={register}
              errors={errors}
              placeholder="Tìm kiếm theo tên,..."
              containerClassName="w-fit"
              inputClassName="px-8 focus:px-4"
            />
          </div>
          <span className="text-sm hidden md:block">
            Cập nhật <span>{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
          </span>
        </div>
      </div>
      <div className="p-4 w-full">
        <table className="max-w-full w-full overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-3 text-center">ID</th>
              <th className="border p-3 text-center">Tên</th>
              <th className="border p-3 text-center">Ảnh</th>
              <th className="border p-3 text-center">Quê quán</th>
              <th className="border hidden md:table-cell p-3 text-center">Năm sinh</th>
              <th className="border p-3 text-center">CCCD</th>
              <th className="border hidden lg:table-cell p-3 text-center">Phòng thuê</th>
              <th className="border  p-3 text-white bg-blue-600 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contracts?.rows?.map((el) => (
              <tr key={el.id}>
                <td className="border p-3 text-center">{el.id}</td>
                <td className="border p-3 text-center">
                  <span className="line-clamp-2">{el.rprofile?.lastName + " " + el.rprofile?.firstName}</span>
                </td>
                <td className="border p-3 text-center">
                  <span className="flex items-center justify-center">
                    <img src={el.rprofile?.image || "/user.svg"} alt="" className="w-12 h-12 object-cover" />
                  </span>
                </td>
                <td className="border p-3 text-center">{el.rprofile?.address}</td>
                <td className="border hidden md:table-cell p-3 text-center">
                  {moment(el.birthday).format("YYYY")}
                </td>
                <td className="border hidden lg:table-cell p-3 text-center">{el.rprofile?.CID}</td>
                <td className="border p-3 text-center">
                  <span className="text-blue-600 hover:underline cursor-pointer text-center">Xem</span>
                </td>
                <td className="border p-3 text-center">
                  <span className="flex items-center text-gray-500 gap-4 justify-center">
                    <span
                      title="Xóa"
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => handleDeleteContract(el.id)}
                    >
                      <RiDeleteBin6Line size={18} />
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <Pagiantion totalCount={contracts?.count} limit={+import.meta.env.VITE_LIMIT_CUSTOMER} />
      </div>
    </div>
  )
}

export default ManageCustomner
