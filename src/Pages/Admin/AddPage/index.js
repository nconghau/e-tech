import { CloseOutlined, LinkOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Col, Form, notification, Row, Space } from "antd"
import BreadcrumbField from "Components/Admin/CustomFields/BreadcrumbField"
import InputField from "Components/Admin/CustomFields/InputField"
import SelectField from "Components/Admin/CustomFields/SelectField"
import { LIST_RENDER_DEFAULT, TYPE_CUSTOM_FIELD } from "Constants/Data"
import { VALIDATE_MESSAGES } from "Constants/Validate"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
    setIsSSDForCreateDrive,
    setProductTypeIdForCreate
} from "Redux/Admin/Product/ProductAdmin.reducer"
import {
    createProductsApi,
    getSpecListApi
} from "Redux/Admin/Product/ProductAdmin.thunk"
import "../AddEditPage.css"
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
}

const AddProductPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [indexForm, setIndexForm] = useState(1)
    const filterAll = useSelector(state => state.ProductAdminReducer.filterAll)
    const productTypeIdForCreate = useSelector(
        state => state.ProductAdminReducer.productTypeIdForCreate
    )
    const isSSDForCreateDrive = useSelector(
        state => state.ProductAdminReducer.isSSDForCreateDrive
    )
    const [cancel, setCancel] = useState(false)
    //----------------------GET DATA SHOW SELECT FIELDS----------
    useEffect(() => {
        dispatch(getSpecListApi())
    }, [])

    //----------------------RELOAD FORM---------------------------
    useEffect(() => {
        setIndexForm(indexForm + 1)
    }, [productTypeIdForCreate])

    //------------------------NOTIFY-----------------------------
    const openNotify = (type, title, message) => {
        notification[type]({
            message: title,
            description: message
        })
    }

    //------------------------SUBMIT------------------------------
    const onCancel = () => {
        setCancel(true)
        history.push("/admin/home")
    }
    const onFinish = values => {
        if (!cancel) {
            if (productTypeIdForCreate === 1) {
                const bodyLaptop = {
                    info: {
                        name: values.name,
                        description: values.description,
                        guarantee: Number(values.guarantee),
                        price: Number(values.price),
                        brand_id: Number(values.brand_id),
                        type_id: Number(values.type_id)
                    },
                    spec: {
                        cpu_id: Number(values.cpu_id),
                        gpu_id: Number(values.gpu_id),
                        ram_id: Number(values.ram_id),
                        size_id: Number(values.size_id),
                        rom_id: Number(values.rom_id),
                        screen_id: Number(values.screen_id),
                        port_id: Number(values.port_id),
                        os_id: Number(values.os_id),
                        battery_id: Number(values.battery_id),
                        weight_id: Number(values.weight_id)
                    },
                    images: {
                        img1: values.img1,
                        img2: values.img2,
                        img3: values.img3
                    }
                }

                dispatch(createProductsApi("laptop", bodyLaptop)).then(notify =>
                    openNotify(notify.type, notify.title, notify.message)
                )
            }
            if (productTypeIdForCreate === 2) {
                const bodyDrive = {
                    info: {
                        name: values.name,
                        description: values.description,
                        guarantee: Number(values.guarantee),
                        price: Number(values.price),
                        brand_id: Number(values.brand_id),
                        type_id: Number(values.type_id)
                    },
                    spec: {
                        capacity_id: Number(values.capacity_id),
                        cache_id: isSSDForCreateDrive
                            ? 1
                            : Number(values.cache_id),
                        connect_id: Number(values.connect_id),
                        write_id: Number(values.write_id),
                        read_id: Number(values.read_id),
                        dimension_id: Number(values.dimension_id),
                        rotation_id: isSSDForCreateDrive
                            ? 1
                            : Number(values.rotation_id),
                        drive_type_id: Number(values.drive_type_id)
                    },
                    image: {
                        img1: values.img1,
                        img2: values.img2,
                        img3: values.img3
                    }
                }
                dispatch(createProductsApi("drive", bodyDrive)).then(notify =>
                    openNotify(notify.type, notify.title, notify.message)
                )
            } else {
                openNotify(
                    "info",
                    "Th??m ch??a th??nh c??ng!",
                    "T??nh n??ng ??ang c???p nh???t"
                )
            }
        }
    }

    //------------------------COMPONENT RENDER---------------------
    const renderSpecLaptop = () => {
        return (
            <Col span={12}>
                <SelectField
                    name={"cpu_id"}
                    label={"Vi x??? l??"}
                    options={
                        (filterAll && filterAll.laptop.cpus) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"ram_id"}
                    label={"Ram"}
                    options={
                        (filterAll && filterAll.laptop.rams) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"rom_id"}
                    label={"L??u tr???"}
                    options={
                        (filterAll && filterAll.laptop.roms) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"gpu_id"}
                    label={"Card ????? h???a"}
                    options={
                        (filterAll && filterAll.laptop.gpus) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"screen_id"}
                    label={"K??ch th?????t m??n h??nh"}
                    options={
                        (filterAll && filterAll.laptop.screens) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"port_id"}
                    label={"K???t n???i ch??nh"}
                    options={
                        (filterAll && filterAll.laptop.ports) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"battery_id"}
                    label={"PIN"}
                    options={
                        (filterAll && filterAll.laptop.batteries) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"weight_id"}
                    label={"Tr???ng l?????ng"}
                    options={
                        (filterAll && filterAll.laptop.weights) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"size_id"}
                    label={"K??ch th?????c"}
                    options={
                        (filterAll && filterAll.laptop.sizes) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"os_id"}
                    label={"H??? ??i???u h??nh"}
                    options={
                        (filterAll && filterAll.laptop.os) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
            </Col>
        )
    }
    const renderSpecDrive = () => {
        return (
            <Col span={12}>
                <SelectField
                    name={"drive_type_id"}
                    label={"Ki???u ??? c???ng"}
                    options={
                        (filterAll && filterAll.drive.types) ||
                        LIST_RENDER_DEFAULT
                    }
                    onChange={value => {
                        dispatch(
                            setIsSSDForCreateDrive(
                                value % 2 === 0 ? true : false
                            )
                        )
                    }}
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"capacity_id"}
                    label={"Dung l?????ng"}
                    options={
                        (filterAll && filterAll.drive.capacities) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"connect_id"}
                    label={"K???t n???i"}
                    options={
                        (filterAll && filterAll.drive.connections) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"dimension_id"}
                    label={"K??ch th?????t"}
                    options={
                        (filterAll && filterAll.drive.dimensions) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"read_id"}
                    label={"T???c ????? ?????c"}
                    options={
                        (filterAll && filterAll.drive.reads) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"write_id"}
                    label={"T???c ????? ghi"}
                    options={
                        (filterAll && filterAll.drive.writes) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={[{ required: true }]}
                />
                <SelectField
                    name={"rotation_id"}
                    label={"T???c ????? quay"}
                    options={
                        (filterAll && filterAll.drive.rotations) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={isSSDForCreateDrive ? [] : [{ required: true }]}
                    disabled={isSSDForCreateDrive}
                />
                <SelectField
                    name={"cache_id"}
                    label={"B??? nh???m ?????m"}
                    options={
                        (filterAll && filterAll.drive.caches) ||
                        LIST_RENDER_DEFAULT
                    }
                    rules={isSSDForCreateDrive ? [] : [{ required: true }]}
                    disabled={isSSDForCreateDrive}
                />
            </Col>
        )
    }

    //------------------------HANDLE RENDER------------------------
    const handleRenderSpec = () => {
        switch (productTypeIdForCreate) {
            case 1:
                return renderSpecLaptop()
            case 2:
                return renderSpecDrive()
            default:
                return <p>H??? th???ng ??ang c???p nh???t</p>
        }
    }

    const handleRenderBrand = () => {
        switch (productTypeIdForCreate) {
            case 1:
                return filterAll && filterAll.laptop.brands
            case 2:
                return filterAll && filterAll.drive.brands
            default:
                break
        }
    }
    return (
        <div>
            <BreadcrumbField list={["Admin", "Th??m m???i"]} />
            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                {"Th??m m???i s???n ph???m"}
            </h3>
            <Form
                // form={form}
                key={indexForm}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={VALIDATE_MESSAGES}
                // onFieldsChange={(_, allFields) => {
                //     handleInputChange(allFields)
                // }}
            >
                <Row>
                    <Col span={12}>
                        <SelectField
                            name={"type_id"}
                            label={"Lo???i s???n ph???m"}
                            options={
                                (filterAll && filterAll.type) ||
                                LIST_RENDER_DEFAULT
                            }
                            onChange={value => {
                                dispatch(setProductTypeIdForCreate(value))
                            }}
                            rules={[{ required: true }]}
                        />
                        <SelectField
                            name={"brand_id"}
                            label={"H??ng s???n ph???m"}
                            options={handleRenderBrand() || LIST_RENDER_DEFAULT}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"name"}
                            label={"T??n s???n ph???m"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"img1"}
                            label={"Link ???nh 1"}
                            prefix={<LinkOutlined />}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"img2"}
                            label={"Link ???nh 2"}
                            prefix={<LinkOutlined />}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"img3"}
                            label={"Link ???nh 3"}
                            prefix={<LinkOutlined />}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.TEXTAREA}
                            name={"description"}
                            label={"M?? t??? s???n ph???m"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT}
                            name={"price"}
                            label={"Gi?? s???n ph???m"}
                            suffix={"VN??"}
                            rules={[{ required: true }]}
                        />
                        <InputField
                            typeInput={TYPE_CUSTOM_FIELD.INPUT_NUMBER}
                            name={"guarantee"}
                            label={"Th???i gian b???o h??nh (th??ng)"}
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    min: 0,
                                    max: 99
                                }
                            ]}
                        />
                    </Col>
                    {/* render col right */}
                    {handleRenderSpec()}
                    <Row
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Space size={"small"}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                            >
                                L??u
                            </Button>
                            <Button
                                text="H???y"
                                htmlType="cancel"
                                icon={<CloseOutlined />}
                                onClick={() => onCancel()}
                            >
                                H???y
                            </Button>
                        </Space>
                    </Row>
                </Row>
            </Form>
        </div>
    )
}

export default AddProductPage
