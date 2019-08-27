import router from '../../router'
import request from '../../utils/request'

const state = {
    step: {
        payAccount: '123456'
    },
    receiveAccount: {
        type: "alipay",
        number: ""
    },
    data: ''
}

const actions = {
    async submitStepForm({ commit }, { payload }) {
        await request({
            url: '/api/form',
            method: 'POST',
            data: payload
        }).then(res => {
            console.log(res);
            commit('getData', res.data)
        })
        router.push('/form/step-form/result')
    }
}

const mutations = {
    saveStepFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload
        }
    },
    getData(state, payload) {
        state.data = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}