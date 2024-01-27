const asyncHandler = require("express-async-handler")
const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = {
  verifyPhoneNumber: asyncHandler(async (req, res) => {
    const response = await db.User.findOne({
      where: { phone: req.body.phone },
    })
    return res.json({
      success: !response,
      mes: response ? "SĐT đã được sử dụng." : "SĐT hợp lệ",
    })
  }),

  register: asyncHandler(async (req, res) => {
    try {
      const { phone, password, username, roleCode } = req.body
      const phoneVerified = roleCode === "MANAGER" ? true : false
      const response = await db.User.create({
        phone,
        password,
        username,
        phoneVerified,
      })
      if (response) {
        const roleCodes = ["USER"]
        if (roleCode && roleCode !== "USER") roleCodes.push(roleCode)
        const bulkData = roleCodes.map((el) => ({
          userId: response.id,
          roleCode: el,
          // isValid: el === "USER" ? true : false,
        }))
        const addRoles = await db.Role_User.bulkCreate(bulkData)
        if (addRoles && addRoles.length > 0)
          return res.json({
            success: true,
            mes: "Đăng ký tài khoản thành công.",
          })
        else {
          await db.User.destroy({ where: { id: response.id } })
          return res.json({
            success: false,
            mes: "Có lỗi, hãy thử lại",
          })
        }
      } else
        return res.json({
          success: false,
          mes: "Có lỗi, hãy thử lại",
        })
    } catch (error) {
      console.log(error)
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { phone, password } = req.body
    const response = await db.User.findOne({ where: { phone } })
    if (!response) throw new Error("Thông tin đăng nhập không đúng.")
    const isValidPassword = bcrypt.compareSync(password, response.password)
    if (!isValidPassword) throw new Error("Thông tin đăng nhập không đúng.")
    const accessToken = await jwt.sign(
      { id: response.id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    )

    return res.json({
      success: !!accessToken,
      accessToken,
      mes: !!accessToken ? "Logged In" : "Thông tin đăng nhập không đúng.",
    })
  }),

  getCurrent: asyncHandler(async (req, res) => {
    const { id } = req.user
    const response = await db.User.findByPk(id, {
      attributes: ["id", "username", "phone"],
      include: [
        {
          model: db.Profile,
          as: "rprofile",
        },
        {
          model: db.Role_User,
          as: "rroles",
          attributes: ["roleCode"],
          include: [
            { model: db.Role, as: "roleValues", attributes: ["value"] },
          ],
        },
      ],
    })

    return res.json({
      success: !!response,
      currentUser: response,
      mes: !!response ? "Got." : "Không tìm thấy user.",
    })
  }),

  updateProfile: asyncHandler(async (req, res) => {
    const { id } = req.user
    const {
      username,
      email,
      firstName,
      lastName,
      address,
      gender,
      image,
      phone,
    } = req.body
    await db.Profile.findOrCreate({
      where: { userId: id },
      defaults: {
        userId: id,
      },
    })
    const [updateUser, updateProfile] = await Promise.all([
      db.Profile.update(
        { email, firstName, lastName, address, gender, image },
        { where: { userId: id } }
      ),
      db.User.update({ username, phone }, { where: { id } }),
    ])

    return res.json({
      success: updateUser[0] > 0 && updateProfile[0] > 0,
      mes:
        updateUser[0] > 0 && updateProfile[0] > 0
          ? "Cập nhật thành công"
          : "Có lỗi hãy thử lại xem.",
    })
  }),
  getUsers: asyncHandler(async (req, res) => {
    const { limit, page, sort, fields, title, keyword, ...filters } = req.query
    const options = {}
    if (fields) {
      const attributes = fields.split(",")
      const isExclude = attributes.some((el) => el.startsWith("-"))
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        }
      else options.attributes = attributes
    }
    if (keyword)
      filters[Op.or] = [
        {
          title: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Post.title")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
        {
          address: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Post.address")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
      ]
    if (sort) {
      const order = sort
        .split(",")
        .map((el) =>
          el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
        )
      options.order = order
    }

    if (!limit) {
      const response = await db.User.findAll({
        where: filters,
        ...options,
        attributes: ["id", "phone", "username"],
        include: [
          {
            model: db.Profile,
            as: "rprofile",
          },
        ],
      })
      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got." : "Có lỗi, hãy thử lại sau.",
        users: response,
      })
    }
    const prevPage = !page || page === 1 ? 0 : page - 1
    const offset = prevPage * limit
    if (offset) options.offset = offset
    options.limit = +limit
    const response = await db.Users.findAndCountAll({
      where: filters,
      ...options,
      distinct: true,
    })

    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Có lỗi, hãy thử lại sau.",
      users: response,
    })
  }),
  updateManager: asyncHandler(async (req, res) => {
    const { id } = req.user
    const response = await db.Role_User.create({
      userId: id,
      roleCode: "MANAGER",
    })

    return res.json({
      success: !!response,
      mes: !!response
        ? "Nâng cấp thành công. Hãy đăng nhập lại"
        : "Nâng cấp tài khoản thất bại.",
    })
  }),
}
