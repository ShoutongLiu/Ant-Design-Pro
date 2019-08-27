<template>
    <div class="info">
        <a-form layout="horizontal" :form="form">
            <a-form-item
                label="付款账户"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
                <a-input
                    v-decorator="['payAccount', {
                    initialValue: step.payAccount,
                    rules: [{required: true, message: '请输入付款账户'}]
                }]"
                    placeholder="账号"
                />
            </a-form-item>
            <a-form-item
                label="收款账户"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
                <RecevieAccount
                    v-decorator="['receiveAccount', {
                    initialValue: step.receiveAccount,
                    rules: [{required: true, message: '请输入收款账户', validator: (rule, value, callback) => {
                        if (value && value.number) {
                            callback()
                        } else {
                            callback(false)
                        }
                    }}]
                }]"
                    placeholder="收款账号"
                />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handleNext">下一步</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import RecevieAccount from "../../../components/ReceiverAccount";
export default {
    components: { RecevieAccount },
    data() {
        this.form = this.$form.createForm(this);
        return {
            formItemLayout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 }
            }
        };
    },
    computed: {
        step() {
            return this.$store.state.form.step;
        }
    },
    methods: {
        handleNext() {
            const { form, $router, $store } = this;
            form.validateFields((err, val) => {
                if (!err) {
                    $store.commit({
                        type: "form/saveStepFormData",
                        payload: val
                    });
                    $router.push("/form/step-form/confirm");
                }
            });
        }
    }
};
</script>

<style>
</style>
