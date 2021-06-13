import { InputNumber, notification } from "antd"
import { PATH } from "Constants/Path"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import {
    changeQty,
    getTotalPriceBillSuccess,
    getTotalPriceSuccess
} from "Redux/Cart/Cart.reducer"
import { getCartLS, saveCartApi, setCartLS } from "Redux/Cart/Cart.thunk"
import { getUserCookie } from "Redux/User/User.thunk"
import { changePriceToVND } from "Utils/Converter"
import { removeCacheLocalStorage } from "Utils/localStorageFunctions"
const CheckOut = () => {
    // const [cart, setCart] = useState(getLS("carts"))
    const dispatch = useDispatch()
    const account = useSelector(state => state.UserReducer.user)
    const carts = useSelector(state => state.CartReducer.carts)
    // const totalPrice = useSelector(state => state.CartReducer.totalPrice)
    const totalPriceBill = useSelector(
        state => state.CartReducer.totalPriceBill
    )
    const history = useHistory()
    const redirectHome = () => history.push("/etech")
    // console.log("🚀 ~ file: index.js ~ line 17 ~ CheckOut ~ account", account)

    useEffect(() => {
        dispatch(getUserCookie())
        dispatch(getCartLS())
        dispatch(getTotalPriceSuccess())
        dispatch(getTotalPriceBillSuccess())
    }, [])

    const handleRemoveItem = id => {
        dispatch(setCartLS(carts.filter(item => item.id !== id)))
        dispatch(getTotalPriceSuccess())
        dispatch(getTotalPriceBillSuccess())
    }

    const onChangeQty = (id, e) => {
        dispatch(changeQty({ id, e }))
        dispatch(getTotalPriceBillSuccess())
    }

    const handlePay = () => {
        let order = []
        console.log("🚀 ~ file: index.js ~ line 50 ~ handlePay ~ order", order)
        carts.map(item => order.push({ id: item.id, qty: item.qty }))
        dispatch(saveCartApi(order))

        // dispatch(CartApi.saveCart({ order: order })).then(res => {
        //     console.log(res)
        //     if (res.notify && res.notify) {
        //         notification["success"]({
        //             message: "Cảm ơn",
        //             description: "Bạn đã đặt hàng thành công!"
        //         })
        //         removeCacheLocalStorage("carts")
        //         redirectHome()
        //     }
        // })
    }

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div id="checkout-form" className="clearfix">
                        <div className="col-md-12">
                            <div className="order-summary clearfix">
                                <div className="section-title">
                                    <h3 className="title">Giỏ Hàng</h3>
                                </div>
                                <table className="shopping-cart-table table">
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th />
                                            <th className="text-center">Giá</th>
                                            <th className="text-center">
                                                Số lượng
                                            </th>
                                            <th className="text-center">
                                                Tổng tiền
                                            </th>
                                            <th className="text-right" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carts.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="thumb">
                                                        <img
                                                            alt="Logo"
                                                            src={item.image}
                                                        ></img>
                                                    </td>
                                                    <td className="details">
                                                        <Link
                                                            to={`/etech/${item.type_product}/${item.id}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    {item.spec1}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    {item.spec2}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className="price text-center">
                                                        <strong>
                                                            {changePriceToVND(
                                                                item.price
                                                            )}
                                                        </strong>
                                                        <br />
                                                        {/* <del className="font-weak">
                                                        <small>$40.00</small>
                                                    </del> */}
                                                    </td>
                                                    <td className="qty text-center">
                                                        <InputNumber
                                                            size="large"
                                                            min={1}
                                                            max={99}
                                                            defaultValue={
                                                                item.qty
                                                            }
                                                            onChange={e =>
                                                                onChangeQty(
                                                                    item.id,
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="total text-center">
                                                        <strong className="primary-color">
                                                            {changePriceToVND(
                                                                item.price *
                                                                    item.qty
                                                            )}
                                                        </strong>
                                                    </td>
                                                    <td className="text-right">
                                                        <button
                                                            className="main-btn icon-btn"
                                                            onClick={() => {
                                                                handleRemoveItem(
                                                                    item.id
                                                                )
                                                            }}
                                                        >
                                                            <i className="fa fa-close" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">
                                        Thông Tin Khách Hàng
                                    </h3>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="input"
                                        type="text"
                                        name="name"
                                        placeholder="Họ Tên"
                                        value={(account && account.name) || ""}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="input"
                                        type="text"
                                        name="address"
                                        placeholder="Địa chỉ"
                                        value={
                                            (account && account.address) || ""
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="input"
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={(account && account.email) || ""}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="input"
                                        type="text"
                                        name="phone"
                                        placeholder="Số điện thoại"
                                        value={(account && account.phone) || ""}
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="input-checkbox">
                                        <div className="caption">
                                            <p>
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit,
                                                sed do eiusmod tempor
                                                incididunt.
                                            </p>
                                            <p>
                                                <input
                                                    className="input"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Your Password"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Bạn đã có tài khoản ?{" "}
                                    <a href={PATH.LOGIN}>Đăng nhập</a> /{" "}
                                    <a href={PATH.SIGNUP}>Tạo tài khoản</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Hóa Đơn</h3>
                                </div>

                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h3>Giá &emsp;</h3>
                                            </td>
                                            <td>
                                                <h3>
                                                    {changePriceToVND(
                                                        totalPriceBill
                                                    )}
                                                </h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3>Ship &emsp;</h3>
                                            </td>
                                            <td>
                                                <h3>0đ</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3>Tổng &emsp;</h3>
                                            </td>
                                            <td>
                                                <h3>
                                                    {changePriceToVND(
                                                        totalPriceBill
                                                    )}
                                                </h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button
                                    className="primary-btn"
                                    onClick={() => handlePay()}
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
