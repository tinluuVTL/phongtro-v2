import React from "react"
import { InputCheckbox, InputForm } from "../inputs"
import { useForm } from "react-hook-form"
import { Button } from "../commons"
import { useAppStore } from "~/store"

const CreateRoom = ({ pushRoom }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm()
  const { convenients, setModal } = useAppStore()
  const onSubmit = (data) => {
    pushRoom(data)
    reset()
  }
  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="py-4 bg-white w-full md:w-4/5 lg:w-[500px] rounded-md p-4 max-h-screen overflow-y-auto flex flex-col gap-4"
    >
      <InputForm
        register={register}
        id="title"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Tên phòng"
      />
      <InputForm
        register={register}
        id="price"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá thuê / tháng"
        type="number"
      />
      <InputForm
        register={register}
        id="electricPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá điện / kWh"
        type="number"
      />
      <InputForm
        register={register}
        id="waterPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá nước / mét khối"
        type="number"
      />
      <InputForm
        register={register}
        id="capsPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá cáp / tháng"
        type="number"
      />
      <InputForm
        register={register}
        id="internetPrice"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Giá internet / tháng"
        type="number"
      />
      <InputForm
        register={register}
        id="area"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Diện tích"
        type="number"
      />
      <InputForm
        register={register}
        id="stayMax"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Số người ở tối đa"
      />
      <InputCheckbox
        register={register}
        id="convenients"
        errors={errors}
        validate={{ required: "Không được bỏ trống." }}
        title="Tiện nghi"
        options={convenients?.map((el) => ({
          ...el,
          label: el.name,
          value: el.id,
        }))}
        optionsClassName="grid grid-cols-2 gap-4 mt-3"
      />
      <div className="flex items-center gap-4 justify-center">
        <Button onClick={handleSubmit(onSubmit)} className="my-4">
          Thêm
        </Button>
        <Button
          onClick={() => setModal(false, null)}
          className="my-4 bg-orange-600"
        >
          Quay lại
        </Button>
      </div>
    </form>
  )
}

export default CreateRoom
