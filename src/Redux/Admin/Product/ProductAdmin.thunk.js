import { isNotFound, isSuccess } from "../../Status/Status.reducer"
import { changeLoading } from "../../System/System.reducer.js"
import ProductApi from "./ProductAdmin.Api"
import {
    filterAllFail,
    filterAllSuccess,
    filtersFail,
    filtersSuccess,
    productsFail,
    productsSuccess,
    productUpdatingFail
} from "./ProductAdmin.reducer"
export const getSpecListApi = () => async dispatch => {
    try {
        dispatch(changeLoading(true))
        const resApi = await ProductApi.getSpecList()
        if (resApi.success) {
            dispatch(filterAllSuccess(resApi.data))
            dispatch(isSuccess())
        } else {
            dispatch(filterAllFail(null))
            dispatch(isNotFound(true))
        }
        dispatch(changeLoading(false))
    } catch (err) {
        dispatch(filterAllFail(null))
        dispatch(isNotFound(true))
        dispatch(changeLoading(false))
    }
}
export const getProductsApi = type => async dispatch => {
    try {
        dispatch(changeLoading(true))
        const resApi = await ProductApi.getProducts(type)

        if (resApi.success) {
            dispatch(productsSuccess(resApi.data.data))
            dispatch(filtersSuccess(resApi.data.filter))
            dispatch(isSuccess())
        } else {
            dispatch(productsFail(null))
            dispatch(filtersFail(null))
            dispatch(isNotFound(true))
        }
        dispatch(changeLoading(false))
    } catch (err) {
        dispatch(productsFail(null))
        dispatch(filtersFail(null))
        dispatch(isNotFound(true))
        dispatch(changeLoading(false))
    }
}
export const getProductApi = (type, id) => async dispatch => {
    try {
        dispatch(changeLoading(true))
        const resApi = await ProductApi.getProduct(type, id)

        if (resApi.success) {
            dispatch(changeLoading(false))
            dispatch(isSuccess())
            return {
                info: resApi.data.info,
                spec: resApi.data.spec,
                image: resApi.data.image
            }
        } else {
            dispatch(productUpdatingFail(null))
            dispatch(isNotFound(true))
        }
        dispatch(changeLoading(false))
    } catch (err) {
        dispatch(productUpdatingFail(null))
        dispatch(isNotFound(true))
        dispatch(changeLoading(false))
    }
}
export const createProductsApi = (type, body) => async dispatch => {
    try {
        dispatch(changeLoading(true))
        const resApi = await ProductApi.createProduct(type, body)

        if (resApi.success) {
            dispatch(changeLoading(false))
            return {
                type: "success",
                title: "Th??m th??nh c??ng!",
                message: "S???n ph???m ???? ???????c th??m"
            }
        } else {
            dispatch(changeLoading(false))
            return {
                type: "error",
                title: "Th??m th???t b???i!",
                message: "S???n ph???m ch??a ???????c th??m"
            }
        }
    } catch (err) {
        console.log(err)
        dispatch(changeLoading(false))
        return {
            type: "error",
            title: "Th??m th???t b???i!",
            message: "S???n ph???m ch??a ???????c th??m"
        }
    }
}

export const updateProductsApi = (type, body) => async dispatch => {
    try {
        dispatch(changeLoading(true))
        const resApi = await ProductApi.updateProduct(type, body)

        if (resApi.success) {
            dispatch(changeLoading(false))
            return {
                type: "success",
                title: "C???p nh???t th??nh c??ng!",
                message: "S???n ph???m ???? ???????c c???p nh???t"
            }
        } else {
            dispatch(changeLoading(false))
            return {
                type: "error",
                title: "C???p nh???t th???t b???i!",
                message: "S???n ph???m ch??a ???????c c???p nh???t"
            }
        }
    } catch (err) {
        console.log(err)
        dispatch(changeLoading(false))
        return {
            type: "error",
            title: "C???p nh???t th???t b???i!",
            message: "S???n ph???m ch??a ???????c c???p nh???t"
        }
    }
}
